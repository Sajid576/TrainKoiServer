const dijkstra = require('../model/dijkstra');

myDatabase=require('../model/readData');
locationData=require('../model/TrainLocationData');
snapToRailway=require('../model/snapToRailway');
timeEstimator=require('../model/TimeEstimator');

//Get request for drawing black lines on the google map
drawRailwayTracksController =(req,res,next)=>{

    console.log(myDatabase.fetchNodesToCoordinatesMap());
    //converting map object to json object so that we can pass it to response
    const nodesToCoordinatesJsonObj = Object.fromEntries(myDatabase.fetchNodesToCoordinatesMap());
    res.status(200).json({
        message:'Getting all the list of coordinates',
        list:nodesToCoordinatesJsonObj,
    })
}

//this GET request is for generating path on google map
drawRouteController =(req,res,next)=>{
    console.log(req.params.trainName)
    console.log(req.params.startingStation)
    console.log(req.params.endingStation)
    console.log(req.params.serviceNo)

    trainName=req.params.trainName;
    startingStation=req.params.startingStation;
    endingStation=req.params.endingStation;
    serviceNo=req.params.serviceNo;
    if(serviceNo=='2')
    {
        var trainData= locationData.fetchTrainLoction(trainName);
        res.status(200).json({
            message:'Getting the data of the requested train',
            traindata:trainData
        })
    }
    //route between train & starting station
    else if(serviceNo=='1')
    {
        var trainData= locationData.fetchTrainLoction(trainName);
        //console.log(myDatabase.fetchNodeTonodeDistance())
        var preprocess=snapToRailway.nearestNodesFinder(trainData['latitude'],trainData['longitude']);

        destinationNode = myDatabase.fetchstationToNode(startingStation);       
        
        var graph = new dijkstra.Graph(myDatabase.fetchNodeTonodeDistance(),preprocess);
        graph.initDjikstraAlgorithm("0",destinationNode);
        total_dist=graph.getShortestDistance();
        path=graph.getShortestPath();

        if(path[1]==preprocess.getNode1())
        {
            var coordinateList= snapToRailway.convertPathToCoordinateList(path,preprocess.getFirstPortionList());
        }
        else
        {
            var coordinateList= snapToRailway.convertPathToCoordinateList(path,preprocess.getLastPortionList());
        }
        var estimatedTime=timeEstimator.estimateTime(Number(total_dist),Number(trainData['velocity']));

        res.status(200).json({
            message:'lel',
            estimatedTime:estimatedTime,
            requiredDistance:total_dist,
            route:coordinateList,
            traindata:trainData,
            direction:""
        })
    }
    //route between train & destination station
    else{
        var trainData= locationData.fetchTrainLoction(trainName);

        var preprocess=snapToRailway.nearestNodesFinder(trainData['latitude'],trainData['longitude']);

        destinationNode = myDatabase.fetchstationToNode(endingStation);       
        
        var graph = new dijkstra.Graph(myDatabase.fetchNodeTonodeDistance(),preprocess);
        graph.initDjikstraAlgorithm("0",destinationNode);
        total_dist=graph.getShortestDistance();
        path=graph.getShortestPath();

        if(path[1]==preprocess.getNode1())
        {
            var coordinateList= snapToRailway.convertPathToCoordinateList(path,preprocess.getFirstPortionList());
        }
        else
        {
            var coordinateList= snapToRailway.convertPathToCoordinateList(path,preprocess.getLastPortionList());
        }
        var estimatedTime=timeEstimator.estimateTime(Number(total_dist),Number(trainData['velocity']));

        res.status(200).json({
            message:'lel',
            estimatedTime:estimatedTime,
            requiredDistance:total_dist,
            route:coordinateList,
            traindata:trainData,
            direction:""
        })
    }

   
}

module.exports.drawRailwayTracksController=drawRailwayTracksController;
module.exports.drawRouteController=drawRouteController;
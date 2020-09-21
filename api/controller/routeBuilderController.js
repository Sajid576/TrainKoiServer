const dijkstra = require('../model/dijkstra');

myDatabase=require('../model/readData');
locationData=require('../model/TrainLocationData');
snapToRailway=require('../model/snapToRailway');
timeEstimator=require('../model/TimeEstimator');

//Get request for drawing black lines on the google map
drawRailwayTracksController =(req,res,next)=>{

    console.log(new myDatabase.ReadData().fetchNodesToCoordinatesMap());
    //converting map object to json object so that we can pass it to response
    const nodesToCoordinatesJsonObj = Object.fromEntries(new myDatabase.ReadData().fetchNodesToCoordinatesMap());
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
        var preprocess=snapToRailway.nearestNodesFinder(trainData['latitude'],trainData['longitude']);

        var node1=preprocess.getNode1();
        var node2=preprocess.getNode2();
        var station_junction_name1= new myDatabase.ReadData().fetchNodeTostation(node1);
        var station_junction_name2= new myDatabase.ReadData().fetchNodeTostation(node2);
        var nearestStation_junction=  station_junction_name1+'-'+station_junction_name2;

        res.status(200).json({
            message:'Getting the data of the requested train',
            traindata:trainData,
            nearestStation_junction
        })

    }
    //route between train & starting station
    else if(serviceNo=='1')
    {
        var trainData= locationData.fetchTrainLoction(trainName);
        
        var preprocess=snapToRailway.nearestNodesFinder(trainData['latitude'],trainData['longitude']);

        destinationNode = new myDatabase.ReadData().fetchstationToNode(startingStation);       
        
        var graph = new dijkstra.Graph(new myDatabase.ReadData().fetchNodeTonodeDistance(),preprocess);
        graph.initDjikstraAlgorithm("0",destinationNode);
        total_dist=graph.getShortestDistance();
        path=graph.getShortestPath();

        if(path[1]==preprocess.getNode1())
        {
            var coordinateList= snapToRailway.convertPathToCoordinateList(trainData,path,preprocess.getFirstPortionList());
        }
        else
        {
            var coordinateList= snapToRailway.convertPathToCoordinateList(trainData,path,preprocess.getLastPortionList());
        }
        var estimatedTime=timeEstimator.estimateTime(Number(total_dist),Number(trainData['velocity']));

        var destinationCordinate= new myDatabase.ReadData().convertStationToCoordinate(startingStation);

        res.status(200).json({
            message:estimatedTime['msg'],
            estimatedTime:estimatedTime['time'],
            requiredDistance:total_dist,
            route:coordinateList,
            traindata:trainData,
            destinationCordinate:destinationCordinate,
            direction:""
        })
    }
    //route between train & destination station
    else{
        var trainData= locationData.fetchTrainLoction(trainName);

        var preprocess=snapToRailway.nearestNodesFinder(trainData['latitude'],trainData['longitude']);

        destinationNode = new myDatabase.ReadData().fetchstationToNode(endingStation);       
        
        var graph = new dijkstra.Graph(new myDatabase.ReadData().fetchNodeTonodeDistance(),preprocess);
        graph.initDjikstraAlgorithm("0",destinationNode);
        total_dist=graph.getShortestDistance();
        path=graph.getShortestPath();

        if(path[1]==preprocess.getNode1())
        {
            var coordinateList= snapToRailway.convertPathToCoordinateList(trainData,path,preprocess.getFirstPortionList());
        }
        else
        {
            var coordinateList= snapToRailway.convertPathToCoordinateList(trainData,path,preprocess.getLastPortionList());
        }
        var estimatedTimeInfoObj=timeEstimator.estimateTime(Number(total_dist),Number(trainData['velocity']));

        var destinationCordinate=new myDatabase.ReadData().convertStationToCoordinate(endingStation);

        res.status(200).json({
            message:estimatedTimeInfoObj['msg'],
            estimatedTime:estimatedTimeInfoObj['time'],
            requiredDistance:total_dist,
            route:coordinateList,
            traindata:trainData,
            destinationCordinate:destinationCordinate,
            direction:""
        })
    }

   
}

module.exports.drawRailwayTracksController=drawRailwayTracksController;
module.exports.drawRouteController=drawRouteController;
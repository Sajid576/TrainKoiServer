const dijkstra = require('../model/RouteBuilderModel/dijkstra');

const myDatabase=require('../model/DbModel/FirebaseModel');
const TrainLocationModel=require('../model/DbModel/TrainLocationModel');
const snapToRailway=require('../model/RouteBuilderModel/snapToRailway');
const timeEstimator=require('../model/TimeEstimatorModel/TimeEstimator');



//this GET request is for generating path on google map
let drawRouteController =async (req,res,next)=>{
    console.log(req.params.trainName)
    console.log(req.params.startingStation)
    console.log(req.params.endingStation)
    console.log(req.params.serviceNo)

    trainName=req.params.trainName;
    startingStation=req.params.startingStation;
    endingStation=req.params.endingStation;
    serviceNo=req.params.serviceNo;

    let trainData;

    if(serviceNo=='2')
    {
        try {
            trainData =await TrainLocationModel.findOne({trainName:trainName});
        }catch(err)
        {
            res.json(err);
        }
        
            
        
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
        try {
            trainData =await TrainLocationModel.findOne({trainName:trainName});
        }catch(err)
        {
            res.json(err);
        }
        
        var preprocess=snapToRailway.nearestNodesFinder(trainData['latitude'],trainData['longitude']);

        destinationNode = new myDatabase.ReadData().fetchstationToNode(startingStation);       
        
        var graph = new dijkstra.Graph(new myDatabase.ReadData().fetchNodeTonodeDistance(),preprocess);
        graph.initDjikstraAlgorithm("0",destinationNode);
        total_dist=graph.getShortestDistance();

        path=graph.getShortestPath();

        if(path[1]==preprocess.getNode1())
        {
            
            total_dist+=preprocess.getFirstPortionDistance();
            var coordinateList= snapToRailway.convertPathToCoordinateList(trainData,path,preprocess.getFirstPortionList());
        }
        else
        {
            total_dist+=preprocess.getLastPortionDistance();
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
        try {
            trainData =await TrainLocationModel.findOne({trainName:trainName});
        }catch(err)
        {
            res.json(err);
        }

        var preprocess=snapToRailway.nearestNodesFinder(trainData['latitude'],trainData['longitude']);

        destinationNode = new myDatabase.ReadData().fetchstationToNode(endingStation);       
        
        var graph = new dijkstra.Graph(new myDatabase.ReadData().fetchNodeTonodeDistance(),preprocess);
        graph.initDjikstraAlgorithm("0",destinationNode);
        total_dist=graph.getShortestDistance();
        path=graph.getShortestPath();

        if(path[1]==preprocess.getNode1())
        {
            total_dist+=preprocess.getFirstPortionDistance();
            var coordinateList= snapToRailway.convertPathToCoordinateList(trainData,path,preprocess.getFirstPortionList());
        }
        else
        {
            total_dist+=preprocess.getLastPortionDistance();
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


module.exports.drawRouteController=drawRouteController;
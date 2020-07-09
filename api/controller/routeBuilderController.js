const dijkstra = require('../model/dijkstra');

myDatabase=require('../model/readData');
locationData=require('../model/TrainLocationData');


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
    console.log(req.params.stationName)
    console.log(req.params.serviceNo)

    trainName=req.params.trainName;
    stationName=req.params.stationName;
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
        var graph=new dijkstra.Graph(myDatabase.fetchNodeTonodeDistance());

        res.status(200).json({
            message:'Getting the data of the requested train',
            traindata:trainData
        })
    }
    //route between train & destination station
    else{
        var trainData= locationData.fetchTrainLoction(trainName);


    }

   
}

module.exports.drawRailwayTracksController=drawRailwayTracksController;
module.exports.drawRouteController=drawRouteController;
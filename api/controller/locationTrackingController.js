locationData=require('../model/CrowdSourcingModel/TrainLocationData');


//this function used to handle POST requests to store a particular train location data
// into the server.  
storeNewLocationData =(req,res,next)=>{
    const trainName=req.body.trainName;
    const lat= req.body.latitude;
    const lon=req.body.longitude;
    const velocity=req.body.velocity;
    const time=req.body.time;

    tempLocationDataObj={
        latitude:lat,
        longitude:lon,
        velocity:velocity,
        time:time
    }

    locationData.storeTrainLocation(trainName,tempLocationDataObj)

    res.status(200).json({
        message:'Location data stored successfully',
        
    })
}
module.exports.storeNewLocationData=storeNewLocationData;
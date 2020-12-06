const locationData=require('../model/CrowdSourcingModel/TrainLocationData');
const TrainLocationModel=require('../model/CrowdSourcingModel/TrainLocationModel');

//this function used to handle POST requests to store a particular train location data
// into the server.  
storeNewLocationData =(req,res,next)=>{
    
    let trainLocationModel= new TrainLocationModel(req);
    
    locationData.storeTrainLocation(trainLocationModel);

    res.status(200).json({
        message:'Location data stored successfully',
        
    })
}
module.exports.storeNewLocationData=storeNewLocationData;
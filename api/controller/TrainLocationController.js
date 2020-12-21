
const TrainLocationModel=require('../model/DbModel/TrainLocationModel');
const TimeConverter=require('../utils/TimeConverter');
var ObjectId = require('mongodb').ObjectID;

//this function used to handle POST requests to store a particular train location data
// into the server.  
let storeNewLocationData =(req,res,next)=>{
        let id = new ObjectId();
        let trainName =req.body.trainName;
        let lat= req.body.latitude;
        let lon= req.body.longitude;
        let velocity= req.body.velocity;
        /*
        let train= new TrainLocationModel({
            _id: new ObjectId(id),
            trainName:trainName,
            latitude:lat,
            longitude:lon,
            velocity:velocity,
            time: TimeConverter.getTimeNow()
        })
        train.save().then((data)=>{
            res.status(200).json({
                data
            })
        }).catch(error => {
            res.status(404).json({
                message:error.message
            })
        })
        */

        /*
        TrainLocationModel.find()
                        .then(train=>{
                            res.json(train)
                        })
                        .catch((e)=>{
                            res.json(e.message);
                        })
                        */

    
    TrainLocationModel.findOneAndUpdate({trainName:trainName },
     {
            latitude:lat,
            longitude:lon,
            velocity:velocity,
            time: TimeConverter.getTimeNow()
    }
    ,{new:true})
   
    .then((data)=>{
        res.status(200).json({
            data
        })
    }).catch(error => {
        res.status(404).json({
            message:error.message
        })
    })
    
}
module.exports.storeNewLocationData=storeNewLocationData;
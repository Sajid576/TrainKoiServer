const  mongoose =require('mongoose');


const trainLocationSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Types.ObjectId,
        
    },
    trainName:{
        type: String,
        required: true,
        trim:true,
        
    },
    
    latitude:{
        type: String,
        required: true,
       
    },
    longitude:{
        type: String,
        required: true,
    },
    velocity:{
        type: String,
        required: true,
        
    },
    time:{
        type: Date,
       
    }

});
let TrainLocationModel=mongoose.model('TrainLocation',trainLocationSchema);
module.exports=TrainLocationModel;
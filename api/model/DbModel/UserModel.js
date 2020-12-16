const  mongoose =require('mongoose');


const userSchema = new mongoose.Schema({
    _id:{
        type: mongoose.Types.ObjectId,
        
    },
    username:{
        type: String,
        required: true,
        trim:true,
        minLength:2,
        maxLength:30
    },
    
    email:{
        type: String,
        required: true,
        trim:true,
    },
    phone:{
        type: String,
        required: true,
        trim:true,
        maxLength:15
    },
    coins:{
        type: Number,
        required: true,
        min:0,
        max:1000
    }

});
let UserModel=mongoose.model('User',userSchema);
module.exports=UserModel;
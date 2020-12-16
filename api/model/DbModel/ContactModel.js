const  mongoose =require('mongoose');
let Schema=mongoose.Schema;
const contactSchema = new Schema({
    username:{
        type: String,
        required: true,
        trim:true,
        minLength:2,
        maxLength:30
    },
    uid:{
        type: String,
        required: true,
        trim:true,
    },
    email:{
        type: String,
        required: true,
        trim:true,
    },
    subject:{
        type: String,
        required: true,
        trim:true,
    },
    message:{
        type: String,
        required: true,
        maxlength:1000
    },
    createdAt:{
        type: Date,
        required: true,
        trim:true,
    }

})
let ContactModel=mongoose.model('Contact',contactSchema);
module.exports=ContactModel;
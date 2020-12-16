const UserModel = require('../model/DbModel/UserModel');
const  mongoose =require('mongoose');


//POST: store user data while signing up
storeUserDataController =(req,res,next)=>{
    const uid=req.body.uid;
    const username=req.body.username;
    const email=req.body.email;
    const phone=req.body.phone;
    const coin=20; // 20 coins is free while signing up
    
    let user= new UserModel({
        _id: mongoose.Types.ObjectId( uid),
        username:username,
        email:email,
        phone:phone,
        coins:coin 
    })
    user.save().then((data)=>{
        res.status(200).json({
            data
        })
    }).catch(error => {
        res.status(404).json({
            message:error.message
        })
    })

    
}

//PUT: edit user data
editUserDataController =(req,res,next)=>{
    const uid=req.body.uid
    const username=req.body.username
    const phone=req.body.phone
   
    UserModel.findOneAndUpdate({ _id:uid},{
        $set: {
            username:username,
            phone:phone
        }
    },{new:true})
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

//GET: read a particular user data
readUserDataController =(req,res,next)=>{
    const uid=req.params.id;
    
    UserModel.findById(uid)
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


module.exports.storeUserDataController=storeUserDataController;
module.exports.editUserDataController=editUserDataController;
module.exports.readUserDataController=readUserDataController;

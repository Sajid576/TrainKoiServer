const UserModel = require('../model/DbModel/UserModel');
const  mongoose =require('mongoose');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//POST: user login
exports.loginUserController=(req,res,next) => {
    const email=req.body.email;
    let password=req.body.password;
    UserModel.findOne({email})
    .then((user)=>{
        if(user)
        {
            bcrypt.compare(password,user.password,(err,result)=>{
                if(err)
                {
                    res.json(err);
                }
                if(result)
                {
                    console.log(process.env.JWT_SECRET);
                    jwt.sign({user}, process.env.JWT_SECRET,{expiresIn:'2h'},(err,token)=>{
                        if(err){
                            console.log(err)
                            return res.status(400).json({error: 'server error'})
                        }
                        
                        res.status(200).json({token,success: true})
                    })
                   
                }
                else{
                    res.status(200).json({
                        message: "Password does not match"
                    })
                }
            })
        }
        else
        {
            res.status(200).json({
                message: "User not found"
            })
        }
    })



}

//POST: register user data
registerUserDataController =(req,res,next)=>{
    const uid=req.body.uid;
    const username=req.body.username;
    const email=req.body.email;
    const phone=req.body.phone;
    let password=req.body.password;
    const coin=20; // 20 coins is free while signing up

    bcrypt.hash(password,10).then((hash) => {
        let user= new UserModel({
            _id: mongoose.Types.ObjectId( uid),
            username:username,
            email:email,
            password:hash,
            phone:phone,
            coins:coin 
        })
        user.save().then((data)=>{
            res.status(200).json({
                data
            })
        }).catch(error => {
            res.json({
                message:error.message
            })
        })

    }).catch((err)=>{
        res.json({
            message:err.message
        })
    })

}

//PUT: edit user data
editUserDataController =(req,res,next)=>{
    const email=req.body.email;
    const username=req.body.username
    const phone=req.body.phone
   
    UserModel.findOneAndUpdate({ email:email},{
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
    const email=req.params.email;
    console.log(email);
    UserModel.findOne({email})
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


module.exports.registerUserDataController=registerUserDataController;
module.exports.editUserDataController=editUserDataController;
module.exports.readUserDataController=readUserDataController;

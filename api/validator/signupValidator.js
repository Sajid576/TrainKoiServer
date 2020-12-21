
const validator = require('validator');
const  mongoose =require('mongoose');
const UserModel = require('../model/DbModel/UserModel');

async function validateRegister  (req, res, next) {

    const username=req.body.username;
    const email=req.body.email;
    const phone=req.body.phone;
    let password=req.body.password;

    if(!email){
         res.json({
             message: 'Please provide your email'
         }) 
    }else if(!validator.isEmail(email)){
         
         res.json({
            message: 'Please provide your valid email'
        }) 
    }
    
    if(!password){
       
        res.json({
            message:'Please provide a password'
        })

    }else if(password.length < 6){
        
        res.json({
            message:'password should not be less then six'
        })
    }
    if(phone.length<11)
    {
        res.json({
            message:'please provide a valid phone number'
        })
    }
    else 
    {
        try{
            let user = await UserModel.findOne({email});
            if(user)
            {
                res.json({
                    message: 'This email is already registered'
                }) 
            }
            else{
                next()
            }
        }catch(err)
        {
            res.json({
                message: err.message
            })
        }
         
    }
    console.log("lel")
    
}




module.exports = validateRegister  

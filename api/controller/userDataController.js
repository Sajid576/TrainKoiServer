const AuthenticationModel = require('../model/AuthenticationModel');



//POST: store user data
storeUserDataController =(req,res,next)=>{
    const uid=req.body.uid
    const username=req.body.username
    const email=req.body.email
    const phone=req.body.phone

    AuthenticationModel.storeUserData(uid,username,email,phone).then(()=>{
        res.status(200).json({
            message:'User data successfully saved',
            username:username,
            email:email,
            phone:phone,
        })
    }).catch(error => {
        console.error(error)
        res.status(404).json({
            message:'Data could not be stored due to  '+error.message,
           
        })
    });

    
}

//PUT: edit user data
editUserDataController =(req,res,next)=>{
    const uid=req.body.uid
    const username=req.body.username
    const phone=req.body.phone
   
    AuthenticationModel.editUserData(uid,username,phone).then(()=>{
        res.status(200).json({
            message:'User data successfully edited',
            username:username,
            phone:phone,
        })
    }).catch(error => {
        console.error(error)
        res.status(404).json({
            message:'Data could not be saved due to  '+error.message,
           
        })
    });
}

//GET: read a particular user data
readUserDataController =(req,res,next)=>{
    const uid=req.params.id;
    
    
    AuthenticationModel.readUserData(uid).then(user=>{
        res.status(202).json({
            message:'User data read successfully',
            username:user['username'],
            email:user['email'],
            phone:user['phone']
        })
    }).catch(error=>{
        console.log(error.message);
        res.status(404).json({
            message:'User data failed to read from server',
            
        })
    })
    
   
}


module.exports.storeUserDataController=storeUserDataController;
module.exports.editUserDataController=editUserDataController;
module.exports.readUserDataController=readUserDataController;

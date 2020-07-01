require('../model/readData');


//POST: store user data
storeUserDataController =(req,res,next)=>{

    res.status(200).json({
        message:'User data successfully saved',
        
    })
}

//PUT: edit user data
editUserDataController =(req,res,next)=>{

    res.status(201).json({
        message:'User data successfully edited',
        
    })
}

//GET: read a particular user data
readUserDataController =(req,res,next)=>{

    res.status(202).json({
        message:'User data read successfully',
        
    })
}


module.exports.storeUserDataController=storeUserDataController;
module.exports.editUserDataController=editUserDataController;
module.exports.readUserDataController=readUserDataController;

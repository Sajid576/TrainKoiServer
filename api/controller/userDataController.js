require('../model/readData');

usersMap={
    '123':{
        'name':'sajid',
        'email':'sajid@gmail.com',
        'phone':'01535155114'
    },
    '456':{
        'name':'rain',
        'email':'rain@gmail.com',
        'phone':'0153123123'
    }
}

//POST: store user data
storeUserDataController =(req,res,next)=>{
    console.log(req.body.username)
    console.log(req.body.email)
    console.log(req.body.phone)


    res.status(200).json({
        message:'User data successfully saved',
        username:req.body.username,
        email:req.body.email,
        phone:req.body.phone
    })
}

//PUT: edit user data
editUserDataController =(req,res,next)=>{
    console.log(req.body.username)
    console.log(req.body.email)
    console.log(req.body.phone)
    res.status(201).json({
        message:'User data successfully edited',
        username:req.body.username,
        email:req.body.email,
        phone:req.body.phone
    })
}

//GET: read a particular user data
readUserDataController =(req,res,next)=>{
    const uid=req.params.id;
    
    data=usersMap[uid];
    if(data==null)
        data='NULL';
    console.log(data);
    res.status(202).json({
        message:'User data read successfully',
        userInfo:data

    })
}


module.exports.storeUserDataController=storeUserDataController;
module.exports.editUserDataController=editUserDataController;
module.exports.readUserDataController=readUserDataController;

const UserModel = require('../model/DbModel/UserModel');


//PUT: this method used to deduct the coin data of a particular user and send a response
//to the user
spendCoinDataController =(req,res,next)=>{
    const uid=req.body.uid
    
    UserModel.findOneAndUpdate({ _id:uid},{
        $inc: {coins: -1}
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

//PUT:this method used to  add more coin data of a particular user and send a response
//to the user
addCoinDataController =(req,res,next)=>{
    const uid=req.body.uid
    const requestedCoins=req.body.requestedCoins
    UserModel.findOneAndUpdate({ _id:uid},{
        $inc: {coins: Number(requestedCoins)}
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

module.exports.spendCoinDataController=spendCoinDataController
module.exports.addCoinDataController=addCoinDataController
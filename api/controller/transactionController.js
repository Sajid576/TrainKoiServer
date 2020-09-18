const authModel=require('../model/AuthenticationModel');


//PUT: spend coin data
spendCoinDataController =(req,res,next)=>{
    const uid=req.body.uid
    
    var coin=new authModel.AuthenticaltionModel().spendCoinData(uid) ; 

    res.status(201).json({
        message:'1 User coin data spent successfully.\n Your current coin amount is:'+coin,
        coins:coin,
    })
}

//PUT: add more coin data [requestedCoinData=the amount of coin I want to add]
addCoinDataController =(req,res,next)=>{
    const uid=req.body.uid
    const requestedCoins=req.body.requestedCoins
    console.log(uid+","+requestedCoins);
    var coin=String( new authModel.AuthenticaltionModel().addCoinData(uid,requestedCoins)); 
    res.status(202).json({
        message:'You successfully got '+requestedCoins+" coins.\n Your current coin amount is: "+coin,
        coins: coin,
    })
}

module.exports.spendCoinDataController=spendCoinDataController
module.exports.addCoinDataController=addCoinDataController
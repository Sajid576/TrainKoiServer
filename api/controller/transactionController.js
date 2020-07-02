require('../model/readData');

//PUT: spend coin data
spendCoinDataController =(req,res,next)=>{
    const uid=req.body.id
 
    res.status(201).json({
        message:'1 User coin data spent successfully',
        
    })
}

//PUT: add more coin data [requestedCoinData=the amount of coin I want to add]
addCoinDataController =(req,res,next)=>{
    const uid=req.body.id
    const requestedCoins=req.body.requestedCoins
    
    res.status(202).json({
        message:'You successfully got '+requestedCoins+" coins",
        
    })
}

module.exports.spendCoinDataController=spendCoinDataController
module.exports.addCoinDataController=addCoinDataController
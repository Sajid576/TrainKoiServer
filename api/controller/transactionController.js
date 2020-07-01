require('../model/readData');

//PUT: update coin data
updateCoinDataController =(req,res,next)=>{

    res.status(201).json({
        message:'User coin data updated successfully',
        
    })
}

module.exports.updateCoinDataController=updateCoinDataController
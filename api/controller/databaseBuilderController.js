buildDB=require('../model/DatabaseBuilderModule/DbModelBuilder');


buildDatabase =(req,res,next)=>{
    
    buildDB.getFileNameList();
    
    res.status(200).json({
        message:'database build successfully',
        
    })
}
module.exports.buildDatabase=buildDatabase;
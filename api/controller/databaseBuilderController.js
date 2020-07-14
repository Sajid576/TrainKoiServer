buildDB=require('../model/DatabaseBuilderModule/DbModelBuilder');


buildDatabase =(req,res,next)=>{
    
    var files= buildDB.getFileNameList();
    //console.log(files);
    buildDB.readFiles(files);
    
    res.status(200).json({
        message:'database build successfully',
        
    })
}
module.exports.buildDatabase=buildDatabase;
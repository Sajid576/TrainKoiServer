fileModel=require('../model/DatabaseBuilderModule/FileModel');


buildDatabase =(req,res,next)=>{
    
    var fModel= new fileModel.FileModel();
    var files= fModel.getFileNameList();
    //console.log(files);
    fModel.readFiles(files);
    
    fModel.setDbModel();
    
    res.status(200).json({
        message:'database build successfully',
        
    })
}
module.exports.buildDatabase=buildDatabase;
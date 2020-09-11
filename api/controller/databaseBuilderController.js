fileModel=require('../model/DatabaseBuilderModule/FileModel');
dbTrainsModel=require('../model/DatabaseBuilder');

buildTrainDatabase=(req,res,next)=>{
    dbTrainsModel.DatabaseBuilder.setLocationsData()
    .then(()=>{
        console.log('train data has been saved successfully !');
        res.status(200).json({
            message:'train data has been saved successfully',
            
        })
        
    })
    .catch(error => {
        console.error(error)
    });

}

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
module.exports.buildTrainDatabase=buildTrainDatabase;
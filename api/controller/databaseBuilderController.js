fileModel=require('../model/DatabaseBuilderModel/FileModel');
dbTrainsModel=require('../model/DatabaseBuilderModel/DatabaseBuilder');


//this function used to handle the POST requests to build the database of trains
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
//this function used to handle the POST requests to build the whole database from datasets
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
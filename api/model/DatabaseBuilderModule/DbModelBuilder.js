var fs = require('fs');
var getAllFilesFromFolder = function(dir) {

    
    var results = [];

    fs.readdirSync(dir).forEach(function(file) {

        file = dir+'/'+file;
        var stat = fs.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(getAllFilesFromFolder(file))
        } 
        else {
            results.push(file);
        }
    });

    return results;
    

};


function getFileNameList()
{
    var results=getAllFilesFromFolder(__dirname + '\\Data');
    //console.log(results)
    files=[]
    results.forEach(result=>{
        var file=result.split('/');
        console.log(file[1]);
        files.push(file[1]);
    })

    
}
module.exports={
    getFileNameList
}



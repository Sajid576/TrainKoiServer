var fs = require('fs');
math=require('./Math');

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

//this method will load all the files from a directory
function getFileNameList()
{
    var results=getAllFilesFromFolder(__dirname + '\\Data');
    //console.log(results)
    files=[]
    results.forEach(result=>{
        var file=result.split('/');
        //console.log(file[1]);
        files.push(file[1]);
    })

    return files;
}

function readFiles(files)
{
    var contents=[]
    //reading the contents of every file in the directory
    files.forEach(file=>{
        var content = fs.readFileSync(__dirname+'/Data/'+file, 'utf8');
        //console.log(content);
        contents.push(content);
    })

    // loop through every content to extract many data.Then store those data to the Database according 
    // to the structure
    

    var station_junction_list=new Map();


    var nodeToCoordinateTracker=new Map();
    

    contents.forEach(content=>{
        var lines=content.split('\n');
        //console.log(lines);
        var i=0;
        while(i < lines.length){
            var words=lines[i].split(",");
            if(words[0]=='#')
            {
                var coordinates=[];
               
                
                var k=i+1;
                if(k==lines.length)break;
                while(true)
                {
                    var str=lines[k].split(",");
                    if(str[0]=='#')break;
                    coordinates.push(lines[k].trim());
                    
                    
                    k++;
                }
                //console.log(coordinates);
                i=k;
                var startNode=Number(words[2].trim());
                var endNode=Number(lines[k].split(",")[2]);
                if(startNode>endNode)  nodeToCoordinateTracker.set(endNode+','+startNode,coordinates);
                else nodeToCoordinateTracker.set(startNode+','+endNode,coordinates);
               
              
                var station_junction=words[1].trim();
                var nodeNo=words[2].trim();
                
                //station/junction name---> nodeNo , coordinates of station/junction
                if((i+1) != lines.length)
                {
                    station_junction_list.set(station_junction,[ nodeNo,lines[i+1].trim() ]);
                   
                }    
                else
                {//this condition will be true for last station/junction of the file
                    station_junction_list.set(station_junction,[ nodeNo,lines[i-1].trim() ]);
                   
                }
            }
           
           
        }
    });
    //console.log(station_junction_list)
    console.log(nodeToCoordinateTracker);
    
    



    


}





module.exports={
    getFileNameList,
    readFiles
}



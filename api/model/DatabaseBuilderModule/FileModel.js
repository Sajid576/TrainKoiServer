var fs = require('fs');
const dbBuilder = require('../DatabaseBuilder');
math=require('./Math');
haversine=require('../Haversine');

class FileModel{

    station_junction_list=new Map();

    //this map will hold the generated coordinates
    nodeToGeneratedCoordinateMap=new Map();

    nodeTonodeDistMap=new Map();


    constructor()
    {


    }

    //this method for passing the reference of text file data to the DatabaseBuilder class so that it can 
    // store the data according to the structure
    setDbModel()
    {
        var dbbuild = new dbBuilder.DatabaseBuilder(this.station_junction_list,
                                            this.nodeToGeneratedCoordinateMap,this.nodeTonodeDistMap);

    }

    //this method for getting the list of file names of a specific directory
    getAllFilesFromFolder = function(dir) {

    
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
    getFileNameList()
    {
        var results=this.getAllFilesFromFolder(__dirname + '\\Data');
        //console.log(results)
        var files=[]
        results.forEach(result=>{
            var file=result.split('/');
            //console.log(file[1]);
            files.push(file[1]);
        })

        return files;
    }

    readFiles(files)
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
        var nodeToCoordinateTracker=new Map();
        

        contents.forEach(content=>{
            var lines=content.split('\n');
            //console.log(lines);
            var i=0;
            while(i < lines.length){
                var words=lines[i].split(",");
                if(words[0]=='#')
                {
                    var station_junction=words[1].trim();
                    var nodeNo=words[2].trim();
                    
                    //station/junction name---> nodeNo , coordinates of station/junction
                    if( i < lines.length-1)
                    {
                        this.station_junction_list.set(station_junction,[ nodeNo,lines[i+1].trim() ]);
                    
                    }    
                    else
                    {
                        //this condition will be true for last station/junction of the file
                        this.station_junction_list.set(station_junction,[ nodeNo,lines[i-1].trim() ]);
                        
                    }
                    
                    
                    
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

                    // storing the pair of nodes in ascending sorted order
                    if(startNode>endNode)  nodeToCoordinateTracker.set(endNode+','+startNode,coordinates);
                    else nodeToCoordinateTracker.set(startNode+','+endNode,coordinates);
                
                
                    
                }
            
            
            }
        });

       
    
    
        //console.log(this.station_junction_list)
        //console.log(nodeToCoordinateTracker);
        this.generateCoordinates(nodeToCoordinateTracker);
        this.generateDistance(nodeToCoordinateTracker);

    }

generateCoordinates(nodeToCoordinateTracker)
{
    
    for (let [key, value] of nodeToCoordinateTracker) 
    {
            //console.log(key + ' = ' + value)
            var new_list=[];
            new_list.push(value[0]);
            for(var i=0;i<value.length-1;i++)
            {
                
                var startLat=Number( value[i].split(',')[0]);
                var startLon=Number( value[i].split(',')[1]);

                var endLat= Number(value[i+1].split(',')[0]);
                var endLon= Number(value[i+1].split(',')[1]);
                var result=math.FindAllPoints(new math.Point(startLat,startLon),new math.Point(endLat,endLon),10);
                
                new_list.push.apply(new_list,result);

            }
            new_list.push(value[value.length-1]);
            this.nodeToGeneratedCoordinateMap.set(key,new_list);

    }

  
   
    //console.log(nodeToGeneratedCoordinateMap);
    


}

generateDistance(nodeToCoordinateTracker)
{

   
    for (let [key, value] of nodeToCoordinateTracker) 
    {
        var total_dist=0;
        for(var i=0;i<value.length-1;i++)
        {
            var startLat=Number( value[i].split(',')[0]);
            var startLon=Number( value[i].split(',')[1]);

            var endLat= Number(value[i+1].split(',')[0]);
            var endLon= Number(value[i+1].split(',')[1]);

            var dist=haversine.getDistance(startLat,startLon,endLat,endLon);//in KM
            total_dist+=dist;
            

        }
        total_dist=Number(total_dist.toFixed(2));
        this.nodeTonodeDistMap.set(key,total_dist);
   
    }

   
    //console.log(nodeTonodeDistMap);



}
}


module.exports={
    FileModel
}



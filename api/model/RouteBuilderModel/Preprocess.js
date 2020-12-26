haversine=require('./Haversine');
myDb=require('../DbModel/FirebaseModel');

//this class do some pre processing task before initiating Dijkstra algorithm
class Preprocess{
    //this list stores the coordinates that are nearest to the train
    nearestList=[];
    //this variable store the index number that store the nearest coordinate to train
    nearestListIndex;
    
    //it holds node number which is one of two nearest nodes
    node1;
    node2;

    //this variable holds the distance between train and one of two nearest nodes
    first_portion_distance=0;
    //this variable holds the coordinates between train and one of two nearest nodes
    first_portion_list=[];
    
    last_portion_distance=0;
    last_portion_list=[];

    constructor(nearestList,nearestListIndex)
    {
        this.nearestList=nearestList;
        this.nearestListIndex=nearestListIndex;
        

        this.divideList()
    }

    getNode1()
    {
        return this.node1;
    }
    getNode2()
    {
        return this.node2;
    }
    getFirstPortionList()
    {
        //console.log("first portion length:  "+this.first_portion_list.length);
        return this.first_portion_list;
    }
    getLastPortionList()
    {
        //console.log("last portion length: "+this.last_portion_list.length);
        return this.last_portion_list;
    }
    getFirstPortionDistance()
    {
        return this.first_portion_distance;
    }
    getLastPortionDistance()
    {
        return this.last_portion_distance;
    }


    //this method used to verify the node of two endpoints of the nearestList
    // Exception: it can throw null pointer if station/junction not found
    verifyNodePoint(cord1,cord2)
    {
        var CoordinateToStation=new myDb.ReadData().fetchCoordinateToStation();
        var s1=CoordinateToStation.get(cord1);
        var s2=CoordinateToStation.get(cord2);

        console.log(s1+","+s2+"---"+cord1+","+cord2);
        this.node1=new myDb.ReadData().fetchstationToNode(s1);
        this.node2=new myDb.ReadData().fetchstationToNode(s2);

    }

    //this method used to divide the nearestList into two list keeping nearestListIndex
    //in the middle. 
    divideList()
    {
        this.verifyNodePoint(this.nearestList[0],this.nearestList[this.nearestList.length-1]);
           
        for(var i=0,j=i+1;j<this.nearestListIndex;i++,j++)
        {
            var cord = this.nearestList[i].split(',');
            var cord1 = this.nearestList[j].split(',');

            var x1 =Number(cord[0]);
            var y1 =Number(cord[1]);
           
            var x2 =Number(cord1[0]);
            var y2 =Number(cord1[1]);
            
            var dist = haversine.getDistance(x1, y1, x2, y2);
            this.first_portion_distance += dist;
            this.first_portion_list.push(this.nearestList[i]);
        }

       
        for(var i=this.nearestListIndex,j=i+1;j<this.nearestList.length;i++,j++)
        {
            var cord = this.nearestList[i].split(',');
            var cord1 = this.nearestList[j].split(',');

            var x1 =Number(cord[0]);
            var y1 =Number(cord[1]);
           
            var x2 =Number(cord1[0]);
            var y2 =Number(cord1[1]);
            
            var dist = haversine.getDistance(x1, y1, x2, y2);

            this.last_portion_distance += dist;
            this.last_portion_list.push(this.nearestList[i]);
        }

       // console.log("first portion:  "+this.first_portion_list);
        //console.log("last portion:  "+this.last_portion_list);
    }
}

module.exports={
    Preprocess
}
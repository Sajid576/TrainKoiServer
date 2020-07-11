haversine=require('./Haversine');
myDb=require('./readData');

class Preprocess{

    nearestList=[];
    nearestListIndex;
    
    
    node1;
    node2;
    first_portion_distance=0;
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
        return this.first_portion_list;
    }
    getLastPortionList()
    {
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
    verifyNodePoint(cord1,cord2)
    {
        var CoordinateToStation=myDb.fetchCoordinateToStation();
        var s1=CoordinateToStation.get(cord1);
        var s2=CoordinateToStation.get(cord2);

        this.node1=myDb.fetchstationToNode(s1);
        this.node2=myDb.fetchstationToNode(s2);

    }

    //this method used to divide the nearestList into two list at the middle of nearestListIndex
    divideList()
    {

       
        
        this.verifyNodePoint(this.nearestList[0],this.nearestList[this.nearestList.length-1]);
        
        
        for(var i=0,j=i+1;j<this.nearestListIndex;i++,j++)
        {
            var cord = this.nearestList[i].split(',');
            var cord1 = this.nearestList[j].split(',');

            x1 =Number(cord[0]);
            y1 =Number(cord[1]);
           
            x2 =Number(cord1[0]);
            y2 =Number(cord1[1]);
            
            var dist = haversine.getDistance(x1, y1, x2, y2);
            this.first_portion_distance += dist;
            this.first_portion_list.push(this.nearestList[i]);
        }

       
        for(var i=this.nearestListIndex,j=i+1;j<this.nearestList.length;i++,j++)
        {
            var cord = this.nearestList[i].split(',');
            var cord1 = this.nearestList[j].split(',');

            x1 =Number(cord[0]);
            y1 =Number(cord[1]);
           
            x2 =Number(cord1[0]);
            y2 =Number(cord1[1]);
            
            var dist = haversine.getDistance(x1, y1, x2, y2);

            this.last_portion_distance += dist;
            this.last_portion_list.push(this.nearestList[i]);
        }





    }



}

module.exports={
    Preprocess
}
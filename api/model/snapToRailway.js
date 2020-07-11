myDb=require('./readData');
priorityqueue=require('./PriorityQueue');
haversine=require('./Haversine');
preprocess=require('./Preprocess');

module.exports={
    nearestNodesFinder,
    convertPathToCoordinateList
}

function convertPathToCoordinateList(path,nearestList)
{
    coordinatesMap=myDb.fetchNodesToCoordinatesMap();


    mainlist=[];
    mainlist.push.apply(mainlist,nearestList);

    for(var i=1;i<path.length-1;i++)
    {
        var edge=path[i]+","+path[i+1];
        var Rev_edge=path[i+1]+","+path[i];
        if(coordinatesMap.has(edge))
        {
            var temp_list= coordinatesMap.get(edge);
            mainlist.push.apply(mainlist,temp_list);
        }
        else{
            var temp_list= coordinatesMap.get(Rev_edge);
            mainlist.push.apply(mainlist,temp_list);
        }

    }
    return mainlist;

}


function nearestNodesFinder(x,y)
{
    stationToCoordinate= myDb.fetchStationToCoordinate();
    const Mp = new Map(Object.entries(stationToCoordinate));

    //this priority queue will keep track of nearest 3 nodes(station/junction)
    //key-->station/junction  , value -> straight distance 
    //it will be sorted according to the straight distance
    nearestNodeTrackerMap=priorityqueue.PriorityQueue();

    //traversing all the station and junctions for finding the nearest 2 node from the train coordinates
    for (let [key, value] of Mp) 
    {
        console.log(key + ' = ' + value);
          
        str=value.split(',');
        lat=str[0];
        lon=str[1];

        dist=haversine.getDistance(Number(x),Number(y),Number(lat),Number(lon));
        dist=dist*1000 // km --> meter

        nearestNodeTrackerMap.enqueue([key,dist]);


    }

     /* From the nearestNodeTrackerMap we will extract top 3 Station/junction to check at least 2 lists
             to determine in which track train is situated */

    station_junction_one = nearestNodeTrackerMap.front();
    nearestNodeTrackerMap.dequeue();

    station_junction_two = nearestNodeTrackerMap.front();
    nearestNodeTrackerMap.dequeue();

    station_junction_three = nearestNodeTrackerMap.front();
    nearestNodeTrackerMap.dequeue();

    node1=myDb.fetchstationToNode(station_junction_one);
    node2=myDb.fetchstationToNode(station_junction_two);
    node3=myDb.fetchstationToNode(station_junction_three);

    node_list=[];
    node_list.push(node1);
    node_list.push(node2);
    node_list.push(node3);
    //sorting the top 3 nearest nodes so that we can easily fetch their corresponding 2 lists.
    node_list.sort();
    
    
    var pre=nearestListIndexFinder(node_list,x,y);
    return pre;

}

function nearestListIndexFinder(node_list,x,y)
{

    nodeTocoord= myDb.fetchNodesToCoordinatesMap();

    node1=node_list[0];
    node2=node_list[1];
    node3=node_list[2];

    key1=node1+","+node2;
    key2=node2+","+node3;

     /*
         we got our two nearest coordinate lists list1 & list2. Now we are going check which coordinate among these two lists is
         the closest to the train Coordinate .We are going to store that index in which NEAREST COORDINATE is located.
     */
    var list1=nodeTocoord.get(key1);
    var list2=nodeTocoord.get(key2);

    var Min_dist=1000000000;
    var nearest_index=0;
    var list_indicator=0;
    for(var i=0;i<list1.length;i++)
    {
            
        cord=list1[i].split(',');

        var x0=Number(cord[0]);
        var y0=Number(cord[1]);

        //(x,y) is the real current location of the train
        dist=haversine.getDistance(x,y,x0,y0);
        if(dist<Min_dist)
        {
            Min_dist=dist;
            nearest_index=i;
            list_indicator=1;
        }
    }
    /*
     After getting minimum distanced Train index in list1,we are going to check if more minimum distanced 
    Train index exist in list2 or not .
     */
    for(var i=0;i<list2.length;i++)
    {
        cord=list2[i].split(',');

        var x0=Number(cord[0]);
        var y0=Number(cord[1]);

        //(x,y) is the real current location of the train
        dist=haversine.getDistance(x,y,x0,y0);
        if(dist<Min_dist)
        {
            Min_dist=dist;
            nearest_index=i;
            list_indicator=2;
        }
    }

    if(list_indicator==1)
    {    
        var pre=new preprocess.Preprocess(list1,nearest_index);
    }
    else
    {
        var pre= new preprocess.Preprocess(list2,nearest_index)
    }

    return pre;



}
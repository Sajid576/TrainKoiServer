const myDb=require('../DbModel/FirebaseModel');
const priorityqueue=require('./PriorityQueue');
const haversine=require('./Haversine');
const preprocess=require('./Preprocess');

module.exports={
    nearestNodesFinder,
    convertPathToCoordinateList
}
/**
 * this function used to decide in which order(from last or from first) an upcoming list
 *  will be merged to the mainlist.
 * 
 * first denotes the (lat,lon) of the 1st index in the list
 * last denotes the (lat,lon) of the last index in the list
 * coord denotes 
 * 1) (lat,lon) of train
 * 2) the (lat,lon) of the last index.  
 */
indicateRouteCoordinate=(coord,first,last)=>
{
            x        = coord.split(',')[0];
            y        = coord.split(',')[1];
        starting_lat = first.split(',')[0];
        starting_lon = first.split(',')[1];
        ending_lat   = last.split(',')[0];
        ending_lon   = last.split(',')[1];
       /*
        console.log(x);
        console.log(y);
        console.log(starting_lat);
        console.log(starting_lon);
        console.log(ending_lat);
        console.log(ending_lon);
*/

        d1=haversine.getDistance(Number(x),Number(y),Number(starting_lat),Number(starting_lon));
        d2=haversine.getDistance(Number(x),Number(y),Number(ending_lat),Number(ending_lon));
        /**
         *  below conditions are used for finding nearest location of upcoming list from
         *  last index location of mainlist.    
         *  
         *  1 denote the first index of upcoming list.
         *  2 denote the last index of upcoming list.
         */
        

        if(d1<d2)
        {
            
            return 1;
        }
        else
        {
            
            return 2;
        }
}
/**
 * this mergeLists method merge the mainlist with the upcoming list(the lists that are 
 * generating from the nodePair )   
 * 
 */
mergeLists=(flag,mainlist,upcomingList)=>
{

    if(flag==1)
    {
        mainlist.push.apply(mainlist,upcomingList);
        console.log("flag: "+flag);
    }
    else 
    {
        for(var i=upcomingList.length-1;i>=0;i--)
        {
            mainlist.push(upcomingList[i]);
        }
    }
}
// this method generate a list of coordinates from generated path list from Dijkstra . 
function convertPathToCoordinateList(trainData,path,nearestList)
{
    //console.log('convertPathToCoordinate called:  '+nearestList)
    let coordinatesMap= myDb.fetchNodesToCoordinatesMap();
    coordinatesMap = new Map(Object.entries(coordinatesMap));

    console.log("[0]: "+ nearestList[0]);
    console.log("[n-1]: "+nearestList[nearestList.length-1]);

    var coord= trainData['latitude']+','+trainData['longitude'];
    mainlist=[];
    var flag=indicateRouteCoordinate(coord,nearestList[0],nearestList[nearestList.length-1]);
    mergeLists(flag,mainlist,nearestList);
    
    console.log("[0]: "+ mainlist[0]);
    console.log("[n-1]: "+mainlist[mainlist.length-1]);


    for(var i=1;i<path.length-1;i++)
    {
        var edge=path[i]+","+path[i+1];
        var Rev_edge=path[i+1]+","+path[i];
        if(coordinatesMap.has(edge))
        {
            console.log("edge: "+edge)
            var temp_list= coordinatesMap.get(edge);
            var flag=indicateRouteCoordinate(mainlist[mainlist.length-1],temp_list[0],temp_list[temp_list.length-1]);
            mergeLists(flag,mainlist,temp_list);
            
            console.log("[0]: "+ mainlist[0]);
            console.log("[n-1]: "+mainlist[mainlist.length-1]);
        }
        else{
            console.log("rev_edge: "+Rev_edge)
            var temp_list= coordinatesMap.get(Rev_edge);
            var flag=indicateRouteCoordinate(mainlist[mainlist.length-1],temp_list[0],temp_list[temp_list.length-1]);
            mergeLists(flag,mainlist,temp_list);
            
            console.log("[0]: "+ mainlist[0]);
            console.log("[n-1]: "+mainlist[mainlist.length-1]);
        }

    }
    return mainlist;

}

// this method will generate 'nearestNodeTrackerMap' that wil be used to find 4 nearest nodes so that we can 
// easily fetch their corresponding 3 lists from database
function nearestNodesFinder(x,y)
{
    let stationToCoordinate = myDb.fetchStationToCoordinate();
    const Mp = new Map(Object.entries(stationToCoordinate));

    //this priority queue will keep track of nearest 3 nodes(station/junction)
    //key-->station/junction  , value -> straight distance 
    //it will be sorted according to the straight distance
    var nearestNodeTrackerMap= new priorityqueue.PriorityQueue();
    

    //traversing all the station and junctions for sorting the nodes according to the distance between nodes
    // and train node. 
    for (let [key, value] of Mp) 
    {
        //console.log(key + ' = ' + value);
          
        str=value.split(',');
        lat=str[0];
        lon=str[1];

        dist=haversine.getDistance(Number(x),Number(y),Number(lat),Number(lon));
        dist=dist*1000 // km --> meter

        nearestNodeTrackerMap.enqueue([key,dist]);


    }
    //console.log(nearestNodeTrackerMap.printCollection());

     /* From the nearestNodeTrackerMap we will extract top 4 Station/junction to check at least 3 lists
             to determine in which track train is situated */

    station_junction_one = nearestNodeTrackerMap.front()[0];
    nearestNodeTrackerMap.dequeue();

    station_junction_two = nearestNodeTrackerMap.front()[0];
    nearestNodeTrackerMap.dequeue();

    station_junction_three = nearestNodeTrackerMap.front()[0];
    nearestNodeTrackerMap.dequeue();
    station_junction_four = nearestNodeTrackerMap.front()[0];
    nearestNodeTrackerMap.dequeue();
    //console.log("station_junction_one:  "+station_junction_one);
    //console.log("station_junction_two:  "+station_junction_two);
    //console.log("station_junction_three:  "+station_junction_three);

    node1= myDb.fetchstationToNode(station_junction_one);
    node2= myDb.fetchstationToNode(station_junction_two);
    node3= myDb.fetchstationToNode(station_junction_three);
    node4= myDb.fetchstationToNode(station_junction_four);

    //console.log("node1:  "+node1+",node2:  "+node2+",node3:  "+node3+",node4:  "+node4);
    

    node_list=[];
    node_list.push(node1);
    node_list.push(node2);
    node_list.push(node3);
    node_list.push(node4);
    node_list.sort();
    
    
    var pre=nearestListIndexFinder(node_list,x,y);
    return pre;

}
/**
 * this method will find the nearest discrete coordinate value from a given continuous coordinate value.
 * 
 */
function nearestListIndexFinder(node_list,x,y)
{

    var nodeTocoord=  myDb.fetchNodesToCoordinatesMap();

    node1=node_list[0];
    node2=node_list[1];
    node3=node_list[2];
    node4=node_list[3];

    key1=node1+","+node2;
    key2=node2+","+node3;
    key3=node3+","+node4;

     /*
         we got our two nearest coordinate lists list1 & list2. Now we are going check which coordinate among these two lists is
         the closest to the train Coordinate .We are going to store that index in which NEAREST COORDINATE is located.
     */
    
    var list1=nodeTocoord[key1];
    var list2=nodeTocoord[key2];
    var list3=nodeTocoord[key3];

    
    console.log("key1: "+key1+","+"key2: "+key2+"key3: "+key3);
    var Min_dist=1000000000;
    var nearest_index=0;
    var list_indicator=0;
    if(list1!=null)
    {
        console.log("list1:  "+list1.length);
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
    }
    if(list2!=null)
    {
        console.log("list2:  "+list2.length);
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
    }
    if(list3!=null)
    {
        console.log("list3:  "+list3.length);
        /*
        After getting minimum distanced Train index in list1,we are going to check if more minimum distanced 
        Train index exist in list2 or not .
        */
        for(var i=0;i<list3.length;i++)
        {
            cord=list3[i].split(',');

            var x0=Number(cord[0]);
            var y0=Number(cord[1]);

            //(x,y) is the real current location of the train
            dist=haversine.getDistance(x,y,x0,y0);
            if(dist<Min_dist)
            {
                Min_dist=dist;
                nearest_index=i;
                list_indicator=3;
            }
        }
    }
    
    console.log("list indicator:  "+list_indicator);
    if(list_indicator==1)
    {    
        var pre=new preprocess.Preprocess(list1,nearest_index);
    }
    else if(list_indicator==2)
    {
        var pre= new preprocess.Preprocess(list2,nearest_index)
    }
    else 
    {
        var pre= new preprocess.Preprocess(list3,nearest_index)
    }

    return pre;



}
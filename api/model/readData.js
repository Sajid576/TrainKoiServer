
var firebase = require('./FirebaseConnection');


//this variable to list map keep all the lists of coordinates
var nodesToCoordinatesMap = new Map();      


//this variable store all the node to distance mapping value
var nodeTonodeDistance=new Map();

//this variable store all the node to station mapping value
var nodeTostation;
var stationToNode={};

//this variable store all the station to coordinate mapping value
var StationToCoordinate;

var CoordinateToStation=new Map();


 //this function fetches all lists of coordinates 
 function readAllNodeToCoordinateData()
 {
   
   const query = firebase.firestore().collection('NodeToCoordinate').get();

    
   query.then(snapshot => {
     snapshot.forEach(nodes => {
        
             var nodePair=nodes.id;
             var coordList=nodes.data();

             nodesToCoordinatesMap.set(nodePair,coordList['Coordinates']);


        });
          //printing the map for checking
          for (let [key, value] of nodesToCoordinatesMap) 
          {
                  console.log(key + ' = ' + value)
          }
         /*
          //printing the keys
          for (let key of nodesToCoordinatesMap.keys()) 
          {
                console.log(key)
          }
          
          //printing the values
          for (let value of nodesToCoordinatesMap.values()) 
          {
                console.log(value)
          }

          */

   })
   .catch(error => {
     console.error(error);
   });
 }

function readNodeToNodeDistance()
{
    const query = firebase.firestore().collection('NodeToNodeDistance').doc('distance(km)');

   
    query.get()
    .then(nodeToDistance => {
      if(nodeToDistance.exists)
        {
           nodeTonodeDistance=nodeToDistance.data();

           nodeTonodeDistance = new Map(Object.entries(nodeTonodeDistance));
           
          
            //printing the map for checking
            for (let [key, value] of nodeTonodeDistance) 
            {
                  console.log(key + ' = ' + value)
            }
           
        }

      else{
        console.log('User does not exist !');
      }
        
      })
    .catch(error => {
      console.error(error);
    });
}

function readNodeToStation()
{
    const query = firebase.firestore().collection('NodeToStation').doc('mapping');

   
    query.get()
    .then(nodeTostation => {
      if(nodeTostation.exists)
        {
            nodeTostation=nodeTostation.data();

            const Mp = new Map(Object.entries(nodeTostation));

            //printing the map for checking
            for (let [key, value] of Mp) 
            {
                  console.log(key + ' = ' + value)
                  stationToNode[value]=key
            }
           
        }

      else
        console.log('User does not exist !');
      })
    .catch(error => {
      console.error(error);
    });
}

function readStationToCoordinate()
{
    const query = firebase.firestore().collection('StationToCoordinate').doc('mapping');

   
    query.get()
    .then(StationToCoordinate => {
      if(StationToCoordinate.exists)
        {
            StationToCoordinate=StationToCoordinate.data();
           
            const Mp = new Map(Object.entries(StationToCoordinate));

            //printing the map for checking
            for (let [key, value] of Mp) 
            {
                  console.log(key + ' = ' + value)
                  CoordinateToStation.set(value,key);
            }
        }

      else
        console.log('User does not exist !');
      })
    .catch(error => {
      console.error(error);
    });
}



  
  
//readAllNodeToCoordinateData();
readNodeToNodeDistance();
readNodeToStation();
readStationToCoordinate();

function fetchNodesToCoordinatesMap()
{
    return nodesToCoordinatesMap;
}
function fetchNodeTonodeDistance()
{
    return nodeTonodeDistance;
}
function fetchNodeTostation(node)
{
    return nodeTostation[node];   //returns station name
}
function fetchstationToNode(stationName)
{
    return stationToNode[stationName];     //returns node
}
function fetchStationToCoordinate()
{
    return StationToCoordinate;
}
function fetchCoordinateToStation()
{
    return CoordinateToStation;
}
module.exports={
  fetchNodesToCoordinatesMap,
  fetchNodeTonodeDistance,
  fetchNodeTostation,
  fetchstationToNode,
  fetchStationToCoordinate,
  fetchCoordinateToStation
}
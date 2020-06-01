
var firebase = require('./FirebaseConnection');


//this String to list map keep all the lists of coordinates
var nodesToCoordinatesMap = new Map();      //string to list

//this variable store all the node to distance mapping value
var _nodeToDistance;

//this variable store all the node to station mapping value
var _nodeTostation;

//this variable store all the station to coordinate mapping value
var _StationToCoordinate;


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
            _nodeToDistance=nodeToDistance.data();

            const Mp = new Map(Object.entries(_nodeToDistance));

            //printing the map for checking
            for (let [key, value] of Mp) 
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
            _nodeTostation=nodeTostation.data();

            const Mp = new Map(Object.entries(_nodeTostation));

            //printing the map for checking
            for (let [key, value] of Mp) 
            {
                  console.log(key + ' = ' + value)
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
            _StationToCoordinate=StationToCoordinate.data();
           
            const Mp = new Map(Object.entries(_StationToCoordinate));

            //printing the map for checking
            for (let [key, value] of Mp) 
            {
                  console.log(key + ' = ' + value)
            }
        }

      else
        console.log('User does not exist !');
      })
    .catch(error => {
      console.error(error);
    });
}



readAllNodeToCoordinateData();
readNodeToNodeDistance();
readNodeToStation();
readStationToCoordinate();

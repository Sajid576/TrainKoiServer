
var firebase = require('./FirebaseConnection');


class ReadData{

static readDbData=null;

//this variable to list map keep all the lists of coordinates
static nodesToCoordinatesMap = new Map();      

//this variable store all the node to distance mapping value
static nodeTonodeDistance=new Map();

//this variable store all the node to station mapping value
static nodeTostation;
static stationToNode={};

//this variable store all the station and junction name to coordinate mapping value
static StationToCoordinate;
//this variable store all the coordinate to station and junction name mapping value
static CoordinateToStation=new Map();


constructor()
{
      
}

getSingletonReadDbDataInstance()
{
    if(ReadData.readDbData==null)
    {
      ReadData.readDbData =new ReadData();

    }
    return ReadData.readDbData;

}
//this method will fetch all required data from firestore to server variables on server startup.
loadServerDb()
{
    //this.readAllNodeToCoordinateData();
    this.readNodeToNodeDistance();
    this.readNodeToStation();
    this.readStationToCoordinate();
}

//this function fetches all lists of coordinates 
readAllNodeToCoordinateData()
{
   
   const query = firebase.firestore().collection('NodeToCoordinate').get();

    
   query.then(snapshot => {
     snapshot.forEach(nodes => 
      {
        
          var nodePair=nodes.id;
          var coordList=nodes.data();

          ReadData.nodesToCoordinatesMap.set(nodePair,coordList['Coordinates']);

      });
        //printing the map for checking
        for (let [key, value] of ReadData.nodesToCoordinatesMap) 
        {
              console.log(key + ' = ' + value+"\n")
        }
         
        console.log("readAllNodeToCoordinateData function called");
   })
   .catch(error => {
     console.error(error);
   });
 }

readNodeToNodeDistance()
{
    const query = firebase.firestore().collection('NodeToNodeDistance').doc('distance(km)');

   
    query.get()
    .then(nodeToDistance => {
      if(nodeToDistance.exists)
        {
          ReadData.nodeTonodeDistance=nodeToDistance.data();

          ReadData.nodeTonodeDistance = new Map(Object.entries(ReadData.nodeTonodeDistance));
            
            //printing the map for checking
            for (let [key, value] of ReadData.nodeTonodeDistance) 
            {
                  console.log(key + ' = ' + value+"\n")
            }
           
            console.log("readNodeToNodeDistance function called");

        }

      else{
        console.log('User does not exist !');
      }
        
      })
    .catch(error => {
      console.error(error);
    });
}
readNodeToStation()
{
    const query = firebase.firestore().collection('NodeToStation').doc('mapping');
  
    query.get()
    .then(nodeTostation => {
      if(nodeTostation.exists)
        {
          ReadData.nodeTostation=nodeTostation.data();

          const Mp = new Map(Object.entries(ReadData.nodeTostation));

            //printing the map for checking
            for (let [key, value] of Mp) 
            {
                  console.log(key + ' = ' + value)
                  ReadData.stationToNode[value]=key
            }
            console.log("readNodeToStation function called");
        }

      else
        console.log('User does not exist !');
      })
    .catch(error => {
      console.error(error);
    });
}

readStationToCoordinate()
{
    const query = firebase.firestore().collection('StationToCoordinate').doc('mapping');

   
    query.get()
    .then(StationToCoordinate => {
      if(StationToCoordinate.exists)
        {
           ReadData.StationToCoordinate=StationToCoordinate.data();
           
            const Mp = new Map(Object.entries(ReadData.StationToCoordinate));

            //printing the map for checking
            for (let [key, value] of Mp) 
            {
                  console.log(key + ' = ' + value)
                  ReadData.CoordinateToStation.set(value,key);
            }

            console.log("readStationToCoordinate function called");

        }

      else
        console.log('User does not exist !');
      })
    .catch(error => {
      console.error(error);
    });
}



fetchNodesToCoordinatesMap()
{
    return ReadData.nodesToCoordinatesMap;
}
fetchNodeTonodeDistance()
{
    return ReadData.nodeTonodeDistance;
}
fetchNodeTostation(node)
{
    return ReadData.nodeTostation[node];   //returns station name
}
fetchstationToNode(stationName)
{
    return ReadData.stationToNode[stationName];     //returns node
}
fetchStationToCoordinate()
{
    return ReadData.StationToCoordinate;
}
fetchCoordinateToStation()
{
    return ReadData.CoordinateToStation;
}

}

module.exports={
    ReadData
}
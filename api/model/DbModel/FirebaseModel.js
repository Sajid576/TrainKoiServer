const firebase = require('./FirebaseConnection');
const fs = require('fs');

//this variable to list map keep all the lists of coordinates
let nodesToCoordinatesMap = {};      

//this variable store all the node to distance mapping value
let nodeTonodeDistance={};

//this variable store all the node to station mapping value
let nodeTostation;
let stationToNode={};

//this variable store all the station and junction name to coordinate mapping value
let StationToCoordinate;
//this variable store all the coordinate to station and junction name mapping value
let CoordinateToStation={};




//this method will fetch all required data from firestore to server variables on server startup.
function loadServerJson()
{
    readAllNodeToCoordinateData();
    readNodeToNodeDistance();
    readNodeToStation();
    readStationToCoordinate();
}

//this function fetches all lists of coordinates mapping with nodePair
function readAllNodeToCoordinateData()
{
   
   const query = firebase.firestore().collection('NodeToCoordinate').get();

   query.then(snapshot => {
     snapshot.forEach(nodes => 
      {
        
          var nodePair=nodes.id;
          var coordList=nodes.data();

          nodesToCoordinatesMap[nodePair]=coordList['Coordinates'];

      });
       // convert JSON object to a string
      const data = JSON.stringify(nodesToCoordinatesMap);
      //console.log(data);
         // write file to disk
      fs.writeFile('nodesToCoordinatesMap.json', data, 'utf8', (err) => {

        if (err) {
            console.log('Error writing file: nodesToCoordinatesMap'+err.message);
        } else {
            console.log('File is written successfully!');
        }

      });
        console.log("readAllNodeToCoordinateData function called");
   })
   .catch(error => {
     console.error(error);
   });
 }

//Used to fetch distances mapping with nodePair
function readNodeToNodeDistance()
{
    const query = firebase.firestore().collection('NodeToNodeDistance').doc('distance(km)');

   
    query.get()
    .then(nodeToDistance => {
      if(nodeToDistance.exists)
        {
          nodeTonodeDistance=nodeToDistance.data()['nodePairTodistanceMap'];
            // convert JSON object to a string
          const data = JSON.stringify(nodeTonodeDistance);
          // write file to disk
          fs.writeFile('nodeTonodeDistance.json', data, 'utf8', (err) => {

            if (err) {
                console.log('Error writing file:nodePairTodistanceMap '+err.message);
            } else {
                console.log('File is written successfully!');
            }

          });
          
           
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
//Used to fetch all stations mapping with their corresponding nodes
function readNodeToStation()
{
    const query = firebase.firestore().collection('NodeToStation').doc('mapping');
  
    query.get()
    .then(nodeTostation => {
      if(nodeTostation.exists)
        {
          nodeTostation=nodeTostation.data()['nodeToStationNameMap'];
          Object.entries(nodeTostation).forEach(([key,value]) => {
                  stationToNode[value]=key;
            })   
            // convert JSON object to a string
            const data = JSON.stringify(nodeTostation);
            const data1 = JSON.stringify(stationToNode);

            // write file to disk
            fs.writeFile('nodeTostation.json', data, 'utf8', (err) => {
  
              if (err) {
                  console.log('Error writing file: nodeTostation'+err.message);
              } else {
                  console.log('File is written successfully!');
              }
  
            });
            fs.writeFile('stationToNode.json', data1, 'utf8', (err) => {
  
              if (err) {
                  console.log('Error writing file: stationToNode'+err.message);
              } else {
                  console.log('File is written successfully!');
              }
  
            });


      }

      else
        console.log('User does not exist !');
      })
    .catch(error => {
      console.error(error);
    });
}
// used to read the coordinate value with their corresponding stations/junction
function readStationToCoordinate()
{
    const query = firebase.firestore().collection('StationToCoordinate').doc('mapping');

    query.get()
    .then(StationToCoordinate => {
      if(StationToCoordinate.exists)
        {
           StationToCoordinate=StationToCoordinate.data()['stationNameToGeoData'];
           Object.entries(StationToCoordinate).forEach(([key,value]) => {
                CoordinateToStation[value]=key;
           })


            // convert JSON object to a string
            const data = JSON.stringify(StationToCoordinate);
            const data1= JSON.stringify(CoordinateToStation);
            // write file to disk
            fs.writeFile('StationToCoordinate.json', data, 'utf8', (err) => {
  
              if (err) {
                  console.log('Error writing file: StationToCoordinate'+err.message);
              } else {
                  console.log(`File is written successfully!`);
              }
  
            });

            fs.writeFile('CoordinateToStation.json', data1, 'utf8', (err) => {
  
              if (err) {
                  console.log('Error writing file: CoordinateToStation'+err.message);
              } else {
                  console.log('File is written successfully!');
              }
  
            });



        }

      else
        console.log('User does not exist !');
      })
    .catch(error => {
      console.error(error);
    });
}


//used to fetch data from server json cached files upon requests
function fetchNodesToCoordinatesMap()
{
    let rawdata = fs.readFileSync('nodesToCoordinatesMap.json');
    let data = JSON.parse(rawdata);
    return data;
}
function fetchNodeTonodeDistance()
{
      let rawdata = fs.readFileSync('nodeTonodeDistance.json');
      let data = JSON.parse(rawdata);
      return data;
}
function fetchNodeTostation(node)
{
      let rawdata = fs.readFileSync('nodeTostation.json');
      let data = JSON.parse(rawdata);
      return data[node];   //returns station name
}
function fetchstationToNode(stationName)
{
    let rawdata = fs.readFileSync('stationToNode.json');
    let data = JSON.parse(rawdata);
    return data[stationName];     //returns node
}
function fetchStationToCoordinate()
{
  let rawdata = fs.readFileSync('StationToCoordinate.json');
  let data = JSON.parse(rawdata);
  return data;
    
}
function convertStationToCoordinate(stationName)
{
      let rawdata = fs.readFileSync('StationToCoordinate.json');
      let data = JSON.parse(rawdata);
      return data[stationName];
}

function fetchCoordinateToStation()
{
    let rawdata = fs.readFileSync('CoordinateToStation.json');
    let data = JSON.parse(rawdata);
    return data;
}

module.exports={
  loadServerJson,
  fetchCoordinateToStation,
  convertStationToCoordinate,
  fetchStationToCoordinate,
  fetchstationToNode,
  fetchNodeTostation,
  fetchNodeTonodeDistance,
  fetchNodesToCoordinatesMap
}

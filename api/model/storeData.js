 
 //this function will be used to store nodePair mapping with coordinateList
 function storeNodeToCoordinateData(nodePair,coordinateList)
 {
     const usersCollection = firebase.firestore().collection('NodeToCoordinate');
     usersCollection.doc(nodePair).set({
        Coordinates: firebase.firestore.FieldValue.arrayUnion(coordinateList)
    }, {merge: true})
    .then(()=>{
             console.log('Data has been saved successfully !');
             
           })
             
    .catch(error => {
         console.error(error)
     });
}

function storeNodeToNodeDistanceData(nodePair,distance)
{
    const usersCollection = firebase.firestore().collection('NodeToNodeDistance');
    usersCollection.doc('distance(km)').set({
        nodePair: distance,
       
   }, {merge: true})
   .then(()=>{
            console.log('Data has been saved successfully !');
             
          })
            
   .catch(error => {
        console.error(error)
    });
}

function storeNodeToStationData(node,stationName)
{
    const usersCollection = firebase.firestore().collection('NodeToStation');
    usersCollection.doc('mapping').set({
        node: stationName,
       
   }, {merge: true})
   .then(()=>{
            console.log('Data has been saved successfully !');
             
          })
            
   .catch(error => {
        console.error(error)
    });
}


function storeStationToCoordinateData(stationName,geo)
{
    const usersCollection = firebase.firestore().collection('StationToCoordinate');
    usersCollection.doc('mapping').set({
        stationName: geo,
       
   }, {merge: true})
   .then(()=>{
            console.log('Data has been saved successfully !');
             
          })
            
   .catch(error => {
        console.error(error)
    });
}
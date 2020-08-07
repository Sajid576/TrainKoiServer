var firebase = require('./FirebaseConnection');

//this variable holds the information of all the trains
var TrainLocationData={};

//this function used for fetching locations of all trains from cloud firestore
async function fetchTrainLocationFromDb()
{
    const snapshot = await firebase.firestore().collection('locations').get()
    snapshot.docs.map(doc => {
        TrainLocationData[doc.id]=doc.data();
    });
    console.log(TrainLocationData)   
}
//this function to store the train locations to the cloud firestore
function storeTrainLocationToDb()
{
    const Mp = new Map(Object.entries(TrainLocationData));
    const usersCollection = firebase.firestore().collection('locations');

    //printing the map for checking
    for (let [key, value] of Mp) 
    {
            console.log(key + ' = ' + value)
            usersCollection.doc(key).set({
            value, 
    }, {merge: true})
    .then(()=>{
             console.log('Data has been saved successfully !');
            }) 
    .catch(error => {
         console.error(error)
     });
     }

}
//this function to fetch the location and velocity of a particular train from 'TrainLocationData' variable 
// in server
function fetchTrainLoction(TrainName)
{
    return TrainLocationData[TrainName];
}

//this function will be used to update the information of all the trains in real time in server
function storeTrainLocation(TrainName,TrainData)
{
    TrainLocationData[TrainName]=TrainData;
    console.log(TrainLocationData);
    
}


module.exports={
  
    fetchTrainLoction,
    storeTrainLocation,
    fetchTrainLocationFromDb,
    storeTrainLocationToDb,
    
}


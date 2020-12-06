var firebase = require('../DbModel/FirebaseConnection');

//this variable holds the information of all the trains
var TrainLocationData={};

logger=()=>
{
    console.log(TrainLocationData) ;
}
//this function used for fetching locations of all trains from cloud firestore on server startup
function fetchTrainLocationFromDb()
{
    const query =firebase.firestore().collection('locations').doc('trainData').get();
    var trainObj={};
    query.then(trains=>{
        trainObj=trains.data()['Data'];
        //console.log(trainObj );
        
        trainObj.forEach(train=>{
            TrainLocationData[train['trainName']]=train;
        }); 
        logger();
    });  
}
//this function to store the train locations to the cloud firestore according to the daily schedule basis
//this function will be used later with event emitter so that we can store the train location once in a day.
//It will reduce the CRUD operation on database.
function storeTrainLocationToDb()
{

    const Mp = new Map(Object.entries(TrainLocationData));
    const usersCollection = firebase.firestore().collection('locations');

    //printing the map for checking
    for (let [key, value] of Mp) 
    {
            //console.log(key + ' = ' + value)
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
function storeTrainLocation(trainLocationModel)
{
    TrainLocationData[trainLocationModel.getTrainName()]=trainLocationModel.getJsonTrainData();
    console.log(TrainLocationData);
    
}


module.exports={
  
    fetchTrainLoction,
    storeTrainLocation,
    fetchTrainLocationFromDb,
    storeTrainLocationToDb,

}







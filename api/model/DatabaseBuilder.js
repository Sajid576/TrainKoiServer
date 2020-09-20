 
var firebase = require('./FirebaseConnection');
var trainData=require('./DatabaseBuilderModule/TrainData/TrainList')
//this class used for building the firebase cloud firestore database by storing  the collected 
//data in a organized way from text files
class DatabaseBuilder{

    constructor(station_junction_list,nodeToGeneratedCoordinateMap,nodeTonodeDistMap)
    {

        this.setNodeToCoordinateData(nodeToGeneratedCoordinateMap);
        this.setNodeToNodeDistanceData(nodeTonodeDistMap);
        this.setNodeToStationData_AND_stationToCoordinateData(station_junction_list);

    }
    //this function used to build the 'locations' table in firestore
    static async setLocationsData()
    {
        var trains= trainData.trainList;
        var list=[];
        trains.forEach(train=>{
            list.push({
                "trainName":train,
                "latitude":"23.323232",
                "longitude":"90.242242",
                "time":"null",
                "velocity":"3"
            });

        })
        
        const locationCollection =await firebase.firestore().collection('locations');
        await locationCollection.doc("trainData").set({
            Data: firebase.firestore.FieldValue.arrayUnion.apply(null,list)
        })
       
    
    }

    //this function will be used to assist the 'storeNodeToCoordinateData' method to store 
    //nodePair mapping with coordinateList into firebase cloud firestore
    setNodeToCoordinateData(nodeToGeneratedCoordinateMap)
    {
        for (let [key, value] of nodeToGeneratedCoordinateMap) 
        {
             this.storeNodeToCoordinateData(key,value);
        }
    }

    //this function will be used to store nodePair mapping with coordinateList into 
    //firebase cloud firestore
    storeNodeToCoordinateData(nodePair,coordinateList)
    {
        const usersCollection = firebase.firestore().collection('NodeToCoordinate');
        usersCollection.doc(nodePair).set({
            Coordinates: firebase.firestore.FieldValue.arrayUnion.apply(null,coordinateList)
        })
        .then(()=>{
                console.log('Data has been saved successfully !');
                
            })
                
        .catch(error => {
            console.error(error)
        });
    }
    
    
    //this function used to assist the 'storeNodeToNodeDistanceData' method to store 
    //the distance between every node pair to the firebase cloud firestore
    setNodeToNodeDistanceData(nodePairTodistanceMap)
    {
        var nodePairTodistanceObj= Object.fromEntries(nodePairTodistanceMap);
        this.storeNodeToNodeDistanceData(nodePairTodistanceObj);

    }
    //this function used to store distance between every node pair to the firebase cloud firestore
    //E.g-  1,2 : 5.5km
    storeNodeToNodeDistanceData(nodePairTodistanceMap)
    {
        
            const usersCollection = firebase.firestore().collection('NodeToNodeDistance');
            usersCollection.doc('distance(km)').set({
                nodePairTodistanceMap
        }, {merge: true})
        .then(()=>{
             console.log('Data has been saved successfully !');
                    
                })
                    
        .catch(error => {
                console.error(error)
            });
    }

    // Used to assist 'storeNodeToStationData' & 'storeStationToCoordinateData'  method
    //to store data 
    setNodeToStationData_AND_stationToCoordinateData(station_junction_list)
    {
        var NodeToStationMappingData=new Map();
        var StationToCoordinateMappingData=new Map();


        for (let [key, value] of station_junction_list) 
        {
             NodeToStationMappingData.set(value[0],key);
             StationToCoordinateMappingData.set(key,value[1]);

        }
        var NodeToStationObj= Object.fromEntries(NodeToStationMappingData);
        var StationToCoordinateObj= Object.fromEntries(StationToCoordinateMappingData);

        this.storeNodeToStationData(NodeToStationObj);
        this.storeStationToCoordinateData(StationToCoordinateObj);
    }

    //Used to store Station/junction name mapping with the corresponding nodes in firebase
    //cloud firestore. 
    //E.g-   1 : "kamlapur"
    storeNodeToStationData(nodeToStationNameMap)
    {
        
        const usersCollection = firebase.firestore().collection('NodeToStation');
        usersCollection.doc('mapping').set({
                nodeToStationNameMap,    
        }, {merge: true})
        .then(()=>{
                    console.log('Data has been saved successfully !');
                    
                })
                    
        .catch(error => {
                console.error(error)
            });
    }

    //Used to store Coordinate value mapping with the station/junction name in firebase firestore
    //E.g-  kamlapur : "23.322322,90.232326"
    storeStationToCoordinateData(stationNameToGeoData)
    {
        const usersCollection = firebase.firestore().collection('StationToCoordinate');
        usersCollection.doc('mapping').set({
            stationNameToGeoData
        
    }, {merge: true})
    .then(()=>{
                console.log('Data has been saved successfully !');
                
            })
                
    .catch(error => {
            console.error(error)
        });
    }


 }
 

module.exports={
    DatabaseBuilder
 }
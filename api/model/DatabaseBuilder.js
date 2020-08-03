 
var firebase = require('./FirebaseConnection');

//this class used for building the firebase cloud firestore database by storing  the collected 
//data from text files
class DatabaseBuilder{

    constructor(station_junction_list,nodeToGeneratedCoordinateMap,nodeTonodeDistMap)
    {

        this.setNodeToCoordinateData(nodeToGeneratedCoordinateMap);
        this.storeNodeToNodeDistanceData(nodeTonodeDistMap);
        this.setNodeToStationData_AND_stationToCoordinateData(station_junction_list);

    }

    setNodeToCoordinateData(nodeToGeneratedCoordinateMap)
    {
        for (let [key, value] of nodeToGeneratedCoordinateMap) 
        {
             this.storeNodeToCoordinateData(key,value);
        }
    }

    //this function will be used to store nodePair mapping with coordinateList
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

    setNodeToNodeDistanceData(nodePairTodistanceMap)
    {

    }
    // 1,2 : 5.5km
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


    setNodeToStationData_AND_stationToCoordinateData(station_junction_list)
    {
        var NodeToStationMappingData=new Map();
        var StationToCoordinateMappingData=new Map();


        for (let [key, value] of station_junction_list) 
        {
             NodeToStationMappingData.set(value[0],key);
             StationToCoordinateMappingData.set(key,value[1]);

        }

        this.storeNodeToStationData(NodeToStationMappingData);
        this.storeStationToCoordinateData(StationToCoordinateMappingData);
    }

    //1 : "kamlapur"
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

    // kamlapur : "23.322322,90.232326"
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
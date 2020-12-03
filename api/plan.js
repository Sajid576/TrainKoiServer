/**
 * UserModel={
 *           "uid":{
 *                  "username":"sajid",
 *                  "email":"sajid@example.com",
 *                  "dp":"23232edwdwd3stringbuffer64"
 *                  "coins":30,    
 *                  },
 * }
 * 
 * 
 * TrainLocationModel={
 *      "trainName":{
 *                  "coordinate":"23.232321,90.232534",
 *                  "velocity":4,
 *                  "acceleration":2,
 *                  "time":"23:11:45",
 *                  "date":"21/11/20",
 *                  "day":"sun",
 *                  "edge":"2,3"
 *                  "previousLocationData":["23.2322114,90.232522",
 *                                          "23.232211,90.232211",
 *                                          "23.2322211,90.232523",
 *                                           ......
 *                                         ]
 *                  
 *                  },
 *      "trainName2":{
 *                  ............
 * 
 *                      }
 * }
 * 
 * 
 * 
 * CrowdSourcingModel={
 *       "trainName":[
 *                    "unique-string":[
 *                                    {
    *                                    "coordinate":"23.2324242,90.2324221",
    *                                    "velocity":6,
    *                                    "acceleration":1,
    *                                    "time":"23:11:45",
    *                                     "date":"21/11/20",
    *                                     "day":"sun",
    *                                     "edge":"2,3"
 *                                      },
 *                                     {
    *                                    "coordinate":"23.2324250,90.2324267",
    *                                    "velocity":6,
    *                                    "acceleration":1,
    *                                    "time":"23:11:45",
    *                                     "date":"21/11/20",
    *                                     "day":"sun",
    *                                     "edge":"2,3"
 *                                      },
 *                                  ],
 *                   "unique-string":[
 *                                    ..........
 *                                    ],
 *                    ..........
 * 
 *                   ]     
 *       "trainName":[
 *                 ..........
 *                   ] 
 * 
 * }
 * 
 * DbModel(package)
 *            - FirebaseModel.js
 *            - FirebaseConnection.js
 *            - MongodbModel.js
 *            - (or any other model related to database)
 * 
 * DatabaseBuilderModel(package)
 *          - DatabaseBuilder.js
 *          - FileModel.js
 *          - Math.js
 * RouteBuilderModel(package)
 *          - Preprocess.js
 *          - dijkstra.js
 *          - Haversine.js
 *          - PriorityQueue.js
 *          - snapToRailway.js
 * 
 * TimeEstimatorModel(package)
 *          - TimeEstimator.js
 *          - (or any other module related to time estimation)
 * CrowdSourcingModel(package)
 *          - (or any other module related to)
 * 
 * 
 * 
 * 
 */
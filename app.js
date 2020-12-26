let cluster = require('cluster');
let mongooseConnection= require('./api/model/DbModel/MongoDBConnection');


mongooseConnection.connectMongoDB().then(()=>{
  console.log("Connected to the mongoose");
  if (cluster.isMaster) {
    const fireModel= require('./api/model/DbModel/FirebaseModel');
    fireModel.loadServerJson();
    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;
    console.log("There are "+cpuCount+" CPU core")
    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
      cluster.fork();
    }
  
    // Listen for dying workers
    cluster.on('exit', function () {
      cluster.fork();
    });
  } else {
    require('./server');
  }
}).catch((error)=>{
    console.log(error);
});


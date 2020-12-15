const http = require('http');

const express = require('express');
const app = express();
require('dotenv').config();

const setMiddleware =require('./api/Middlewares/Middleware');
const setRoutes = require('./api/routes/routes');

//Using Middleware from Middlewares directory
setMiddleware(app);

//Using Routes from Routes directory 
setRoutes(app);

const loadServer=require('./api/model/DbModel/readData');
const loadUserData=require('./api/model/DbModel/AuthenticationModel');
const loadTrainData=require('./api/model/CrowdSourcingModel/TrainLocationData');





const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port,()=>{
    console.log("Server listening on port: "+port);
    console.log("Environment variable is:  "+process.env.NODE_ENV);
    
   // new loadServer.ReadData().getSingletonReadDbDataInstance().loadServerDb();
    //loadTrainData.fetchTrainLocationFromDb();
    //new loadUserData.AuthenticaltionModel().readUserDataFromDb();

});


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







const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port,()=>{
    console.log("Server listening on port: "+port);
    console.log("Environment variable is:  "+process.env.NODE_ENV);
    
});


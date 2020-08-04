const http = require('http');
const express = require('express');
const app = express();

const loadServer=require('./api/model/readData');
const loadUserData=require('./api/model/AuthenticationModel');

var morgan = require('morgan')
app.use(morgan('dev'))

//this is used for parsing the body data from request
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Welcome to the TrainKoi")
})

const TrainRouteBuilderApi=require('./api/routes/routeBuilderApi');
const AuthenticationApi=require('./api/routes/AuthenticationApi');
const TransactionApi=require('./api/routes/TransactionApi');
const locationTrackingApi=require('./api/routes/locationTrackingApi');
const databaseBuilderApi=require('./api/routes/DatabaseBuilderApi')

app.use('/authenticationApi',AuthenticationApi);
app.use('/routeBuilderApi',TrainRouteBuilderApi);
app.use('/transactionApi',TransactionApi);
app.use('/locationTrackingApi',locationTrackingApi);

app.use('/databaseBuilderApi',databaseBuilderApi);

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port,()=>{
    console.log("Server listening on port: "+port);

    new loadUserData.AuthenticaltionModel().readUserDataFromDb();
    //db=new loadServer.ReadData().getSingletonReadDbDataInstance();
    //db.loadServerDb();

});


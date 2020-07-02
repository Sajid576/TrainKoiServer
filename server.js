const http = require('http');
const express = require('express');
const app = express();

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



app.use('/authenticationApi',AuthenticationApi);
app.use('/routeBuilderApi',TrainRouteBuilderApi);
app.use('/transactionApi',TransactionApi);

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);


const http = require('http');
const app = require('./app');


const TrainRouteBuilderApi=require('./api/routes/routeBuilderApi');
const AuthenticationApi=require('./api/routes/AuthenticationApi');
const TransactionApi=require('./api/routes/TransactionApi');

app.use('/routeBuilderApi',TrainRouteBuilderApi);
app.use('/authenticationApi',AuthenticationApi);
app.use('/transactionApi',TransactionApi);


const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);


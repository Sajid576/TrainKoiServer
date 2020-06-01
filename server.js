const http = require('http');
const app = require('./app');


const TrainRouteBuilder=require('./api/routes/routeBuilder');

app.use('/api/routeBuilder',TrainRouteBuilder);

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);


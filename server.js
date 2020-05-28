const http = require('http');
const app = require('./app');

const contactRoute=require('./api/routes/contacts');

app.use('/api/contacts',contactRoute);

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);
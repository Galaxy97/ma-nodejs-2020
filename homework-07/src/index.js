const http = require('http');
const routs = require('./routs');

const config = require('./config');

const hostname = config.host;
const {port} = config;

const server = http.createServer((req, res) => {
  routs.handle(req, res);
});

server.listen(port, hostname, () =>
  console.log(`Server is running at http://${hostname}:${port}/`),
);

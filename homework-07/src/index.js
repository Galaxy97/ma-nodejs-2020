const http = require('http');
const routs = require('./routs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  routs.handle(req, res);
});

server.listen(port, hostname, () =>
  console.log(`Server is running at http://${hostname}:${port}/`),
);

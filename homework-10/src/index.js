const environment = require('dotenv').config().parsed;
const http = require('http');

const routs = require('./routs');

const server = http.createServer((req, res) => {
  routs.handle(req, res);
});

server.listen(environment.PORT, environment.HOSTNAME, () =>
  console.log(
    `Server is running at http://${environment.HOSTNAME}:${environment.PORT}/`,
  ),
);

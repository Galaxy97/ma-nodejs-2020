const environment = require('dotenv').config().parsed;
const http = require('http');
const {sequelize} = require('./models');

const routs = require('./routs');

(async () => {
  try {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw error;
    }
    const server = http.createServer((req, res) => {
      routs.handle(req, res);
    });

    server.listen(environment.PORT, environment.HOSTNAME, () =>
      console.log(
        `Server is running at http://${environment.HOSTNAME}:${environment.PORT}/`,
      ),
    );
  } catch (error) {
    console.error(error);
  }
})();

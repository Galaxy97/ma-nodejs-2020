const environment = require('dotenv').config().parsed;

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: environment.DBHOST,
      port: environment.DBPORT,
      database: environment.DBNAME,
      user: environment.DBUSER,
      password: environment.DBPASSWD || '',
    },
    pool: {
      min: 2,
      max: 10,
    },
    debug: true,
    migrations: {
      tableName: 'knex_migrations',
      directory: 'src/migrations',
    },
  },
};

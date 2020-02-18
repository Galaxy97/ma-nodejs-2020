require('dotenv').config();

const config = {
  development: {
    username: process.env.DBUSER,
    password: process.env.DB_PSWD || null,
    database: process.env.DBNAME,
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    dialect: 'postgres',
    logging: true,
    pool: {
      max: 10,
      min: 0,
      idle: 5000,
      acquire: 5000,
      evict: 5000,
    },
  },
};

module.exports = config;

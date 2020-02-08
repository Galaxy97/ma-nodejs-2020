const environment = require('dotenv').config().parsed;
const DB = require('../../knexfile')[environment.NODE_ENV];

const config = {
  DB,
};

module.exports = config;

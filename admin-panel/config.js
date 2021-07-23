require('dotenv').config();
const { PG_CONNECTION_STRING } = process.env;

module.exports = {
    development: {
      url: PG_CONNECTION_STRING,
      dialect: 'postgres',
    },
    test: {
      url: PG_CONNECTION_STRING,
      dialect: 'postgres',
    },
    production: {
      url: PG_CONNECTION_STRING,
      dialect: 'postgres',
    },
  }
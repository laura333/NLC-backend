'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/nlc_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/nlc_test',
    debug: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};

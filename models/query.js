const {Client} = require('pg')
//
const config = require('config')
//
const client = new Client({
  user: config.get('pgUser'),
  host: config.get('pgHost'),
  database: config.get('pgDB'),
  password: config.get('pgPassword'),
  port: config.get('pgPort'),
  ssl: {
    rejectUnauthorized: false
  }
})


//
// const { Client } = require('pg');
//
//
// const client = new Client({
//   connectionString: config.get('connectionString'),
//   ssl: { rejectUnauthorized: false }
// });


module.exports = client

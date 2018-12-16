`use strict`;

const mysql = require('promise-mysql');

const host = require('./secrets')['host'];
const port = require('./secrets')['port'];
const dbUser = require('./secrets')['db-user'];
const password = require('./secrets')['password'];
const database = require('./secrets')['database'];

let getTasksFor = (userId) => {
  return mysql.createConnection({
    host,
    port,
    user: dbUser,
    password,
    database,
    charset: 'utf8mb4'
  })
  .then((connection) => {
    let query = `SELECT * from tasks WHERE user_id=${userId}`;
    return connection.query(query);
  })
  .then((results) => {
    console.log('results: ', results);
    if (results) {
      return results;
    } else {
      return [];
    }
  })
};


module.exports = {
    getTasksFor
};

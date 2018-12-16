'use strict';

let mysql = require('promise-mysql');
const { getLatLong } = require('../getLatLong');
const { getTasksFor } = require('../getTasksFor');

const host = require('../secrets')['host'];
const port = require('../secrets')['port'];
const dbUser = require('../secrets')['db-user'];
const password = require('../secrets')['password'];
const database = require('../secrets')['database'];

module.exports = {
  create: (req, res) => {
    let countryRegion = req.query.countryRegion;
    let adminDistrict = req.query.adminDistrict;
    let locality = req.query.locality;
    let postalCode = req.query.postalCode;
    let addressLine = req.query.addressLine;

    return getLatLong({ countryRegion, adminDistrict, locality, postalCode, addressLine })
      .then((latLong) => {
        return mysql.createConnection({
          host,
          port,
          user: dbUser,
          password,
          database,
          charset: 'utf8mb4'
        }).then((connection) => {
          let address = `${addressLine}, ${locality}, ${adminDistrict} ${countryRegion} ${postalCode}`;
          let user_id = req.query.userId;
          let lat = latLong[0];
          let lng = latLong[1];
          let priority = req.query.priority;
          let name = req.query.name;

          let query;

          if (priority) {
            query = 'INSERT into tasks (user_id, address, lat, lng, name, priority) VALUES (?,?,?,?,?,?)';
            return connection.query(query, [user_id, address, lat, lng, name, priority]);
          } else {
            query = 'INSERT into tasks (user_id, address, lat, lng, name) VALUES (?,?,?,?,?)';
            return connection.query(query, [user_id, address, lat, lng, name]);
          }
        })
        .then((results) => {
          if (results) {
            console.log('got results!');
            res.status(201).end();
          } else {
            console.log('no results!');
            res.status(500).end();
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).end();
      });
  },
  get: (req, res) => {
    return getTasksFor(req.params.userId)
      .then((tasks) => {
        res.json({ tasks });
      });
  },
}

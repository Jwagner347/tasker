'use strict';

let mysql = require('promise-mysql');
let { getLatLong } = require('../getLatLong');

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

          let query = 'INSERT into tasks (user_id, address, lat, lng) VALUES (?,?,?,?)';
          return connection.query(query, [user_id, address, lat, lng]);
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
  }
}

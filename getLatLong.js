'use strict';

const request = require('request-promise');
const key = require('./secrets')['api-key'];

let getLatLong = ({ countryRegion, adminDistrict, locality, postalCode, addressLine }) => {

    let options = {
        uri: 'http://dev.virtualearth.net/REST/v1/Locations',
        qs: {
            key,
            countryRegion,
            adminDistrict,
            locality,
            postalCode,
            addressLine
        },
        json: true
    };

    return request(options)
      .then((result) => {
        return result.resourceSets[0].resources[0].point.coordinates;
      })
      .catch((err) => {
        console.error(err);
      });
}

module.exports = {
    getLatLong
};

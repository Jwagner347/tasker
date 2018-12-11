'use strict';

const request = require('request-promise');
const key = require('./secrets')['api-key'];

let getLatLong = async ({ countryRegion, adminDistrict, locality, postalCode, addressLine }) => {

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

    let promise = request(options);

    let latLong = await promise;
    return latLong.resourceSets[0].resources[0].point.coordinates;
}

module.exports = {
    getLatLong
};

'use strict';

const chai = require('chai'),
      should = chai.should(),
      chaiAsPromised = require('chai-as-promised'),
      { getLatLong } = require('../getLatLong');

chai.use(chaiAsPromised);

describe('getLatLong', () => {
    it('returns the latitude and longitude for an address', () => {
      let latLong = [41.88526,-87.62148];
      let countryRegion = 'US';
      let adminDistrict = 'IL';
      let locality = 'Chicago';
      let postalCode = 60601;
      let addressLine = '200 E. Randolph Street';
      return getLatLong({countryRegion, adminDistrict, locality, postalCode, addressLine}).should.eventually.become(latLong);

    });
});

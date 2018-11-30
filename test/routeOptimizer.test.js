'use strict';

const chai = require('chai'),
      should = chai.should(),
      chaiAsPromised = require('chai-as-promised'),
      { routeOptimizer } = require('../routeOptimizer');

chai.use(chaiAsPromised);

describe('routeOptimizer', () => {

    let origins = [[47.6044,-122.3345]];
    let destinations = [[45.5347,-122.6231],[47.4747,-122.2057],[47.6731,-122.1185]];
    let optimizedDestinations = [ [ [ 47.4747, -122.2057 ] ],[ [ 47.6731, -122.1185 ] ],[ [ 45.5347, -122.6231 ] ] ];

    it('returns the optimal route to take based on travel times for 3 total tasks to complete', () => {
        return routeOptimizer({origins, destinations}).should.eventually.become(optimizedDestinations);

    });
});

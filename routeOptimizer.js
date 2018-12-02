
// returns the order of destinations to take

// eventually, will take into consideration how long each leg takes so that it can chop it off
// i.e. if I have 5 things I want to do and only 2 hours, but the shortest route takes me 2 hours just to do the first 3 things,
// then tell me that and only give me those three things
// this will also need to take into consideration the time it takes at each place to accomplish the task

const request = require('request-promise');
const key = require('./secrets')['api-key'];

let latLongReducer = (arrOfLatLong) => {
  let arrOfLatLongLength = arrOfLatLong.length;
  return arrOfLatLong.reduce((acc, curr, currIndex) => {
    if (arrOfLatLongLength === currIndex + 1) {
        return acc + curr.join(',');
    } else {
        return acc + curr.join(',') + ';';
    }
  }, '');
};


let routeOptimizer = ({ origins = [], destinations = [] } = {}) => {
  let latLongOrigins = origins;
  let latLongDestinations = destinations;
  let numOfDestinations = latLongDestinations.length;
  let optimizedDestinations = [];

  let options = {
      uri: 'https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix',
      qs: {
          key,
          origins: '',
          destinations: '',
          travelMode: 'driving'
      },
      json: true
  };

  let getOptimizedRoutes = () => {
    let latLongOriginsString = latLongReducer(latLongOrigins);
    let latLongDestinationsString = latLongReducer(latLongDestinations);

    options.qs.origins = latLongOriginsString;
    options.qs.destinations = latLongDestinationsString;

    return request(options)
      .then((result) => {
        let routeResults = result.resourceSets[0].resources[0].results;
        let nextDestinationIndex;
        let nextDestination;

        nextDestinationIndex = routeResults.sort((a, b) => {
            return a.travelDuration > b.travelDuration;
        })[0].destinationIndex;

        nextDestination = latLongDestinations.splice(nextDestinationIndex, 1);
        optimizedDestinations.push(nextDestination);

        latLongOrigins = nextDestination;

        while (optimizedDestinations.length < numOfDestinations) {
          return getOptimizedRoutes();
        }

        return optimizedDestinations;
      })
      .catch((err) => {
          console.error(err);
      });
  };

  return getOptimizedRoutes(options);
};

module.exports = {
    routeOptimizer
};

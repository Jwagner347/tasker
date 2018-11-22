// takes an object of {origin: [lat, long], destinations: [[lat, long], [lat, long]] OR destinations: { 1: [lat, long], 2: [lat, long]}
// makes a request to bing maps for best route
// returns the order of destinations to take

// eventually, will take into consideration how long each leg takes so that it can chop it off
// i.e. if I have 5 things I want to do and only 2 hours, but the shortest route takes me 2 hours just to do the first 3 things,
// then tell me that and only give me those three things
// this will also need to take into consideration the time it takes at each place to accomplish the task

const request = require('request-promise');
const key = require('./secrets')['api-key'];

let sampleOrigins = [[47.6044,-122.3345],[47.6731,-122.1185],[47.6149,-122.1936]];
let sampleDestinations = [[45.5347,-122.6231],[47.4747,-122.2057]];

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
    let latLongOrigins = latLongReducer(origins);
    let latLongDestinations = latLongReducer(destinations);
    
    let options = {
        uri: 'https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins',
        qs: {
            key,
            origins: latLongOrigins,
            destinations: latLongDestinations,
            travelMode: 'driving'
        },
        json: true
    };

    request(options)
        .then((result) => {
            console.log(result.resourceSets[0].resources);
            
        })
        .catch((err) => {
            console.error(err);
            
        });
};

routeOptimizer({origins: sampleOrigins, destinations: sampleDestinations});
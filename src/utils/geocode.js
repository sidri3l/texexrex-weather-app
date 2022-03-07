const request = require('request');

const geocode = (address, callback) => {
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2lkcmllbCIsImEiOiJja2hmZmp0MGowYjRkMzBxcDVjc2R1N3g3In0.Ap-UQyQkem5RhUfkyUK5fw&limit=1`;

    request({ url: geoUrl, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect do location services');
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Please try another search.');
        } else {
            const data = {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name,
            }
            
            callback(undefined, data);
        }
    })
};

module.exports = geocode; 
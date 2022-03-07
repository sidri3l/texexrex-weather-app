const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const weatherUrl = `http://api.weatherstack.com/current?access_key=3bd7bf849653ac015a1a7ee61796aba8&query=${latitude},${longitude}`;

    request({ url: weatherUrl, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!');
        } else if (response.body.error) {
            callback('Unable to find location');
        } else {
            const data = {
                decritption: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike,
            };
    
            callback(undefined, data);
        }
    });
};

module.exports = forecast;
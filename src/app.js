const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecastService = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publickDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publickDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "TexEXRex",
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: "TexEXRex",
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Help msg',
        name: 'TexExRex'
    })
});

app.get('/weather', (req, res) => {
    const { address } = req.query;

    if (!address) {
        return res.send({
            error: 'Please provide an address!',
        })
    }

    geocode(address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
    
        forecastService(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
    
            res.send({
                address,
                forecastData,
                location,
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term',
        })
     }

    res.send({
        proucts: [],
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Not Found',
        message: 'Help article not found',
        name: 'TexExRex'
    });
});


app.get('*', (req, res) => {
    res.render('404', {
        title: 'Not Found',
        message: 'Page not found',
        name: 'TexExRex'
    })
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
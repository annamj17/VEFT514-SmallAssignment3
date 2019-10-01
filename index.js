const service = require('./services/service');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

/****** CANDY ******/

// http://localshost:3000/api/candies     [GET]
// Gets all candies within the application
app.get('/api/candies', function (req, res) {
    return res.json(service.getAllCandy());
});

// http://localshost:3000/api/candies    [POST]
// Creates a new candy and returns status code 201 created
app.post('/api/candies', function (req, res) {
    const { body } = req;
    const createdCandy = service.createCandy(body);
    if (!createdCandy) { return res.status(412).json(body); }
    return res.status(201).json(createdCandy);
});

// http://localshost:3000/api/1     [GET]
// Gets candy after Id
app.get('/api/candies/:id', function (req, res) {
    const { id } = req.params;
    const candy = service.getCandyById(id);
    if (!candy) { return res.status(404).send('Id not found'); }
    return res.json(candy);
});

/****** OFFER ******/

// http://localhost:3000/api/offers     [GET]
// Gets all offers within the application and the output should include the
// nested candies within the offer object as seen in the Model Structure section
app.get('/api/offers', function (req, res) {
    return res.json(service.getAllOffers());
});

/****** PINATA ******/

// http://localhost:3000/api/pinatas     [GET]
// Gets all pinatas within the application
// Should contain all properties excluding surprise
app.get('/api/pinatas', function (req, res) {
    return res.json(service.getAllPinatas());
});

// http://localhost:3000/api/pinatas/1
// Gets a pinata with a certain id
// Should contain all properties excluding surprise
app.get('/api/pinatas/:id', function (req,res) {
    const { id } = req.params;
    const pinata = service.getPinataById(id);
    if (!pinata) { return res.status(404).send('Id not found'); }
    return res.json(pinata);
});


// http://localhost:3000/api/pinatas     [POST]
// Create a new pinata and returns status code 201 created
// Should also include a surprise property which can be either
// a written text or an URL to a valid image
app.post('/api/pinatas', function (req, res) {
    const { body } = req;
    const createdPinata = service.createPinata(body);
    if (!createdPinata) { return res.status(412).json(body); }
    return res.status(201).json(createdPinata);
});

// http://localhost:3000/api/pinatas/1/hit    [PATCH]
app.patch('/api/pinatas/:id/hit', function (req, res) {

});



// http://localhost:3000
app.listen(3000, function () {
    console.log('Server is listening on port 3000');
});
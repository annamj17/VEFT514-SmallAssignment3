const service = () => {

    const candies = require('../data/data').candies;
    const offers = require('../data/data').offers;
    const pinatas = require('../data/data').pinatas;

    function Offer(id, name, candies) {
        this.id = id,
        this.name = name,
        this.candies = candies
    }

    function Candy(id, name, description) {
        this.id = id,
        this.name = name,
        this.description = description
    }

    /****** CANDY ******/

    // Gets all candies within the application
    // DONE -> WORKS
    const getAllCandy = () => candies;

    // Creates a new candy and returns status code 201 created
    // DONE -> WORKS
    const createCandy = (candy) => {
        let highestId = 0;
        candies.map(c => { if (c.id > highestId) { highestId = c.id; } });
        const {id = highestId + 1, name, description} = candy;
        const createdCandy = { id, name, description, };
        candies.push(createdCandy);
        return createdCandy;
    };

    // Fetches candy after Id
    // DONE -> WORKS
    const getCandyById  = (id) => {
        var candy = candies.filter(g => g.id == id);
        return candy;
    };

    /****** OFFER ******/

    // Gets all offers with nested candies within the offer object
    // DONE -> WORKS
    const getAllOffers = () => {
        const getCandies = candies.map(candy => new Candy(candy.id, candy.name, candy.description));
        const getOffers = offers.map(offer => {
            const candies = offer.candies.map(candyId => 
                getCandies.filter(c => c.id === candyId).map(c => new Candy(c.id, c.name, c.description))[0]);
            return new Offer(offer.id, offer.name, candies)});

        return getOffers;
    };

    /****** PINATA ******/

    // Gets all pinatas within the application excluding "surprise"
    // DONE -> WORKS
    const getAllPinatas = () => {
        const getAllButSuprise = new Array();
        const getPinatas = pinatas;
        getPinatas.map(p => {
            let newPinata = {
                id: p.id,
                name: p.name,
                maximumHits: p.maximumHits
            };
            getAllButSuprise.push(newPinata);
            newPinata = null;
        });
        return getAllButSuprise;
    };

    // Gets a pinata with a certain id excluding "surprise"
    // DONE -> WORKS
    const getPinataById = (id) => {
        const pinata = getAllPinatas().filter(p => p.id == id);
        return pinata;
    };

    // Creates a new pinata and returns status code 201 created
    // DONE -> WORKS
    const createPinata = (pinata) => {
        let highestId = 0;
        pinatas.map(c => { if (c.id > highestId) { highestId = c.id; } });
        const { id = highestId + 1, name, surprise = "", maximumHits, numberOfHits = 0 } = pinata;
        const newPinata = { id, name, surprise, maximumHits, numberOfHits };
        pinatas.push(newPinata);
        return newPinata;
    };

    const hitThePinata = () => {

    };

    return {
        getAllCandy,
        createCandy,
        getCandyById,
        getAllOffers,
        getAllPinatas,
        getPinataById,
        createPinata,
        hitThePinata
    };
};

module.exports = service();
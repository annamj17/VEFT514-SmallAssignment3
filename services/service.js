const service = () => {
    const fs = require('fs');
    const request = require('request');
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
    const getAllCandy = () => candies;

    // Creates a new candy and returns status code 201 created
    const createCandy = (candy) => {
        let highestId = 0;
        candies.map(c => { if (c.id > highestId) { highestId = c.id; } });
        const { id = highestId + 1, name, description } = candy;
        const createdCandy = { id, name, description, };
        candies.push(createdCandy);
        return createdCandy;
    };

    // Fetches candy after Id
    const getCandyById = (id) => {
        var candy = candies.filter(g => g.id == id);
        return candy;
    };

    /****** OFFER ******/

    // Gets all offers with nested candies within the offer object
    const getAllOffers = () => {
        const getCandies = candies.map(candy => new Candy(candy.id, candy.name, candy.description));
        const getOffers = offers.map(offer => {
            const candies = offer.candies.map(candyId =>
                getCandies.filter(c => c.id === candyId).map(c => new Candy(c.id, c.name, c.description))[0]);
            return new Offer(offer.id, offer.name, candies)
        });

        return getOffers;
    };

    /****** PINATA ******/

    // Gets all pinatas within the application excluding "surprise"
    const getAllPinatas = () => {
        const getAllButSurprise = new Array();
        const getPinatas = pinatas;
        getPinatas.map(p => {
            let newPinata = {
                id: p.id,
                name: p.name,
                maximumHits: p.maximumHits
            };
            getAllButSurprise.push(newPinata);
            newPinata = null;
        });
        return getAllButSurprise;
    };

    // Gets a pinata with a certain id excluding "surprise"
    const getPinataById = (id) => {
        const pinata = getAllPinatas().filter(p => p.id == id);
        return pinata;
    };

    // Creates a new pinata and returns status code 201 created
    const createPinata = (pinata) => {
        let highestId = 0;
        pinatas.map(c => { if (c.id > highestId) { highestId = c.id; } });
        const { id = highestId + 1, name, surprise = "", maximumHits } = pinata;
        const newPinata = { id, name, surprise, maximumHits };
        pinatas.push(newPinata);
        return newPinata;
    };

    // Hits a certain pinata until its hit limit has been reachedv
    const hitThePinata = (id) => {
        const idIndex = (Object.values(id) - 1);

        if (pinatas[idIndex].maximumHits == 0) {
            var url = pinatas[idIndex].surprise
            var ending = url.substr(url.lastIndexOf('.') + 1);
            if (ending === "jpg" || ending === "png" || ending === "jpeg") {
                var filename = url.substring(url.lastIndexOf('/') + 1);
                filename = `./images/${filename}`;
                download(url, filename);
                function download(url, filename) {
                    request(url)
                        .pipe(fs.createWriteStream(filename));
                }
            }
            else {
                fs.appendFile('surprise.txt', pinatas[idIndex].surprise, function (err) {
                    console.log(err);
                });
                pinatas[idIndex].maximumHits = pinatas[idIndex].maximumHits - 1;
            }
            return pinatas[idIndex].surprise;
        }
        else if (pinatas[idIndex].maximumHits < 0) {
            return true;
        }
        pinatas[idIndex].maximumHits = pinatas[idIndex].maximumHits - 1;
        return false;
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
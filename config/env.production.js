'use strict';

// PRODUCTION CONFIG

module.exports = {
    db: {
        uri: 'mongodb://address-book:abcd1234@ds015760.mlab.com:15760/heroku_mfpzznqk'
    },
    authentication: {
        secret: 'abcd1234'
    },
    firebase: {
        url: 'https://address-book-test.firebaseIO.com'
    }
};

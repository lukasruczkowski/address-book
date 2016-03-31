'use strict';

var mongoose = require('mongoose');

module.exports = function (config) {
    var db = mongoose.connection;

    console.log('Connecting to MongoDB...');
    mongoose.connect(config.db.uri);

    db.on('error', function (err) {
        console.log('MongoDB connection error: ', err);
        process.exit(1);
    });

    db.once('open', function () {
        console.log('Connected to MongoDB');
    });

    return mongoose;
};

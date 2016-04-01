'use strict';

var request = require('request');

function FirebaseService(config) {
    this._config = config;
}

FirebaseService.prototype.post = function post(collection, data, callback) {
    var firebaseUrl = this._config.firebase.url + '/' + collection;
    var requestOptions = {
        method: 'post',
        body: data,
        json: true,
        url: firebaseUrl
    };

    request.post(requestOptions, function(error, response, body) {
        if (error || response.statusCode !== 200) {
            return callback();
        }

        return callback(body);
    });
};

module.exports = FirebaseService;

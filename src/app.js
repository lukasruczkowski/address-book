'use strict';

var express = require('express');
var bodyParser = require('body-parser');

// this must be defined in order to get the right configuration environment.
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

module.exports = function expressApp(config, statusController, userController) {
    var app = express();

    app.use(bodyParser.json());

    app.get('/', statusController.getStatus);
    app.get('/access_token', userController.authenticateUser)
    app.post('/accounts', userController.createAccount)

    return app;
};

'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;

// this must be defined in order to get the right configuration environment.
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

module.exports = function expressApp(
    Database,
    config,
    statusController,
    userController,
    authenticateService,
    contactController
) {
    var app = express();

    app.use(bodyParser.json());

    passport.use(new BearerStrategy(authenticateService.initialize));

    app.get('/', statusController.getStatus);
    app.get('/access_token', userController.authenticateUser);
    app.post('/accounts', userController.createAccount);
    app.post('/contacts', passport.authenticate('bearer', { session: false }), contactController.addContact);

    return app;
};

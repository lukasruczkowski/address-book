'use strict';

var defaultConfig = require(__dirname + '/config.default.js');
var _ = require('lodash');
var extend = require('extend');

module.exports = (function getConfig() {
    var env = process.env.NODE_ENV;
    var envConfigFile;
    var envConfig;

    if (!_.isString(env)) {
        env = 'production';
    }

    envConfigFile = './env.' + env + '.js';
    try {
        envConfig = require(envConfigFile);
    } catch (e) {
        console.log('Non-existent configuration file: ' + envConfigFile);
        console.log(e);
        process.exit(1);
    }

    return extend(true, defaultConfig, envConfig);
}());

'use strict';

var config = require(__dirname + '/config');

module.exports = {
    /*
     * Application
     */
    'config': ['value', config],
    'app': ['factory', require('./src/app')],
    'Database': ['factory', require('./src/Database')],

    /*
     * Controllers
     */
    'statusController': ['type', require('./src/controller/StatusController')],

    /*
     * Models
     */
    'User': ['factory', require('./src/model/User')]

    /*
     * Services
     */
};

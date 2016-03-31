'use strict';

var config = require(__dirname + '/config');

module.exports = {
    'config': ['value', config],
    'app': ['factory', require('./src/app')],

    /*
     * Controllers
     */
    'statusController': ['type', require('./src/controller/StatusController')],

    /*
     * Services
     */
};

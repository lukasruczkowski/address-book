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
    'userController': ['type', require('./src/controller/UserController')],
    'contactController': ['type', require('./src/controller/ContactController')],

    /*
     * Models
     */
    'User': ['factory', require('./src/model/User')],

    /*
     * Services
     */
    'userService': ['type', require('./src/service/UserService')],
    'authenticateService': ['type', require('./src/service/AuthenticateService')],
    'firebaseService': ['type', require('./src/service/FirebaseService')]
};

'use strict';

var jwt = require('jwt-simple');

function AuthenticateService(config, userService) {
    this._userService = userService;
    this._config = config;

    this.initialize = this.initialize.bind(this);
}

AuthenticateService.prototype.authenticate = function authenticate(email, password, callback) {
    var _this = this;

    _this._userService.getUser(email, function (err, user) {
        var accessToken;
        var secret = _this._config.authentication.secret;

        if (err || user.password !== password) {
            return callback({
                type: 'InvlidEmailPassword',
                message: 'Specified e-mail / password combination is not valid.'
            });
        }

        accessToken = jwt.encode(user, secret);

        return callback(null, accessToken);
    });
};

AuthenticateService.prototype.initialize = function initialize(accessToken, callback) {
    var secret = this._config.authentication.secret;
    var userObject;

    try {
        userObject = jwt.decode(accessToken, secret);
    } catch (e) {
        return callback();
    }

    this._userService.getUser(userObject.email, function (err, user) {
        if (err || user.password !== userObject.password) {
            return callback();
        }

        return callback(null, user);
    });
};

module.exports = AuthenticateService;

'use strict';

var jwt = require('jwt-simple');

function UserController(User, config) {
    this._User = User;
    this._config = config;
}

UserController.prototype.create = function create(user, callback) {
    this._User.create(user, function (err) {
        var errObject;
        if (err) {
            if (err.code === 11000) {
                errObject = {
                    type: 'EmailExists',
                    message: 'Specified e-mail address is already registered.'
                };
            } else {
                errObject = {
                    type: err.code,
                    message: err.message
                };
            }

            return callback(errObject);
        }

        return callback();
    });
};

UserController.prototype.authenticate = function authenticate(email, password, callback) {
    var _this = this;

    _this._User.findOne({ email: email }, function (err, user) {
        var accessToken;
        var secret = _this._config.authentication.secret;

        if (err) {
            return callback({
                type: err.code,
                message: err.message
            });
        }

        if (!user || user.password !== password) {
            return callback({
                type: 'InvlidEmailPassword',
                message: 'Specified e-mail / password combination is not valid.'
            });
        }

        accessToken = jwt.encode(user, secret);

        return callback(null, accessToken);
    });
};

module.exports = UserController;

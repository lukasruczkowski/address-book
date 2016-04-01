'use strict';

function UserService(User) {
    this._User = User;
}

UserService.prototype.create = function create(user, callback) {
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

UserService.prototype.getUser = function getUser(email, callback) {
    var _this = this;

    _this._User.findOne({ email: email }, function (err, user) {
        if (err) {
            return callback(err);
        }

        if (!user) {
            return callback(new Error('User with this email does not exist'));
        }

        return callback(null, user);
    });
};

module.exports = UserService;

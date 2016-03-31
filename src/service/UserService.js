'use strict';

function UserController(User) {
    this._User = User;
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

module.exports = UserController;

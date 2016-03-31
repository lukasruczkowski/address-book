'use strict';

function UserController(userService) {
    this._userService = userService;
    this.createAccount = this.createAccount.bind(this);
}

UserController.prototype.createAccount = function createAccount(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    if (!email) {
        return res.status(400).json({
            type: 'BadRequest',
            message: 'Missing parameter: [email]'
        });
    }
    if (!password) {
        return res.status(400).json({
            type: 'BadRequest',
            message: 'Missing parameter: [password]'
        });
    }

    this._userService.create(req.body, function (err) {
        if (err) {
            return res.status(400).json(err);
        }

        return res.send(201);
    });
};

module.exports = UserController;

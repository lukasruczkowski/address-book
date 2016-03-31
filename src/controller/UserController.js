'use strict';

function UserController(userService) {
    this._userService = userService;
    this.createAccount = this.createAccount.bind(this);
    this.authenticateUser = this.authenticateUser.bind(this);
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

UserController.prototype.authenticateUser = function authenticateUser(req, res) {
    var email = req.query.email;
    var password = req.query.password;

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

    this._userService.authenticate(email, password, function (err, accessToken) {
        if (err) {
            return res.status(401).json(err);
        }

        return res.json({ access_token: accessToken });
    });
};

module.exports = UserController;

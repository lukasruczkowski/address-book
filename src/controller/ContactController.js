'use strict';

var request = require('request');

function ContactController(config) {
    this._config = config;
    this.addContact = this.addContact.bind(this);
}

ContactController.prototype.addContact = function addContact(req, res) {
    var firebaseUrl = this._config.firebase.url + '/' + this._config.firebase.collection;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var phone = req.body.phone;
    var contact;
    var requestOptions;

    if (!firstName || !lastName || !phone) {
        return res.status(400).json({
            type: 'BadRequest',
            message: 'Missing parameter: [firstName|lastName|phone]'
        });
    }

    contact = {
        firstName: firstName,
        lastName: lastName,
        phone: phone
    };

    requestOptions = {
        method: 'post',
        body: contact,
        json: true,
        url: firebaseUrl
    };

    request.post(requestOptions, function(error, response, body) {
        if (error || response.statusCode !== 200) {
            return res.send(502);
        }

        if (body.error) {
            return res.status(400).json({
                type: 'BadRequest',
                message: body.error
            });
        }

        return res.send(201);
    });
};

module.exports = ContactController;

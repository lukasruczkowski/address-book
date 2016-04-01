'use strict';

function ContactController(config, firebaseService) {
    this._config = config;
    this._firebaseService = firebaseService;
    this.addContact = this.addContact.bind(this);
}

ContactController.prototype.addContact = function addContact(req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var phone = req.body.phone;
    var collection = 'contacts.json';
    var contact;

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

    this._firebaseService.post(collection, contact, function(response) {
        if (!response) {
            return res.send(502);
        }

        if (response.error) {
            return res.status(400).json({
                type: 'BadRequest',
                message: response.error
            });
        }

        return res.send(201);
    });


};

module.exports = ContactController;

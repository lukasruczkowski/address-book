'use strict';

function ContactController() {
    this.createContact = this.createContact.bind(this);
}

ContactController.prototype.createContact = function createContact(req, res) {
    res.json({status: 'OK'});
};

module.exports = ContactController;

'use strict';

var mongoose = require('mongoose');

module.exports = function () {
    var User;
    var userSchema = new mongoose.Schema({
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    });

    try {
        User = mongoose.model('User', userSchema);
    } catch (e) {
        User = mongoose.model('User');
    }

    return User;
};

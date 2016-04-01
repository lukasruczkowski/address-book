'use strict';

var assert = require('chai').assert;
var sinon = require('sinon');
var AuthenticateService = require('../../src/service/AuthenticateService');
var UserService = require('../../src/service/UserService');

describe('Authenticate Service:', function () {
    var config = {
        authentication: {
            secret: 'secret'
        }
    };

    var userService = new UserService({});
    var authService = new AuthenticateService(config, userService);

    describe('authenticate:', function () {
        describe('for valid user', function () {
            before(function () {
                var user = {
                    email: 'name.surname@email.com',
                    password: 'validPass'
                };
                sinon
                    .stub(userService, 'getUser')
                    .yields(null, user);
            });

            after(function () {
                userService.getUser.restore();
            });

            it('should return access token', function (done) {
                authService.authenticate('name.surname@email.com', 'validPass', function (err, accessToken) {
                    assert.equal(err, null);
                    assert.isDefined(accessToken);
                    done();
                });
            });
        });

        describe('for user with invalid email', function () {
            before(function () {
                sinon
                    .stub(userService, 'getUser')
                    .yields(new Error('not exist'));
            });

            after(function () {
                userService.getUser.restore();
            });

            it('should return error - InvlidEmailPassword', function (done) {
                authService.authenticate('name.surname@email.com', 'validPass', function (err, accessToken) {
                    assert.isDefined(err);
                    assert.isUndefined(accessToken);
                    assert.equal(err.type, 'InvlidEmailPassword');
                    done();
                });
            });
        });

        describe('for user with invalid password', function () {
            before(function () {
                var user = {
                    email: 'name.surname@email.com',
                    password: 'validPass'
                };
                sinon
                    .stub(userService, 'getUser')
                    .yields(null, user);
            });

            after(function () {
                userService.getUser.restore();
            });

            it('should return error - InvlidEmailPassword', function (done) {
                authService.authenticate('name.surname@email.com', 'invalidPass', function (err, accessToken) {
                    assert.isDefined(err);
                    assert.isUndefined(accessToken);
                    assert.equal(err.type, 'InvlidEmailPassword');
                    done();
                });
            });
        });
    });
});

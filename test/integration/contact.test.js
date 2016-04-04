'use strict';

var assert = require('chai').assert;
var request = require('supertest');
var sinon = require('sinon');
var di = require('di');
var injectorConfig = require('../../injectorConfig');
var injector = new di.Injector([injectorConfig]);
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;

var app = injector.get('app');
var firebaseService = injector.get('firebaseService');
var authenticateService = injector.get('authenticateService');

describe('Contact:', function () {
    describe('POST:/contacts', function () {
        var accessToken = 'abcd1234';
        var validData = {
            firstName: 'John',
            lastName: 'Doe',
            phone: '+420123456789'
        };
        var invalidData = {
            firstName: 'John',
            lastName: 'Doe'
        };

        describe('with valid response from Firebase server', function () {
            before(function () {
                // mocking Firebase service
                var firebaseResponse = { name: 'contact-id' };
                sinon
                    .stub(firebaseService, 'post')
                    .yields(firebaseResponse);

                // mocking Authentication service
                sinon
                    .stub(authenticateService, 'isBearerValid')
                    .yields(null, true);

                // reset passport settings
                passport.use(new BearerStrategy(authenticateService.isBearerValid));
            });

            after(function () {
                firebaseService.post.restore();
                authenticateService.isBearerValid.restore();
            });

            it('should return valid response - 201', function (done) {
                request(app)
                    .post('/contacts')
                    .type('json')
                    .set('Authorization', 'Bearer ' + accessToken)
                    .send(validData)
                    .expect(201)
                    .end(done);
            });
        });

        describe('with invalid response from Firebase server - no response', function () {
            before(function () {
                // mocking Firebase service
                sinon
                    .stub(firebaseService, 'post')
                    .yields(undefined);

                // mocking Authentication service
                sinon
                    .stub(authenticateService, 'isBearerValid')
                    .yields(null, true);

                // reset passport settings
                passport.use(new BearerStrategy(authenticateService.isBearerValid));
            });

            after(function () {
                firebaseService.post.restore();
                authenticateService.isBearerValid.restore();
            });

            it('should return invalid response - 502', function (done) {
                request(app)
                    .post('/contacts')
                    .type('json')
                    .set('Authorization', 'Bearer ' + accessToken)
                    .send(validData)
                    .expect(502)
                    .end(done);
            });
        });

        describe('with invalid response from Firebase server - returned error object', function () {
            before(function () {
                // mocking Firebase service
                var firebaseResponse = { error: 'some-error' };
                sinon
                    .stub(firebaseService, 'post')
                    .yields(firebaseResponse);

                // mocking Authentication service
                sinon
                    .stub(authenticateService, 'isBearerValid')
                    .yields(null, true);

                // reset passport settings
                passport.use(new BearerStrategy(authenticateService.isBearerValid));
            });

            after(function () {
                firebaseService.post.restore();
                authenticateService.isBearerValid.restore();
            });

            it('should return invalid response - 400', function (done) {
                request(app)
                    .post('/contacts')
                    .type('json')
                    .set('Authorization', 'Bearer ' + accessToken)
                    .send(validData)
                    .expect(400)
                    .end(done);
            });
        });

        describe('with invalid access token', function () {
            before(function () {
                // mocking Firebase service
                var firebaseResponse = { name: 'contact-id' };
                sinon
                    .stub(firebaseService, 'post')
                    .yields(firebaseResponse);

                // mocking Authentication service
                sinon
                    .stub(authenticateService, 'isBearerValid')
                    .yields(false);

                // reset passport settings
                passport.use(new BearerStrategy(authenticateService.isBearerValid));
            });

            after(function () {
                firebaseService.post.restore();
                authenticateService.isBearerValid.restore();
            });

            it('should return invalid response - unauthorized', function (done) {
                request(app)
                    .post('/contacts')
                    .type('json')
                    .set('Authorization', 'Bearer ' + accessToken)
                    .send(validData)
                    .expect(401)
                    .end(done);
            });
        });

        describe('with invalid json data - missing phone', function () {
            before(function () {
                // mocking Firebase service
                var firebaseResponse = { name: 'contact-id' };
                sinon
                    .stub(firebaseService, 'post')
                    .yields(firebaseResponse);

                // mocking Authentication service
                sinon
                    .stub(authenticateService, 'isBearerValid')
                    .yields(null, true);

                // reset passport settings
                passport.use(new BearerStrategy(authenticateService.isBearerValid));
            });

            after(function () {
                firebaseService.post.restore();
                authenticateService.isBearerValid.restore();
            });

            it('should return invalid response - 400', function (done) {
                request(app)
                    .post('/contacts')
                    .type('json')
                    .set('Authorization', 'Bearer ' + accessToken)
                    .send(invalidData)
                    .end(function (err, res) {
                        assert.equal(res.statusCode, 400);
                        assert.equal(res.body.type, 'BadRequest')
                        done();
                    });
            });
        });

    });
});

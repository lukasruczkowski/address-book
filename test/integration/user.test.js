'use strict';

var assert = require('chai').assert;
var request = require('supertest');
var di = require('di');
var injectorConfig = require('../../injectorConfig');
var injector = new di.Injector([injectorConfig]);

var app = injector.get('app');
var User = injector.get('User');

describe('User:', function () {
    describe('POST:/accounts', function () {

        describe('with valid parameters (email, password)', function () {
            after(function (done) {
                User.remove({}, function (err) {
                    if (err) {
                        return done(err);
                    }
                    return done();
                });
            });

            it('should return valid response - 201', function (done) {
                var body = {
                    email: 'a@b.c',
                    password: 'secret'
                };

                request(app)
                    .post('/accounts')
                    .type('json')
                    .send(body)
                    .expect(201)
                    .end(done);
            });
        });

        describe('with invalid parameters - missing email', function () {
            it('should return valid response - 201', function (done) {
                var body = {
                    password: 'secret'
                };

                request(app)
                    .post('/accounts')
                    .type('json')
                    .send(body)
                    .expect(400)
                    .end(done);
            });
        });

        describe('with invalid parameters - missing password', function () {
            it('should return valid response - 201', function (done) {
                var body = {
                    email: 'a@b.c'
                };

                request(app)
                    .post('/accounts')
                    .type('json')
                    .send(body)
                    .expect(400)
                    .end(done);
            });
        });
    });

    describe('GET:/access_token', function () {
        var user = {
            email: 'user@test.com',
            password: 'test'
        };

        before(function (done) {
            User.create(user, function(err) {
                if (err) {
                    return done(err);
                }
                return done();
            });
        });

        after(function (done) {
            User.remove({}, function (err) {
                if (err) {
                    return done(err);
                }
                return done();
            });
        });

        describe('with valid parameters (email, password)', function () {
            it('should return access token', function (done) {
                request(app)
                    .get('/access_token?email=' + user.email + '&password=' + user.password)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        assert.isDefined(res.body.access_token);
                        done();
                    });
            });
        });

        describe('with invalid email', function () {
            it('should return status code 401', function (done) {
                request(app)
                    .get('/access_token?email=invalid@test.com&password=' + user.password)
                    .expect(401)
                    .end(done);
            });
        });

        describe('with invalid password', function () {
            it('should return status code 401', function (done) {
                request(app)
                    .get('/access_token?email=' + user.email + '&password=invalid_pass')
                    .expect(401)
                    .end(done);
            });
        });

        describe('with invalid parameters - missing email', function () {
            it('should return status code 400', function (done) {
                request(app)
                    .get('/access_token?password=some_pass')
                    .expect(400)
                    .end(done);
            });
        });

        describe('with invalid parameters - missing password', function () {
            it('should return status code 400', function (done) {
                request(app)
                    .get('/access_token?email=some_email')
                    .expect(400)
                    .end(done);
            });
        });
    });
});


'use strict';

var assert = require('chai').assert;
var request = require('request');
var sinon = require('sinon');
var FirebaseService = require('../../src/service/FirebaseService');

describe('Firebase Service:', function() {
    var config = {
        firebase: {
            url: 'https://localhost.loc'
        }
    };
    var firebaseService = new FirebaseService(config);

    describe('for valid request', function() {
        before(function () {
            var responseObject = { statusCode: 200 };
            var bodyObject = { name: 'test' };
            sinon
                .stub(request, 'post')
                .yields(null, responseObject, bodyObject);
        });

        after(function () {
            request.post.restore();
        });

        it('should return valid response - 200', function (done) {
            firebaseService.post('collection.json', {some: 'data'}, function (response) {
                assert.equal(response.name, 'test');
                done();
            });
        });
    });

    describe('for invalid request with returned status code 200', function() {
        before(function () {
            var responseObject = { statusCode: 200 };
            var bodyObject = { error: 'test' };
            sinon
                .stub(request, 'post')
                .yields(null, responseObject, bodyObject);
        });

        after(function () {
            request.post.restore();
        });

        it('should return response with error object', function (done) {
            firebaseService.post('collection.json', {some: 'data'}, function (response) {
                assert.equal(response.error, 'test');
                done();
            });
        });
    });

    describe('for invalid request with returned status code 500', function() {
        before(function () {
            var responseObject = { statusCode: 500 };
            var bodyObject = { error: 'test' };
            sinon
                .stub(request, 'post')
                .yields(null, responseObject, bodyObject);
        });

        after(function () {
            request.post.restore();
        });

        it('should return invalid response', function (done) {
            firebaseService.post('collection.json', {some: 'data'}, function (response) {
                assert.equal(response, undefined);
                done();
            });
        });
    });
});

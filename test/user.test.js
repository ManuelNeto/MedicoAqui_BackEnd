'use strict';

var app = require('./app');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

describe('API Tests', function() {
  var user = {
    name: 'integration test',
    email: 'manuel@ccc.ufcg.edu.br',
    password: '123456',
    userKind: 'Patient',
    age: 22
  };

  describe('## Create user ', function() {
    it('should create a user', function(done) {
      request(app)
        .post('/user')
        .send(user)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.name).to.equal('integration test');
          user = res.body;
          done();
        });
    });
  });

  describe('# Get all users', function() {
    it('should get all users', function(done) {
      request(app)
        .get('/user')
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
  describe('Get a user by id', function() {
    it('should get a user', function(done) {
      request(app)
        .get('/users/' + user._id)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.name).to.equal('integration test');
          done();
        });
    });
  });

  describe('Update a user by id', function() {
    it('should modify a user', function(done) {
      user.name = 'New User'
      request(app)
        .put('/user/' + user._id)
        .send(user)
        .end(function(err, res) {
          expect(res.body.name).to.equal('New User');
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });
  describe('Delete a user by id', function() {
    it('should delete a user', function(done) {
      request(app)
        .delete('/users/' + user._id)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('User successfully deleted');
          done();
        });
    });
  });
});
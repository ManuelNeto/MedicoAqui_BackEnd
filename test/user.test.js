'use strict';
const mongoose = require("mongoose");
const User = mongoose.model('User');
const auth = require('../src/util/auth-service');

describe('API Tests', function() {
  
  var token_user = "";

  var user = {
    _id: new mongoose.mongo.ObjectId('23cb10bdc3499f14678934ca'),
    name: 'Manuel',
    email: 'manuel@ccc.ufcg.edu.br',
    password: '123456',
    userKind: 'Patient',
    age: 22
  };

  //excluindo o usuario do bd
  after((done) => {
    User.findOneAndRemove({name: user.name}).then((result) => {
        done();
    });
  });

  beforeEach((done) => {
      auth.generateToken({
          id: user._id,
          email: user.email,
          password: user.password,
          userKind: user.userKind
      }).then((res) =>{
          token_user = res;
      });
      done();
  });

  describe('## Create user ', function() {
    it('should create a user', function(done) {
      request
        .post('/user')
        .set("Content-type", 'application/json')
        .send(user)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message.name).to.equal('Manuel');
          user = res.body;
          done();
        });
    });
  });

   describe('# Get all users', function() {
    it('should get all users', function(done) {
      request
        .get('/user')
        .set("Content-type", 'application/json')
        .set("x-access-token", token_user)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });

  describe('Get a user by id', function() {
    it('should get a user', function(done) {
      request
        .get('/user/' + '23cb10bdc3499f14678934ca')
        .set("Content-type", 'application/json')
        .set("x-access-token", token_user)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.data.name).to.equal('Manuel');
          done();
        });
    });
  });

  describe('Update a user by id', function() {
    it('should modify a user', function(done) {
      request
        .put('/user/' + '23cb10bdc3499f14678934ca')
        .set("Content-type", 'application/json')
        .set("x-access-token", token_user)
        .send({
          _id: new mongoose.mongo.ObjectId('23cb10bdc3499f14678934ca'),
          name: 'New User',
          email: 'manuel@ccc.ufcg.edu.br',
          password: '123456',
          userKind: 'Patient',
          age: 22
        })
        .end(function(err, res) {
          expect(res.body.data.name).to.equal('New User');
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });

  describe('Delete a user by id', function() {
    it('should delete a user', function(done) {
      request
        .delete('/user/' + '23cb10bdc3499f14678934ca')
        .set("Content-type", 'application/json')
        .set("x-access-token", token_user)
        .end(function(err, res) {
          console.log(res.body);
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('REMOVED_USER');
          done();
        });
    });
  });
});
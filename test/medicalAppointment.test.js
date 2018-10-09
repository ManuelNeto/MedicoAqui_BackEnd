'use strict';

const mongoose = require("mongoose");
const User = mongoose.model('User');
const auth = require('../src/util/auth-service');

describe('API Tests', function() {
  
  var medicalAppointment = {
    _id: new mongoose.mongo.ObjectId('5bb5433f3beff72a30d69024'),
    doctor: new mongoose.mongo.ObjectId('5bb667a0e214e200d4b6f9a2'),
    patient: new mongoose.mongo.ObjectId('5bbcbf62bc7ff03c24fc7806'),
    time: "25/11/2018",
    prognostic: "Gastrite aguda"
  };

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

  describe('## Create medicalAppointment ', function() {
    it('should create a medicalAppointment', function(done) {
      request
        .post('/medicalAppointment')
        .set("Content-type", 'application/json')
        .set("x-access-token", token_user)
        .send(medicalAppointment)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          medicalAppointment = res.body;
          done();
        });
    });
  });

  describe('# Get all medicalAppointments', function() {
    it('should get all medicalAppointments', function(done) {
      request
        .get('/medicalAppointment')
        .set("Content-type", 'application/json')
        .set("x-access-token", token_user)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
  });

  describe('Get a medicalAppointment by id', function() {
    it('should get a medicalAppointment', function(done) {
      request
        .get('/medicalAppointment/' + '5bb5433f3beff72a30d69024')
        .set("Content-type", 'application/json')
        .set("x-access-token", token_user)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.data.prognostic).to.equal("Gastrite aguda");
          done();
        });
    });
  });

  describe('Update a Medical Appointment by id', function() {
    it('should modify a medicalAppointment', function(done) {
        medicalAppointment.name = 'New medical Appointment'
      request(app)
        .put('/medicalAppointment/' + '5bb5433f3beff72a30d69024')
        .set("Content-type", 'application/json')
        .set("x-access-token", token_user)
        .send({
          _id: new mongoose.mongo.ObjectId('5bb5433f3beff72a30d69024'),
          doctor: new mongoose.mongo.ObjectId('5bb667a0e214e200d4b6f9a2'),
          patient: new mongoose.mongo.ObjectId('5bbcbf62bc7ff03c24fc7806'),
          time: "25/11/2018",
          prognostic: "Cólite"
        })
        .end(function(err, res) {
          expect(res.body.data.prognostic).to.equal("Cólite");
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });

  describe('Delete a Medical Appointment by id', function() {
    it('should delete a Medical Appointment', function(done) {
      request
        .delete('/medicalAppointment/'  + '5bb5433f3beff72a30d69024')
        .set("Content-type", 'application/json')
        .set("x-access-token", token_user)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('REMOVED_MEDICALAPPOINTMENT');
          done();
        });
    });
  });
});
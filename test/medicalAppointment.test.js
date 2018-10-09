'use strict';

var app = require('../app');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

describe('API Tests', function() {
  
  var medicalAppointment = {
    doctor: new mongoose.mongo.ObjectId('56ad92bac3499g14678934ca'),
    patient: new mongoose.mongo.ObjectId('56cb91bdc3499f14678934ca'),
    time: "",
    prognostic: ""
  };

  describe('## Create medicalAppointment ', function() {
    it('should create a medicalAppointment', function(done) {
      request(app)
        .post('/medicalAppointment')
        .set("Content-type", 'application/json')
        .send(medicalAppointment)
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.name).to.equal('integration test');
          medicalAppointment = res.body;
          done();
        });
    });
  });

  describe('# Get all medicalAppointments', function() {
    it('should get all medicalAppointments', function(done) {
      request(app)
        .get('/medicalAppointment')
        .set("Content-type", 'application/json')
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });
  describe('Get a medicalAppointment by id', function() {
    it('should get a medicalAppointment', function(done) {
      request(app)
        .get('/medicalAppointment/' + medicalAppointment._id)
        .set("Content-type", 'application/json')
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.name).to.equal('integration test');
          done();
        });
    });
  });

  describe('Update a Medical Appointment by id', function() {
    it('should modify a medicalAppointment', function(done) {
        medicalAppointment.name = 'New medical Appointment'
      request(app)
        .put('/medicalAppointment/' + medicalAppointment._id)
        .set("Content-type", 'application/json')
        .send(medicalAppointment)
        .end(function(err, res) {
          expect(res.body.name).to.equal('New Medical Appointment');
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });
  describe('Delete a Medical Appointment by id', function() {
    it('should delete a Medical Appointment', function(done) {
      request(app)
        .delete('/medicalAppointment/' + medicalAppointment._id)
        .set("Content-type", 'application/json')
        .end(function(err, res) {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('Medical Appointment successfully deleted');
          done();
        });
    });
  });
});
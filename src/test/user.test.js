'use strict';

var app = require('../../app'),
  chai = require('chai'),
  request = require('supertest');

var expect = chai.expect;

describe('Todos list API Integration Tests', function() {
    describe('#GET / users', function() { 
      it('should get all users', function(done) { 
        request(app) .get('/user')
          .end(function(err, res) { 
            expect(res.statusCode).to.equal(200); 
            expect(res.body).to.be.an('array'); 
            expect(res.body).to.be.empty; 
            done(); 
          }); 
      });
    });
  });
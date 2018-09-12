/*jshint esversion: 6 */
/*global require, exports */
/*eslint no-console: 0 */
/* jshint strict: false */

const mongoose = require('mongoose');
const mongoErrors = require('mongo-errors');
const express = require('express');
const router = express.Router();
const responses = require('../util/responses');
const jwt = require('jsonwebtoken');

const MedicalAppointment = require('./medicalAppointment.model');


exports.getAll = function (req, res) {

    MedicalAppointment.find(function (err, medicalAppointments) {
        if(err) return responses.internalError(res);
        else if(!medicalAppointments){
            return responses.notFound(res, 'MEDICALAPPOINTMENT_NOT_FOUND');
        }
        return responses.ok(res, '', medicalAppointments);
    });

};

exports.getMedicalAppointment = function(req, res, next) {

    MedicalAppointment.findOne({_id: req.params.id}, function(err, medicalAppointment) {

        if(err) return responses.internalError(res);

        else if(!medicalAppointment){
            return responses.notFound(res, 'MEDICALAPPOINTMENT_NOT_FOUND');
        }
        return responses.ok(res, '', medicalAppointment);
    });
};

exports.createMedicalAppointment = function (req, res) {

      var medicalAppointment = new MedicalAppointment(req.body);
    
      medicalAppointment.save(function (err, next) {
          if (err) {
              return responses.badRequest(res, "DUPLICATE_MEDICALAPPOINTMENT");
          }
          return responses.created(res, 'SUCCESSFUL_MEDICALAPPOINTMENT_CREATION');
      });
};

exports.editMedicalAppointment = function (req, res) {

    if(!req.body._id){
        return responses.badRequest(res, 'MEDICALAPPOINTMENT_REQUIRED');
    }

    MedicalAppointment.findOneAndUpdate({_id: req.body._id}, medicalAppointment, {upsert: true, 'new': true}, function (err, updatedMedicalAppointment) {
        if(err){
            return responses.internalError(res);
        }
        return responses.ok(res, 'UPDATED_MEDICALAPPOINTMENT', updatedMedicalAppointment);
    });

};

exports.deleteMedicalAppointment =  function(req, res, next) {

    if(!req.params.id){
      return responses.badRequest(res, 'MEDICALAPPOINTMENT_NOT_FOUND');
    }

    MedicalAppointment.remove({_id: req.params.id}, function(err) {
        if(err) return responses.internalError(res);
        return responses.ok(res, 'REMOVED_MEDICALAPPOINTMENT');
    });

};

exports.param = function (req, res, next, _id) {
    var query = MedicalAppointment.findById(_id);

    query.exec(function (err, medicalAppointment) {
        if (err) {
            res.sendStatus(code404);
            return next(err);
        }
        if (!medicalAppointment) {
            res.sendStatus(code404);
            return next(new Error('can\'t find MedicalAppointment'));
        }

        req.medicalAppointment = medicalAppointment;
        return next();
    });
};

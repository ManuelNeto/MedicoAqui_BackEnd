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
const User = require('./user.model');


exports.getAll = function (req, res) {

  User.find(function (err, users) {
    if(err) return res.send(responses.internalError(res));

    else if(!users){
      return res.send(responses.notFound('USERS_NOT_FOUND'));
    }
    return res.send(responses.ok('', users));
  });

};

exports.getDoctors = async function(req, res, next) {
  await User.find({userKind: 'Doctor'}, function(err, user) {

    if(err) return res.send(responses.internalError(res));

    else if(!user){
      return res.send(responses.notFound('USERS_NOT_FOUND'));
    }
      return res.send(responses.ok('', user));
    });
};

exports.getDoctorsBySpecialty = async function(req, res, next) {
  await User.find({userKind: 'Doctor', speciality: req.body.speciality}, function(err, users) {

    if(err) return res.send(responses.internalError(res));

    else if(!users){
      return res.send(responses.notFound('USERS_NOT_FOUND'));
    }
      return res.send(responses.ok('', users));
    });
};

exports.getUser = async function(req, res, next) {
  await User.findOne({_id: req.params.id}, function(err, user) {

    if(err) return res.send(responses.internalError(res));

    else if(!user){
      return res.send(responses.notFound('USER_NOT_FOUND'));
    }
      return res.send(responses.ok('', user));
    });
};

exports.createUser = function (req, res) {
  if (req.body.password === '' || !req.body.password){
      res.status(400).send({ error: "Senha vazia" });
  } else {
      var user = new User(req.body);

      user.save(function (err, next) {
          if (err) {
              return res.send(responses.badRequest("DUPLICATE_EMAIL"));
          }
          return res.send(responses.created('SUCCESSFUL_USER_CREATION', {name: user.name}));
      });

  }
};

exports.editUser = function (req, res) {

  var user = new User(req.body);

  if(!user){
    return res.send(responses.badRequest('USER_REQUIRED'));
  }
  
  User.findOneAndUpdate({_id: req.body._id}, user, {upsert: true, 'new': true}, function (err, updatedUser) {
    if(err){
      if (err.code === mongoErrors.DuplicateKey) {
          return res.send(responses.badRequest("DUPLICATE_EMAIL"));
      }

      return res.send(responses.internalError(res));
    }

    return res.send(responses.ok('UPDATED_USER', updatedUser));
  });

};

exports.deleteUser =  function(req, res, next) {

    if(!req.params.id){
      return res.send(responses.badRequest('USER_REQUIRED'));
    }

    User.remove({_id: req.params.id}, function(err) {
        if(err) return res.send(responses.internalError(res));
        return res.send(responses.ok('REMOVED_USER'));
    });

};

exports.param = function (req, res, next, _id) {
    var query = User.findById(_id);

    query.exec(function (err, user) {
        if (err) {
            res.sendStatus(code404);
            return next(err);
        }
        if (!user) {
            res.sendStatus(code404);
            return next(new Error('can\'t find user'));
        }

        req.user = user;
        return next();
    });
};

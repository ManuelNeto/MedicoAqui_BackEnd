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
    if(err) return responses.internalError(res);

    else if(!users){
      return responses.notFound(res, 'USERS_NOT_FOUND');
    }
    return responses.ok(res, '', users);
  });

};

exports.getUser = function(req, res, next) {

  User.findOne({_id: req.params.id}, function(err, user) {

    if(err) return responses.internalError(res);

    else if(!user){
      return responses.notFound(res, 'USER_NOT_FOUND');
    }
      return responses.ok(res, '', user);
    });
};

exports.createUser = function (req, res) {

  if (req.body.password === '' || !req.body.password){
      res.status(400).send({ error: "Senha vazia" });
  } else {
      var password = req.body.password;
      delete req.body.password;
      var user = new User(req.body);
      user.setPassword(password);

      user.save(function (err, next) {
          if (err) {
              return responses.badRequest(res, "DUPLICATE_EMAIL");
          }

          let token = jwt.sign({id: next._id}, 'dna8A7D8A7y8d&H*&d*&*D7', {expiresIn: 86400});
          return responses.created(res, 'SUCCESSFUL_USER_CREATION', {name: user.name, token: token});

      });

  }
};

exports.editUser = function (req, res) {

  var password = "";
  if (req.body.password){
      password = req.body.password;
      delete req.body.password;
      delete req.body.cpassword;
  }
    delete  req.body.__v;

  var user = new User(req.body);

  if(!user){
    return responses.badRequest(res, 'USER_REQUIRED');
  }

    if (password && password !== '')
        user.setPassword(password)

  User.findOneAndUpdate({_id: req.body._id}, user, {upsert: true, 'new': true}, function (err, updatedUser) {

    if(err){
      if (err.code === mongoErrors.DuplicateKey) {
                return responses.badRequest(res, "DUPLICATE_EMAIL");
      }

      return responses.internalError(res);
    }

    return responses.ok(res, 'UPDATED_USER', updatedUser);
  });

};

exports.deleteUser =  function(req, res, next) {

    if(!req.params.id){
      return responses.badRequest(res, 'USER_REQUIRED');
    }

    User.remove({_id: req.params.id}, function(err) {
        if(err) return responses.internalError(res);
        return responses.ok(res, 'REMOVED_USER');
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

/*jshint esversion: 6 */
/*global require, exports */
/*eslint no-console: 0 */
/* jshint strict: false */

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


const User = require('../models/user.model');


exports.getAll = function (req, res) {

  return "getAll";

};

exports.getUser = function(req, res, next) {

  return "getUser";
};

exports.createUser = function (req, res) {
  return "createUser";
};

exports.editUser = function (req, res) {

  return "editUser";
};

exports.deleteUser =  function(req, res, next) {

  return "deleteUser";
};

/*jshint esversion: 6 */
/*global require, exports */
/*eslint no-console: 0 */
/* jshint strict: false */

const mongoose = require('mongoose');
const mongoErrors = require('mongo-errors');
const express = require('express');
const router = express.Router();
const md5 = require('md5');
const auth = require('./../util/auth-service');
const responses = require('../util/responses');
const loginService = require('./login.service.js');
const jwt = require('jsonwebtoken');

exports.authenticate = async (req, res, next) => {
    try {

        const user = await loginService.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY),
        });

        if(!user) return res.send(responses.notFound('EMAIL_OR_PASSWORD_INVALID'));

        const token = await auth.generateToken({
            id: user._id,
            email: user.email,
            password: user.password,
            userKind: user.userKind
        });

        var result = {
            token:  token,
            name: user.name,
            email: user.email
        }

        return res.send(responses.ok('USER_AUTHENTICATED', result));

    } catch (error) {
        res.send(responses.internalError());
    }
}


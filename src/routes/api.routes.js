/*jshint esversion: 6 */
/*global require, module */
/*eslint no-console: 0 */
/* jshint strict: false */

const express = require('express');
const router = express.Router();

const user = require('./api/user.route');

router.use('/user', user);

router.get('/', function (req, res) {
	res.send('<h1>\\\\\\Médico Aqui</h1><h4>Lorem ipsum dolor.</h4>');
});

module.exports = router;

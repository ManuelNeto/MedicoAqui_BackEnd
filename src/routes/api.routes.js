/*jshint esversion: 6 */
/*global require, module */
/*eslint no-console: 0 */
/* jshint strict: false */

const express = require('express');
const router = express.Router();

const user = require('../user/user.route');
const medicalAppointment = require('../medicalAppointment/medicalAppointment.route');

router.use('/user', user);
router.use('/medicalAppointment', medicalAppointment);


router.get('/', function (req, res) {
	res.send('<h1>\\\\\\Médico Aqui</h1><h4>Lorem ipsum dolor.</h4>');
});

module.exports = router;

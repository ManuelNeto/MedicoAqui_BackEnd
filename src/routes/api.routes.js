/*jshint esversion: 6 */
/*global require, module */
/*eslint no-console: 0 */
/* jshint strict: false */

const user = require('../user/user.route');
const medicalAppointment = require('../medicalAppointment/medicalAppointment.route');
const login = require('../login/login.route');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./../../config/swagger");


module.exports = (app) => {
    app.use('/user', user);
	app.use('/medicalAppointment', medicalAppointment);
	app.use('/login', login);
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
	app.get('/', function (req, res) {
		res.send('<h1>\\\\\\Médico Aqui</h1><h4>Lorem ipsum dolor.</h4>');
	});
	
}

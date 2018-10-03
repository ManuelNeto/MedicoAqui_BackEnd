/*jshint esversion: 6 */
/*global require, module */
/*eslint no-console: 0 */
/* jshint strict: false */

const user = require('../user/user.route');
const medicalAppointment = require('../medicalAppointment/medicalAppointment.route');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./../../config/swagger");


module.exports = (app) => {
    app.use('/user', user);
	app.use('/medicalAppointment', medicalAppointment);
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

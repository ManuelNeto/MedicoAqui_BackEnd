/*jshint esversion: 6 */
/*global require, module */
/*eslint no-console: 0 */
/* jshint strict: false */

let express = require('express');
let router = express.Router();
let MedicalAppointmentController = require('./medicalAppointment.controller');
const auth = require('./../util/auth-service');

router.get('/', auth.authorize, MedicalAppointmentController.getAll);
router.get('/:id', auth.authorize, MedicalAppointmentController.getMedicalAppointment);
router.post('/', auth.authorize, MedicalAppointmentController.createMedicalAppointment);
router.put('/', auth.authorize, MedicalAppointmentController.editMedicalAppointment);
router.delete('/:id', auth.authorize, MedicalAppointmentController.deleteMedicalAppointment);

module.exports = router;

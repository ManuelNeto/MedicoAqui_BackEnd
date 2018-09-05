/*jshint esversion: 6 */
/*global require, module */
/*eslint no-console: 0 */
/* jshint strict: false */

let express = require('express');
let router = express.Router();
let MedicalAppointmentController = require('./medicalAppointment.controller');

router.get('/', MedicalAppointmentController.getAll);
router.get('/:id', MedicalAppointmentController.getMedicalAppointment);
router.post('/', MedicalAppointmentController.createMedicalAppointment);
router.put('/', MedicalAppointmentController.editMedicalAppointment);
router.delete('/:id', MedicalAppointmentController.deleteMedicalAppointment);

module.exports = router;

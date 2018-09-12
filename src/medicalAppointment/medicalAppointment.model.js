var mongoose = require('mongoose');
var User = require('../user/user.model');

var medical_appointmentSchema = mongoose.Schema({

    doctor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    time: {
        type: {
            date: Date
        },
        required: true
    },

    prognostic: {
        type: String,
        required: true
    }


});

var medicalAppointment = mongoose.model('Medical_appointment', medical_appointmentSchema);

module.exports = medicalAppointment;
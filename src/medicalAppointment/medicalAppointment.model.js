var mongoose = require('mongoose');
var User = require('../user/user.model');

var medical_appointmentSchema = mongoose.Schema({

    doctor:{
        type: String,
        required: true
    },

    patient: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    prognostic: {
        type: String,
        required: true
    }


});

var MedicalAppointment = mongoose.model('Medical_appointment', medical_appointmentSchema);

var createMedical_appointment = function() {

    new MedicalAppointment({
        date: "25/02/2018", doctor: 'Sarah', prognostic: "prognostic", description: "description", patient: "Zé"
    }).save(function(error) {
        if (error) {
            console.log(error);
            console.error(" Data Insetion error! ");
        }
    });
};

//funcao para criar as salas somente uma unica vez.
MedicalAppointment.find(function (err, medical_appointment) {
    if (medical_appointment.length == 0) {
      createMedical_appointment();
    }
});
 

var medicalAppointment = mongoose.model('Medical_appointment', medical_appointmentSchema);

module.exports = medicalAppointment;
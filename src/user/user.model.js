var mongoose = require('mongoose');

var userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
    	type: String,
        unique: true,
    	required:true
    },

    password: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    specialty: {
        type: String
    },

    available_times: {
        type: [
            { date: Date,
              
        }],
        default: []
    },

    userKind: {
        type:String,
        enum: ['Doctor', 'Patient']
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User;
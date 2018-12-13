var mongoose = require('mongoose');
const md5 = require('md5');

var UserSchema = mongoose.Schema({

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

    speciality: {
        type: String
    },

    available_times: {
        type: [String],
    
    },

    userKind: {
        type:String,
        required: true,
        enum: ['Doctor', 'Patient']
    }
});

UserSchema.pre('save', function(next) {
    // check if password is present and is modified.
    if ( this.password && this.isModified('password') ) {
        this.password = md5(this.password + global.SALT_KEY);
    }
    next();
});



var User = mongoose.model('User', UserSchema);

module.exports = User;
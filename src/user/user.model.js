var mongoose = require('mongoose');
var crypto = require('crypto');

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
        required: true,
        enum: ['Doctor', 'Patient']
    },
    hash: String,
    salt: String
});

UserSchema.methods.setPassword = function (password){
    this.salt = crypto.randomBytes(16).toString('hex');
    UserSchema.salt = this.salt;
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
    console.log(this.hash);
    UserSchema.hash = this.hash;
};

UserSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
    return this.hash === hash;
};


var User = mongoose.model('User', UserSchema);

module.exports = User;
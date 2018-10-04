const mongoose = require("mongoose");
const User = require('../user/user.model');
const response = require('../util/responses');


exports.authenticate = async (data) => {
        const res = await User.findOne({
            email: data.email,
            password: data.password
        });
        return res;

};
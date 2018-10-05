const jwt = require('jsonwebtoken');
const response = require('./responses');


exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' });
}

exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, global.SALT_KEY);
    return data;
}

exports.authorize = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.send(response.unauthorized('RESTRICT_ACCESS'));
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.json(response.unauthorized('INVALID_TOKEN'));
            } else {
                next();
            }
        });
    }
}

exports.isPatient = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.send(response.unauthorized('RESTRICT_ACCESS'));
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.json(response.unauthorized('INVALID_TOKEN'));
            } else {
                if (decoded.userKind === 'Patient') {
                    next();
                } else {
                    res.json(response.unauthorized('RESTRICTED_ACCESS_TO_PATIENTS'));
                }
            }
        });
    }
};
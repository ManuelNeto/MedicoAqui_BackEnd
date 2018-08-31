/*jshint esversion: 6 */
/*global require, process, module */
/*eslint no-console: 0 */
/* jshint strict: false */

const jwt = require('jsonwebtoken');
const responses = require('./responses');

function verifyToken(req, res, next) {
	let token = req.headers.authorization;
	if (!token) {
		return responses.unauthorized(res, "NO_TOKEN_PROVIDED");
	}

	jwt.verify(token, 'dna8A7D8A7y8d&H*&d*&*D7', function (err, decoded) {
		if (err) {
			return responses.unauthorized(res, 'INVALID_TOKEN');
		}
		req.userId = decoded.id;
		next();
	});
}

module.exports = verifyToken;

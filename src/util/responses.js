/*jshint esversion: 6 */
/*global require, exports */
/*eslint no-console: 0 */
/* jshint strict: false */

let httpStatusCodes = require('http-status-codes');

exports.badRequest = function (res, message) {
    return res.status(httpStatusCodes.BAD_REQUEST).json({status: httpStatusCodes.BAD_REQUEST, message: message});
};

exports.unauthorized = function (res, message) {
    return res.status(httpStatusCodes.UNAUTHORIZED).json({status: httpStatusCodes.UNAUTHORIZED, message: message});
};

exports.conflict = function (res, message) {
    return res.status(httpStatusCodes.CONFLICT).json({
        status: httpStatusCodes.CONFLICT,
        message: message
    });
};

exports.created = function (res, message, data) {
    res.status(httpStatusCodes.CREATED).json({
        status: httpStatusCodes.CREATED,
        data: data,
        message: message
    });
};

exports.notFound = function (res, message) {
    return res.status(httpStatusCodes.NOT_FOUND).json({
        status: httpStatusCodes.NOT_FOUND,
        message: message
    });
};

exports.internalError = function (res) {
    return res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
        status: httpStatusCodes.INTERNAL_SERVER_ERROR,
        message: 'INTERNAL_ERROR'
    });
};

exports.ok = function (res, message, data) {
    return res.status(httpStatusCodes.OK).json({
        status: httpStatusCodes.OK,
        message: message,
        data: data
    });
};

exports.notModified = function (res) {
    return res.status(httpStatusCodes.NOT_MODIFIED).json({
        status: httpStatusCodes.NOT_MODIFIED,
        message: 'NOT_MODIFIED'
    });
};

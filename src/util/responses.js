/*jshint esversion: 6 */
/*global require, exports */
/*eslint no-console: 0 */
/* jshint strict: false */

let httpStatusCodes = require('http-status-codes');

exports.badRequest = function (message) {
    return {
        status: httpStatusCodes.BAD_REQUEST, 
        message: message
    };
};

exports.unauthorized = function (message) {
    return {
        status: httpStatusCodes.UNAUTHORIZED, 
        message: message
    };
};

exports.conflict = function (res, message) {
    return {
        status: httpStatusCodes.CONFLICT,
        message: message
    };
};

exports.created = function (res, message, data) {
    return {
        status: httpStatusCodes.CREATED,
        data: data,
        message: message
    };
};

exports.notFound = function (message) {
    return {
        status: httpStatusCodes.NOT_FOUND,
        message: message
    };
};

exports.internalError = function () {
    return {
        status: httpStatusCodes.INTERNAL_SERVER_ERROR,
        message: 'INTERNAL_ERROR'
    };
};

exports.ok = function ( message, data) {
    return {
        status: httpStatusCodes.OK,
        message: message,
        data: data
    };
};

exports.notModified = function (res) {
    return {
        status: httpStatusCodes.NOT_MODIFIED,
        message: 'NOT_MODIFIED'
    };
};

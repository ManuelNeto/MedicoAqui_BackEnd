var app = require('./config/express')();
var schedule = require('node-schedule');

require('./config/database.js')('mongodb://localhost/medicoAqui-backEnd');

module.exports = app;


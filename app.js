'use strict';

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  config = require('./config/index'),
  bodyParser = require('body-parser'),
  user = require('./src/user/user.model'),
  medicalAppointment = require('./src/medicalAppointment/medicalAppointment.model');


mongoose.Promise = global.Promise;
mongoose.connect(config.db);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./src/routes/api.routes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

console.log(config.port);

app.listen(config.port);

console.log('Médico Aqui RESTful API server started on: ' + config.port);

module.exports = app;
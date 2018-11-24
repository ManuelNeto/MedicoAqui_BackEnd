'use strict';

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  config = require('./config/index'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  user = require('./src/user/user.model'),
  medicalAppointment = require('./src/medicalAppointment/medicalAppointment.model');


mongoose.Promise = global.Promise;
mongoose.connect(config.db);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();  // sem o next, a chamada para aqui
});

var routes = require('./src/routes/api.routes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

console.log(config.port);

app.listen(config.port);

console.log('Médico Aqui RESTful API server started on: ' + config.port);

module.exports = app;
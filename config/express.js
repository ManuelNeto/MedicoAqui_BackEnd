var express = require("express");
var load = require('express-load');
var session = require('express-session');
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');
var http = require('http');

module.exports = function () {

    var app = express();

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });

    app.use(session(
        {
            secret: '0dc529ba-5051-4cd6-8b67-c9a901bb8bdf',
            resave: false,
            saveUninitialized: false
        }));

    app.use(cors({credentials: true}));

    // middleware
    app.use(express.static('./public'));
    app.use(express.static('./views'));

    app.set('view engine', 'html');
    app.engine('html', require('ejs').renderFile);
    app.set('views', './views');

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/', require('../src/routes/api.routes'));


    var server = app.listen(8081, function () {
        console.log('Medico Aqui application listening on port 8081!');
    });

    var io = require('socket.io').listen(server);

    load('models', {cwd: 'app'})
        .then('controllers')
        .then('routes')
        .into(app);

    return app;

};

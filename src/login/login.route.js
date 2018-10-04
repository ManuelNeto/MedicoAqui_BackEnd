/*jshint esversion: 6 */
/*global require, module */
/*eslint no-console: 0 */
/* jshint strict: false */

let express = require('express');
let router = express.Router();
let loginController = require('./login.controller');

router.post('/', loginController.authenticate);

module.exports = router;
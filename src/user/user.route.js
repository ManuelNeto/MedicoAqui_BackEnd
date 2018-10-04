/*jshint esversion: 6 */
/*global require, module */
/*eslint no-console: 0 */
/* jshint strict: false */
const auth = require('./../util/auth-service');
let express = require('express');
let router = express.Router();
let UserController = require('./user.controller');

router.get('/', auth.authorize, UserController.getAll);
router.get('/:id', auth.authorize, UserController.getUser);
router.post('/', UserController.createUser);
router.put('/', auth.authorize, UserController.editUser);
router.delete('/:id', auth.authorize, UserController.deleteUser);

module.exports = router;

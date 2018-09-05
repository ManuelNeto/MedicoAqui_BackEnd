/*jshint esversion: 6 */
/*global require, module */
/*eslint no-console: 0 */
/* jshint strict: false */

let express = require('express');
let router = express.Router();
let UserController = require('../../controllers/user.controller');

router.get('/', UserController.getAll);
router.get('/:id', UserController.getUser);
router.post('/', UserController.createUser);
router.put('/', UserController.editUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;

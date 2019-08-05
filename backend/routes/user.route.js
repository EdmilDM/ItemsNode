const express = require('express');

const userController = require('../controllers/user.controller');
const auth = require('../utils/auth');

const router = new express.Router();

router.post('/create-user', auth.optional, userController.createUser);
router.post('/login', auth.optional, userController.login);
module.exports = router;

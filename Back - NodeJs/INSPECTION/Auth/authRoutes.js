const express = require('express');
const router = express.Router();
const LoginController  = require('./loginController');


router.post('/login', LoginController.login);


module.exports = router;

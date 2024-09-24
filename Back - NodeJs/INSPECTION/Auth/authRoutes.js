const express = require('express');
const router = express.Router();
const LoginController = require('./loginController');

router.post('/register', LoginController.register);
router.post('/login', LoginController.login);
router.post('/request-password-reset', LoginController.requestPasswordReset);
router.post('/reset-password', LoginController.resetPassword);


module.exports = router;
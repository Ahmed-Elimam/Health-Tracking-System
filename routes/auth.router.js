const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validateLogin, validateRegister } = require('../middlewares/authValidation');

// router.post('/login', validateLogin, authController.login);
// router.post('/register', validateRegister, authController.register);
// router.post('/forget-password', authController.forgotPassword);
// router.post('/reset-password', authController.resetPassword)

module.exports = router;
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const registerSchema = require('../validators/RegisterValidator');
const validateRequest = require('../middlewares/validateRequest');
const loginSchema = require('../validators/loginValidator');
const upload = require('../middlewares/upload');

router.post(
    '/register',
    validateRequest(registerSchema),
    upload.single('profileImage'),
    authController.register
);
router.post('/login', validateRequest(loginSchema), authController.login);
router.get('/verify', authController.verify);
module.exports = router;

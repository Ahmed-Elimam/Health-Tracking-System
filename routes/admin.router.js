const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const verifyToken = require('../middlewares/authValidation');
const { authorizeRole } = require('../middlewares/roleMiddleware');

router
    .route('/')
    .get(verifyToken, authorizeRole('super-admin'), adminController.getAdmins)
    .post(
        verifyToken,
        authorizeRole('super-admin'),
        adminController.createAdmin
    );

router
    .route('/:id')
    .get(verifyToken, authorizeRole('super-admin'), adminController.getAdmin)
    .patch(
        verifyToken,
        authorizeRole('super-admin'),
        adminController.updateAdmin
    )
    .delete(
        verifyToken,
        authorizeRole('super-admin'),
        adminController.deleteAdmin
    );

module.exports = router;

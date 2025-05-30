const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor.controller');
const verifyToken = require('../middlewares/authValidation');
const { authorizeRole } = require('../middlewares/roleMiddleware');
const { checkOwnership } = require('../middlewares/checkOwnership');

router
    .route('/')
    .get(
        verifyToken,
        authorizeRole('super-admin', 'admin', 'patient'),
        doctorController.getDoctors
    )
    .post(
        verifyToken,
        authorizeRole('super-admin', 'admin'),
        doctorController.createDoctor
    );

router
    .get("/access-requests",verifyToken,authorizeRole("patient"),doctorController.getDoctorsRequestingAccess);

router
    .route('/:id')
    .get(verifyToken, doctorController.getDoctor)
    .patch(
        verifyToken,
        authorizeRole('super-admin', 'admin', 'doctor'),
        checkOwnership,
        doctorController.updateDoctor
    )
    .delete(
        verifyToken,
        authorizeRole('super-admin', 'admin'),
        checkOwnership,
        doctorController.deleteDoctor
    );

module.exports = router;

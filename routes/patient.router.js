const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient.controller');
const verifyToken = require('../middlewares/authValidation');
const { authorizeRole } = require('../middlewares/roleMiddleware');
const { checkOwnership } = require('../middlewares/checkOwnership');

router
    .route('/')
    .get(
        verifyToken,
        authorizeRole('super-admin', 'admin', 'doctor'),
        patientController.getPatients
    )
    .post(
        verifyToken,
        authorizeRole('super-admin', 'admin'),
        patientController.createPatient
    );

router
.post('/:id/request-access',verifyToken,authorizeRole("doctor"),patientController.requestAccess);
router
.post('/accept-access',verifyToken,authorizeRole("patient"),patientController.acceptAccess);
router
    .route('/:id')
    .get(
        verifyToken,
        authorizeRole('super-admin', 'admin'),
        checkOwnership,
        patientController.getPatient
    )
    .patch(
        verifyToken,
        authorizeRole('super-admin', 'admin', 'patient'),
        patientController.updatePatient
    )
    .delete(
        verifyToken,
        authorizeRole('super-admin', 'admin', 'patient'),
        patientController.deletePatient
    );

module.exports = router;

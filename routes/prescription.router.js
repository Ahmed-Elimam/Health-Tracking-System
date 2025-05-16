const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescription.controller');
const verifyToken = require('../middlewares/authValidation');

router
    .route('/')
    .get(verifyToken, prescriptionController.getPrescriptions)
    .post(verifyToken, prescriptionController.createPrescription);

router
    .route('/:id')
    .get(verifyToken, prescriptionController.getPrescription)
    .patch(verifyToken, prescriptionController.updatePrescription)
    .delete(verifyToken, prescriptionController.deletePrescription);

module.exports = router;

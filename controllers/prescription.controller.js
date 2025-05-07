const PrescriptionService = require('../services/prescription.service.js');
const AppError = require('../utils/AppError');

exports.createPrescription = async (req, res, next) => {
    try {
        const prescription = await PrescriptionService.createPrescription(req.body);
        res.status(201).json(prescription);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
}
exports.getPrescriptions = async (req, res, next) => {
    try {
        const prescriptions = await PrescriptionService.getPrescriptions(req.query);
        res.status(200).json(prescriptions);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
}

exports.getPrescription = async (req, res, next) => {
    try {
        const prescription = await PrescriptionService.getPrescription(req.params.id);
        res.status(200).json(prescription);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
}

exports.updatePrescription = async (req, res, next) => {
    try {
        const prescription = await PrescriptionService.updatePrescription(req.params.id, req.body);
        res.status(200).json(prescription);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
}

exports.deletePrescription = async (req, res, next) => {
    try {
        const prescription = await PrescriptionService.deletePrescription(req.params.id);
        res.status(200).json(prescription);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
}
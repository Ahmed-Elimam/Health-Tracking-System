const DoctorService = require("../services/doctor.service");
const AppError = require("../utils/AppError");

exports.createDoctor = async (req, res, next) => {
    try {
        const doctor = await DoctorService.createDoctor(req.body);
        res.status(201).json(doctor);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

exports.getDoctors = async (req, res, next) => {
    try {
        const doctors = await DoctorService.getDoctors(req.query);
        res.status(200).json(doctors);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

exports.getDoctor = async (req, res, next) => {
    try {
        const doctor = await DoctorService.getDoctor(req.params.id);
        res.status(200).json(doctor);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

exports.updateDoctor = async (req, res, next) => {
    try {
        const doctor = await DoctorService.updateDoctor(req.params.id, req.body);
        res.status(200).json(doctor);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

exports.deleteDoctor = async (req, res, next) => {
    try {
        const doctor = await DoctorService.deleteDoctor(req.params.id);
        res.status(200).json(doctor);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

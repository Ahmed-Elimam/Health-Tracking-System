const Doctor = require('../models/Doctor.js');
const PatientService = require('../services/patient.service.js');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync.js');

exports.createPatient = catchAsync(async (req, res, next) => {
    const patient = await PatientService.createPatient(req.body);
    res.status(201).json({
        patient,
    });
});

exports.getPatients = catchAsync(async (req, res, next) => {
    if (req.user.role === 'doctor') {
        const doctor = await Doctor.findOne({ userId: req.user.id });

        if (!doctor) {
            return next(new AppError('Doctor record not found', 404));
        }
        const patients = await PatientService.getDoctorPatients(doctor._id);

        res.status(200).json({
            patients,
        });
    } else {
        const patients = await PatientService.getPatients(req.query);
        res.status(200).json({
            patients,
        });
    }
});

exports.getPatient = catchAsync(async (req, res, next) => {
    const patient = await PatientService.getPatient(req.params.id);
    res.status(200).json({
        patient,
    });
});

exports.updatePatient = catchAsync(async (req, res, next) => {
    const patient = await PatientService.updatePatient(
        req.user.role === 'patient' ? req.user.id : req.params.id,
        req.body
    );
    if (!patient) {
        return next(new AppError('patient not Found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            patient: patient,
        },
    });
});
exports.updatePatient = catchAsync(async (req, res, next) => {
    const patient = await PatientService.updatePatient(req.params.id, req.body);
    if (!patient) {
        return next(new AppError('patient not Found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            patient: patient,
        },
    });
});

exports.deletePatient = catchAsync(async (req, res) => {
    const patient = await PatientService.deletePatient(req.params.id);
    if (!patient) {
        return next(new AppError('patient not Found', 404));
    }
    res.status(204).json({
        status: 'success',
    });
});

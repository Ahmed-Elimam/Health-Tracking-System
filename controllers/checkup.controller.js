const Doctor = require('../models/Doctor.js');
const CheckupService = require('../services/checkup.service.js');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync.js');

exports.createCheckups = catchAsync(async (req, res, next) => {
    const checkups = await CheckupService.createCheckup(req.body);
    res.status(201).json(checkups);
});
exports.getCheckups = catchAsync(async (req, res, next) => {
    if (req.user.role === 'doctor') {
        const checkups = await CheckupService.getDoctorCheckups(req.user.id);
        res.send(checkups);
    } else if (req.user.role === 'patient') {
        const checkups = await CheckupService.getPatientCheckups(req.user.id);
        res.send(checkups);
    } else {
        const checkups = await CheckupService.getCheckups(req.query);
        res.send(checkups);
    }
});
exports.getCheckup = catchAsync(async (req, res, next) => {
    if (req.user.role === 'doctor') {
        const checkup = await CheckupService.getDoctorCheckup(
            req.user.id,
            req.params.id
        );
        res.send(checkup);
    } else if (req.user.role === 'patient') {
        const checkup = await CheckupService.getPatientCheckup(
            req.user.id,
            req.params.id
        );
        res.send(checkup);
    } else {
        const checkup = await CheckupService.getCheckup(req.params.id);
        res.status(200).json(checkup);
    }
});
exports.updateCheckup = catchAsync(async (req, res, next) => {
    const checkup = await CheckupService.updateCheckup(req.params.id, req.body);
    res.status(200).json(checkup);
});
exports.deleteCheckup = catchAsync(async (req, res, next) => {
    const checkup = await CheckupService.deleteCheckup(req.params.id);
    res.status(203).json(checkup);
});

const DoctorService = require('../services/doctor.service');
const catchAsync = require('../utils/catchAsync');

exports.createDoctor = catchAsync(async (req, res) => {
    const doctor = await DoctorService.createDoctor(req.body);
    res.status(201).json(doctor);
});

exports.getDoctors = catchAsync(async (req, res, next) => {
    if (req.user.role == 'admin' || req.user.role == 'super-admin') {
        const doctors = await DoctorService.getDoctors_Admin(req.query);
        res.status(200).json(doctors);
    } else if (req.user.role == 'patient') {
        const doctors = await DoctorService.getDoctors_Patient(
            req.query,
            req.user
        );
        res.status(200).json(doctors);
    } else next(new AppError('Not authorized', 403));
});

exports.getDoctor = catchAsync(async (req, res, next) => {
    if (req.user.role == 'admin' || req.user.role == 'super-admin') {
        const doctor = await DoctorService.getDoctor_Admin(req.params.id);
        res.status(200).json(doctor);
    } else if (req.user.role == 'doctor') {
        try {
            const doctor = await DoctorService.getDoctor_Doctor(
                req.params.id,
                req.user.id
            );
            res.status(200).json(doctor);
        } catch (error) {
            next(new AppError(error.message, 403));
        }
    } else if (req.user.role == 'patient') {
        const doctor = await DoctorService.getDoctor_Patient(
            req.params.id,
            req.user
        );
        res.status(200).json(doctor);
    }
});

exports.updateDoctor = catchAsync(async (req, res, next) => {
    if (req.user.role == 'admin' || req.user.role == 'super-admin') {
        const doctor = await DoctorService.updateDoctor_Admin(
            req.params.id,
            req.body
        );
        res.status(200).json(doctor);
    } else if (req.user.role == 'doctor') {
        const doctor = await DoctorService.updateDoctor_Doctor(
            req.params.id,
            req.body,
            req.user.id
        );
        res.status(200).json(doctor);
    } else next(new AppError('Not authorized', 403));
});

exports.deleteDoctor = catchAsync(async (req, res) => {
    const doctor = await DoctorService.deleteDoctor(req.params.id);
    res.status(200).json(doctor);
});

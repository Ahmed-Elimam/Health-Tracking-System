const TreatingService = require('../services/treating.service');
const catchAsync = require('../utils/catchAsync');

exports.getTreatings = catchAsync(async (req, res, next) => {
    if (req.user.role == 'admin' || req.user.role == 'super-admin') {
        const treatings = await TreatingService.getTreatings_Admin(req.query);
        res.status(200).json(treatings);
    } else if (req.user.role == 'doctor') {
        const treatings = await TreatingService.getTreatings_Doctor(
            req.query,
            req.user
        );
        res.status(200).json(treatings);
    } else if (req.user.role == 'patient') {
        const treatings = await TreatingService.getTreatings_Patient(
            req.query,
            req.user
        );
        res.status(200).json(treatings);
    } else next(new AppError('Not authorized', 403));
});

exports.getTreating = catchAsync(async (req, res, next) => {
    if (req.user.role == 'admin' || req.user.role == 'super-admin') {
        const treating = await TreatingService.getTreatings_Admin(
            req.params.id
        );
        res.status(200).json(treating);
    } else if (req.user.role == 'doctor') {
        const treating = await TreatingService.getTreatings_Doctor(
            req.params.id,
            req.user
        );
        res.status(200).json(treating);
    } else if (req.user.role == 'patient') {
        const treating = await TreatingService.getTreatings_Patient(
            req.params.id,
            req.user
        );
        res.status(200).json(treating);
    } else next(new AppError('Not authorized', 403));
});

exports.createTreating = catchAsync(async (req, res, next) => {
    if (req.user.role == 'admin' || req.user.role == 'super-admin') {
        const treating = await TreatingService.createTreatings(req.body);
        res.status(200).json(treating);
    } else if (req.user.role == 'doctor') {
        const treating = await TreatingService.createTreatings(
            req.body,
            req.user
        );
        res.status(200).json(treating);
    } else next(new AppError('Not authorized', 403));
});

exports.updateTreating = catchAsync(async (req, res, next) => {
    if (req.user.role == 'admin' || req.user.role == 'super-admin') {
        const treating = await TreatingService.updateTreatings(
            req.params.id,
            req.body
        );
        res.status(200).json(treating);
    } else if (req.user.role == 'doctor') {
        const treating = await TreatingService.updateTreatings(
            req.params.id,
            req.body,
            req.user
        );
        res.status(200).json(treating);
    } else next(new AppError('Not authorized', 403));
});

exports.deleteTreating = catchAsync(async (req, res) => {
    const treating = await TreatingService.deleteTreatings(
        req.params.id,
        req.user
    );
    res.status(200).json(treating);
});

const treatingService = require("../services/treating.service");
const catchAsync = require("../utils/catchAsync");

exports.getTreatings = catchAsync( async (req, res) => {
    const treatings = await treatingService.getTreatings(req.query,req.user);
    res.status(200).json(treatings);
});

exports.getTreating = catchAsync( async (req, res) => {
    const treating = await treatingService.getTreatings(req.params.id,req.user);
    res.status(200).json(treating);
});

exports.createTreating = catchAsync( async (req, res) => {
    const treating = await treatingService.createTreatings(req.body,req.user);
    res.status(201).json(treating);
});

exports.updateTreating = catchAsync( async (req, res) => {
    const treating = await treatingService.updateTreatings(req.params.id, req.body,req.user);
    res.status(200).json(treating);
});

exports.deleteTreating = catchAsync( async (req, res) => {
    const treating = await treatingService.deleteTreatings(req.params.id,req.user);
    res.status(200).json(treating);
});
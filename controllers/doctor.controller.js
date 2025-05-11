const DoctorService = require("../services/doctor.service");
const catchAsync = require("../utils/catchAsync");

exports.createDoctor = catchAsync( async (req, res) => {
    const doctor = await DoctorService.createDoctor(req.body);
    res.status(201).json(doctor);
});

exports.getDoctors = catchAsync( async (req, res) => {
    const doctors = await DoctorService.getDoctors(req.query,req.user);
    res.status(200).json(doctors);
});

exports.getDoctor = catchAsync( async (req, res) => {
    const doctor = await DoctorService.getDoctor(req.params.id);
    res.status(200).json(doctor);
});

exports.updateDoctor = catchAsync( async (req, res) => {
    const doctor = await DoctorService.updateDoctor(req.params.id, req.body);
    res.status(200).json(doctor);
});

exports.deleteDoctor = catchAsync( async (req, res) => {
    const doctor = await DoctorService.deleteDoctor(req.params.id);
    res.status(200).json(doctor);
});

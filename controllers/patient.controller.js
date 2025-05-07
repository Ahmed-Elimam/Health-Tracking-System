const PatientService = require("../services/patient.service.js");
const AppError = require("../utils/AppError");
exports.createPatient = async (req, res, next) => {
  try {
    const patient = await PatientService.createPatient(req.body);
    res.send(patient);
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

exports.getPatients = async (req, res, next) => {
  try {
    const patients = await PatientService.getPatients(req.query);
    res.send(patients);
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

exports.getPatient = async (req, res, next) => {
  try {
    const patient = await PatientService.getPatient(req.query.id);
    res.send(patient);
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

exports.updatePatient = async (req, res, next) => {
  try {
    const patient = await PatientService.updatePatient(req.params.id, req.body);
    res.send(patient);
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const patient = await PatientService.deletePatient(req.params.id);
    res.send(patient);
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

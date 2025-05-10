const Prescription = require("../models/Prescription");
const { parseQueryParams } = require("../utils/parseQueryParams");
exports.getPrescriptions = async (query) => {
  const { filters, sorts } = parseQueryParams(query);
  return await Prescription.find(filters).sort(sorts);
};

exports.getPrescriptionById = async (prescriptionId) => {
  return await Prescription.findById(prescriptionId);
};

exports.createPrescription = async (prescriptionData) => {
  return await Prescription.create(prescriptionData);
};

exports.updatePrescription = async (prescriptionId, prescriptionData) => {
  return await Prescription.findByIdAndUpdate(
    prescriptionId,
    prescriptionData,
    { new: true }
  );
};

exports.deletePrescription = async (prescriptionId) => {
  return await Prescription.findByIdAndDelete(prescriptionId);
};

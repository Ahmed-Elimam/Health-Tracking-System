const Doctor = require("../models/Doctor");
const { parseQueryParams } = require("../utils/parseQueryParams");

exports.getDoctors = async (query) => {
  const { filters, sorts } = parseQueryParams(query);
  return await Doctor.find(filters).sort(sorts).populate("userId");
};

exports.getDoctor = async (doctorId) => {
  return await Doctor.findById(doctorId).populate("userId");
};

exports.createDoctor = async (doctorData) => {
  return await Doctor.create(doctorData);
};

exports.updateDoctor = async (doctorId, doctorData) => {
  return await Doctor.findByIdAndUpdate(doctorId, doctorData, { new: true });
};

exports.deleteDoctor = async (doctorId) => {
  return await Doctor.findByIdAndDelete(doctorId);
};

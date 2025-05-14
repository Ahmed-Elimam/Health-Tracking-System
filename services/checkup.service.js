const Checkup = require("../models/Checkup");
const { parseQueryParams } = require("../utils/parseQueryParams");

exports.getCheckups = async (query) => {
  const { filters, sorts } = parseQueryParams(query);
  return await Checkup.find(filters).sort(sorts).populate("patientId");
};

exports.getCheckup = async (checkupId) => {
  return await Checkup.findById(checkupId).populate("patientId");
};

exports.createCheckup = async (checkupData) => {
  return await Checkup.create(checkupData);
};

exports.updateCheckup = async (checkupId, checkupData) => {
  return await Checkup.findByIdAndUpdate(checkupId, checkupData, { new: true });
};

exports.deleteCheckup = async (checkupId) => {
  return await Checkup.findByIdAndDelete(checkupId);
};

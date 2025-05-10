const Patient = require("../models/Patient");
const Treating = require("../models/Treating");
const { parseQueryParams } = require("../utils/parseQueryParams");
exports.getPatients = async (query) => {
  const { filters, sorts } = parseQueryParams(query);
  return await Patient.find(filters).sort(sorts).populate("userId");
};
exports.getDoctorPatients = async (docId) => {
  // const { filters, sorts } = parseQueryParams(query);
  // const treatingsCount = await Treating.countDocuments({ doctorId: docId });
  // console.log(treatingsCount);

  let treatings = await Treating.find({ doctorId: docId }).populate({
    path: "patientId",
    populate: { path: "userId" },
  });
  // .sort(sorts);
  console.log(treatings);

  const patients = treatings.map((t) => t.patientId);
  return patients;
};
exports.getPatient = async (userId) => {
  return await Patient.findOne({ userId: userId });
};

exports.createPatient = async (patientData) => {
  return await Patient.create(patientData);
};

exports.updatePatient = async (userId, patientData) => {
  return await Patient.findOneAndUpdate({ userId: userId }, patientData, {
    new: true,
  });
};

exports.deletePatient = async (userId) => {
  return await Patient.findOneAndDelete({ userId: userId });
};

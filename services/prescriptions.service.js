const Prescription = require("../models/Prescription");
const Treating = require("../models/Treating");
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
    { new: true, runValidators: true }
  );
};

exports.deletePrescription = async (prescriptionId) => {
  return await Prescription.findByIdAndDelete(prescriptionId);
};

exports.getPatientPrescriptions = async (patientId) => {
  return await Prescription.find({ patientId });
};

exports.getDoctorPrescriptions = async (doctorId) => {
  return await Prescription.find({ 
    $or: [{ doctorId }, { createdBy: doctorId }]
  });
};

exports.getAllPrescriptions = async () => {
  return await Prescription.find();
};

exports.getPatientTreatingDoctors = async (doctorId) => {
  return await Treating.find({ doctorId, isActive: true });
};

exports.checkDoctorTreatsPatient = async (doctorId, patientId) => {
  return await Treating.findOne({
    doctorId,
    patientId,
    isActive: true
  });
};

exports.getPrescriptionCreatedTime = async (prescription) => {
  const createdAt = new Date(prescription.createdAt);
  const currentDate = new Date();
  const timeDifference = currentDate - createdAt;
  const hoursDifference = timeDifference / (1000 * 60 * 60);
  return hoursDifference;
};

exports.getPrescriptionsForPatientsOfDoctor = async (doctorId) => {
  const treatings = await Treating.find({ doctorId, isActive: true });
  
  const patientPrescriptionsPromises = treatings.map(treating => 
    Prescription.find({ patientId: treating.patientId })
  );
  const patientPrescriptionsArrays = await Promise.all(patientPrescriptionsPromises);
  
  return patientPrescriptionsArrays.flat();
};

exports.getAllDoctorPrescriptions = async (doctorId, userId) => {
  const patientPrescriptions = await this.getPrescriptionsForPatientsOfDoctor(doctorId);
  const doctorPrescriptions = await Prescription.find({ 
    $or: [{ doctorId }, { createdBy: userId }]
  });
  const prescriptionMap = new Map();
  
  [...patientPrescriptions, ...doctorPrescriptions].forEach(prescription => {
    prescriptionMap.set(prescription._id.toString(), prescription);
  });
  
  return Array.from(prescriptionMap.values());
};
const Patient = require('../models/Patient');
const {parasQueryParams} = require('../utils/parasQueryParams');
exports.getPatients = async (query) => {
    const {filters, sorts} = parasQueryParams(query);
    return await Patient.find(filters).sort(sorts).populate("userId");
}
exports.getPatient = async (userId) => {
    return await Patient.findOne({userId: userId});
}

exports.createPatient = async (patientData) => {
    return await Patient.create(patientData);
}

exports.updatePatient = async (userId, patientData) => {
    return await Patient.findOneAndUpdate({userId: userId}, patientData, {new: true});
}

exports.deletePatient = async (userId) => {
    return await Patient.findOneAndDelete({userId: userId});
}
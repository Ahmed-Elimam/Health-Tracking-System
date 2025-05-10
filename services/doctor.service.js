const Doctor = require('../models/Doctor');
const {parasQueryParams} = require('../utils/queryParser');

exports.getDoctors = async (query) => {
    const {filters, sorts} = parasQueryParams(query);
    return await Doctor.find(filters).sort(sorts).populate("userId");
}

exports.getDoctor = async(doctorId) => {
    return await Doctor.findById(doctorId).populate("userId");
}

exports.createDoctor = async(doctorData) => {
    return await Doctor.create(doctorData);
}

exports.updateDoctor = async(doctorId, doctorData) => {
    return await Doctor.findByIdAndUpdate(doctorId, doctorData, {new: true});
}

exports.deleteDoctor = async(doctorId) => {
    return await Doctor.findByIdAndDelete(doctorId);
}

const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const Treating = require('../models/Treating');
const {parasQueryParams} = require('../utils/queryParser');

const doctorResource_Patient = (doctor) => {
    return {Specialization: doctor.specialization,clinicAddress: doctor.clinicAddress, bio: doctor.bio, experience: doctor.experience,
        user:{firstName: doctor.userId.firstName, lastName: doctor.userId.lastName, email: doctor.userId.email, phone: doctor.userId.phone,profileImage: doctor.userId.profileImage} 
    };
}

exports.getDoctors_Admin = async (query) => {
    const {filters, sorts} = parasQueryParams(query);
    return await Doctor.find(filters).sort(sorts).populate("userId");
}
exports.getDoctors_Patient = async (query,user) => {
    const {filters, sorts} = parasQueryParams(query);
    const patient = await Patient.findOne({userId: user.id});
    const treatings = await Treating.find({patientId: patient._id},...filters).sort(sorts).populate("doctorId");
    const oldDoctors = [];
    const currentDoctors = [];
    for (let i = 0; i < treatings.length; i++) {
        if(treatings[i].isActive == false) oldDoctors.push(doctorResource_Patient(treatings[i].doctorId));
        else currentDoctors.push(doctorResource_Patient(treatings[i].doctorId));
    }
    return {oldDoctors, currentDoctors};
}
exports.getDoctor_Admin = async(doctorId) => {
    return await Doctor.findById(doctorId).populate("userId");
}
exports.getDoctor_Doctor = async(doctorId,userId) => {
    const doctor = await Doctor.findById(doctorId).populate("userId");
    if(doctor.userId._id == userId) return doctor;
    else throw new Error("You are not allowed to access this doctor");
}
exports.getDoctor_Patient = async(doctorId,userId) => {
    const patient = await Patient.findOne({userId: userId});
    const treating = await Treating.findOne({patientId: patient._id, doctorId: doctorId}).populate("doctorId");
    return doctorResource_Patient(treating.doctorId);
}

exports.createDoctor = async (doctorData) => {
  return await Doctor.create(doctorData);
};

exports.updateDoctor_Admin = async (doctorId, doctorData) => {
  return await Doctor.findByIdAndUpdate(doctorId, doctorData, { new: true });
};
exports.updateDoctor_Doctor = async (doctorId, doctorData, userId) => {
    const doctor = await Doctor.findById(doctorId).populate("userId");
    if(doctor.userId._id == userId) return await Doctor.findByIdAndUpdate(doctorId, doctorData, { new: true });
    else throw new Error("You are not allowed to access this doctor");
};

exports.deleteDoctor = async (doctorId) => {
  return await Doctor.findByIdAndDelete(doctorId);
};

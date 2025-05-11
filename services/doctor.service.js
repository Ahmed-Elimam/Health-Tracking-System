const Doctor = require('../models/Doctor');
const Specialization = require('../models/Specialization');
const {parasQueryParams} = require('../utils/queryParser');

const doctorResource_Patient = (doctor) => {
    return {Specialization: doctor.specialization,clinicAddress: doctor.clinicAddress, bio: doctor.bio, experience: doctor.experience,
        user:{firstName: doctor.userId.firstName, lastName: doctor.userId.lastName, email: doctor.userId.email, phone: doctor.userId.phone,profileImage: doctor.userId.profileImage} 
    };
}
exports.getDoctors = async (query, user) => {
    const {filters, sorts} = parasQueryParams(query);
    if(user.role == "admin" || user.role == "super-admin") return await Doctor.find(filters).sort(sorts).populate("userId");
    else if(user.role == "patient") {
        const treatings = await Treating.find({patientId: user._id}).populate("doctorId");
        const oldDoctors = [];
        const currentDoctors = [];
        for (let i = 0; i < treatings.length; i++) {
            if(treatings[i].isActive == false) oldDoctors.push(doctorResource_Patient(treatings[i].doctorId));
            else currentDoctors.push(doctorResource_Patient(treatings[i].doctorId));
        }
        return {oldDoctors, currentDoctors};
    };
}

exports.getDoctor = async(doctorId,user) => {
    if(user.role == "admin" || user.role == "super-admin") return await Doctor.findById(doctorId).populate("userId");
    else if(user.role == "doctor" && user._id == doctorId) return await Doctor.findById(doctorId).populate("userId");
    else if(user.role == "patient") {
        const doctor = await Doctor.findById(doctorId).populate("userId");
        return doctorResource_Patient(doctor);
    }
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

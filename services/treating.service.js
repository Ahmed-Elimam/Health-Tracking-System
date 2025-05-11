const Patient = require("../models/Patient");
const Treating = require("../models/Treating");
const Doctor = require("../models/Doctor");
const {parasQueryParams} = require('../utils/queryParser');

exports.getTreatings_Admin = async (query) => {
    const {filters, sorts} = parasQueryParams(query);
    return await Treating.find(filters).sort(sorts);
}
exports.getTreatings_Doctor = async (query, user) => {
    const {filters, sorts} = parasQueryParams(query);
    const doctor = await Doctor.findById(user.id);
    const treatings = await Treating.find({doctorId: doctor._id,...filters}).sort(sorts).exec();
    const oldTreatings = [];
    const currentTreatings = [];
    for (let i = 0; i < treatings.length; i++) {
        if(treatings[i].isActive == false) oldTreatings.push(treatings[i]);
        else currentTreatings.push(treatings[i]);
    }
    return {oldTreatings, currentTreatings};
}
exports.getTreatings_Patient = async (query, user) => {
    const {filters, sorts} = parasQueryParams(query);
    const patient = await Patient.findById(user.id);
    const treatings = await Treating.find({patientId: patient._id,...filters}).sort(sorts).exec();
    const oldTreatings = [];
    const currentTreatings = [];
    for (let i = 0; i < treatings.length; i++) {
        if(treatings[i].isActive == false) oldTreatings.push(treatings[i]);
        else currentTreatings.push(treatings[i]);
    }
    return {oldTreatings, currentTreatings};
}

exports.getTreating_Admin = async (id) => {
    return await Treating.findById(id).populate("patientId").populate("doctorId").exec();
}
exports.getTreating_Doctor = async (id, user) => {
    const doctor = await Doctor.findById(user.id);
    const treating = await Treating.findById(id).exec();
    if(treating.doctorId == doctor._id) return treating;
    return treating;
}
exports.getTreating_Patient = async (id, user) => {
    const patient = await Patient.findById(user.id);
    const treating = await Treating.findById(id).exec();
    if(treating.patientId == patient._id) return treating;
    return treating;
}

exports.createTreating_Admin = async (TreatingData) => {
    return await Treating.create(TreatingData);
}
exports.createTreating_Doctor = async (TreatingData, user) => {
    const doctor = await Doctor.findById(user.id);
    TreatingData.doctorId = doctor._id;
    return await Treating.create(TreatingData);
}
exports.createTreating_Patient = async (TreatingData, user) => {
    const patient = await Patient.findById(user.id);
    TreatingData.patientId = patient._id;
    return await Treating.create(TreatingData);
}
exports.updateTreating_Admin = async (id, TreatingData) => {
    return await Treating.findByIdAndUpdate(id, TreatingData, { new: true }).exec();
}
exports.updateTreating_Doctor = async (id, TreatingData, user) => {
    const doctor = await Doctor.findById(user.id);
    const treating = await Treating.findById(id).exec();
    if(treating.doctorId == doctor._id) return await Treating.findByIdAndUpdate(id, TreatingData, { new: true }).exec();
    else throw new Error("You are not allowed to access this treating");
}
exports.updateTreating_Patient = async (id, TreatingData, user) => {
    const patient = await Patient.findById(user.id);
    const treating = await Treating.findById(id).exec();
    if(treating.patientId == patient._id) return await Treating.findByIdAndUpdate(id, TreatingData, { new: true }).exec();
    else throw new Error("You are not allowed to access this treating");
}

exports.deleteTreating = async (id, user) => {
    if (user.role == "admin" || user.role == "super-admin")
        return await Treating.findByIdAndDelete(id).exec();
}
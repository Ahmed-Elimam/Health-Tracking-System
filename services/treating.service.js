const Patient = require("../models/Patient");
const Treating = require("../models/Treating");
const AppError = require("../utils/AppError");
const {parasQueryParams} = require('../utils/queryParser');

exports.getTreatings = async (query, user) => {
    const {filters, sorts} = parasQueryParams(query);
    if(user.role == "admin" || user.role == "super-admin")
        return await Treating.find(filters).sort(sorts);
    else if(user.role == "patient") {
        const treatings = await Treating.find({patientId: user._id,...filters}).sort(sorts).exec();
        const oldTreatings = [];
        const currentTreatings = [];
        for (let i = 0; i < treatings.length; i++) {
            if(treatings[i].isActive == false) oldTreatings.push(treatingResource_Patient(treatings[i]));
            else currentTreatings.push(treatingResource_Patient(treatings[i]));
        }
        return {oldTreatings, currentTreatings};
    }
    else if (user.role == "doctor") {
        const treatings = await Treating.find({doctorId: user._id,...filters}).sort(sorts).exec();
        const oldTreatings = [];
        const currentTreatings = [];
        for (let i = 0; i < treatings.length; i++) {
            if(treatings[i].isActive == false) oldTreatings.push(treatingResource_Doctor(treatings[i]));
            else currentTreatings.push(treatingResource_Doctor(treatings[i]));
        }
        return {oldTreatings, currentTreatings};
    }
    return await Treating.find(filters).sort(sorts);
}

exports.getTreating = async (id, user) => {
    if (user.role == "admin" || user.role == "super-admin")
        return await Treating.findById(id).populate("patientId").populate("doctorId").exec();
    else if(user.role == "patient") {
        const patient = await Patient.findById(user._id).exec();
        const treating = await Treating.findById(id).exec();
        if(treating.patientId == patient._id) return treatingResource_Patient(treating);
        else throw new Error("You are not allowed to access this treating");
    }
    else if(user.role == "doctor") {
        const doctor = await Doctor.findById(user._id).exec();
        const treating = await Treating.findById(id).exec();
        if(treating.doctorId == doctor._id) return treatingResource_Doctor(treating);
        return treatingResource_Doctor(treating);
    }
    return await Treating.findById(id).populate("patientId").populate("doctorId").exec();
}

exports.createTreating = async (TreatingData,user)=>{
    if(user.role == "admin" || user.role == 'super-admin') return await Treating.create(TreatingData);
    else if(user.role == "patient"){
        const patient = Patient.find({userId: user._id}).exec();
        if(patient._id == TreatingData.patientId) return await Treating.create(TreatingData);
        else  throw new AppError("You are not allowed to access this treating");
    }
    else if(user.role == "doctor"){
        const doctor = Doctor.find({userId: user._id}).exec();
        if(doctor._id == TreatingData.doctorId) return await Treating.create(TreatingData);
        else throw new AppError("You are not allowed to access this treating");
    }
}

exports.updateTreating = async (id, TreatingData, user) => {
    if (user.role == "admin" || user.role == "super-admin")
        return await Treating.findByIdAndUpdate(id, TreatingData, { new: true }).exec();
    else if(user.role == "patient") {
        const patient = await Patient.findById(user._id).exec();
        const treating = await Treating.findById(id).exec();
        if(treating.patientId == patient._id) return await Treating.findByIdAndUpdate(id, TreatingData, { new: true }).exec();
        else throw new Error("You are not allowed to access this treating");
    }
    else if(user.role == "doctor") {
        const doctor = await Doctor.findById(user._id).exec();
        const treating = await Treating.findById(id).exec();
        if(treating.doctorId == doctor._id) return await Treating.findByIdAndUpdate(id, TreatingData, { new: true }).exec();
        else throw new Error("You are not allowed to access this treating");
    }
}

exports.deleteTreating = async (id, user) => {
    if (user.role == "admin" || user.role == "super-admin")
        return await Treating.findByIdAndDelete(id).exec();
}
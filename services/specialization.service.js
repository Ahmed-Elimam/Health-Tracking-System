const Specialization = require("../models/Specialization");

exports.createSpecialization = async (specializationData) => {
    const specialization = await Specialization.create(specializationData);
    return specialization;
};

exports.getSpecializations = async () => {
    const specializations = await Specialization.find({}).lean();
    return specializations;
};

exports.getSpecialization = async (id) => {
    const specialization = await Specialization.findById(id).lean();
    return specialization;
};

exports.updateSpecialization = async (id, specializationData) => {
    const specialization = await Specialization.findByIdAndUpdate(id, specializationData, { new: true });
    return specialization;
};

exports.deleteSpecialization = async (id) => {
    const specialization = await Specialization.findByIdAndDelete(id);
    return specialization;
};
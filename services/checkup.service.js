const Checkup = require("../models/Checkup");
const { parasQueryParams } = require("../utils/parasQueryParams");

exports.getCheckups = async (query) => {
    const { filters, sorts } = parasQueryParams(query);
    return await Checkup.find(filters).sort(sorts).populate("patientId");
}

exports.getCheckup = async (checkupId) => {
    return await Checkup.findById(checkupId).populate("patientId");
};

exports.createCheckup = async (checkupData) => {
    return await Checkup.create(checkupData);
}

exports.updateCheckup = async (checkupId, checkupData) => {
    return await Checkup.findByIdAndUpdate(checkupId, checkupData, {new: true});
}

exports.deleteCheckup = async (checkupId) => {
    return await Checkup.findByIdAndDelete(checkupId);
}


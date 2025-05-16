const SpecializationService = require('../services/specialization.service.js');

exports.getSpecializations = async (req, res) => {
    const specializations = await SpecializationService.getSpecializations();
    res.send(specializations);
};

exports.getSpecialization = async (req, res) => {
    const specialization = await SpecializationService.getSpecialization(
        req.params.id
    );
    res.send(specialization);
};
// need to add specialization from docs and make it pending till admin approval
exports.createSpecialization = async (req, res) => {
    const specialization = await SpecializationService.createSpecialization(
        req.body
    );
    res.send(specialization);
};

exports.updateSpecialization = async (req, res) => {
    const specialization = await SpecializationService.updateSpecialization(
        req.params.id,
        req.body
    );
    res.send(specialization);
};

exports.deleteSpecialization = async (req, res) => {
    const specialization = await SpecializationService.deleteSpecialization(
        req.params.id
    );
    res.send(specialization);
};

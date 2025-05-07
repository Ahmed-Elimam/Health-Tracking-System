
const CheckupService = require('../services/checkup.service.js');
const AppError = require('../utils/AppError');
exports.getCheckups = async (req, res, next) =>{
    try {
        const checkups = await CheckupService.getCheckups(req.query);
        res.status(200).json(checkups);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
}
exports.getCheckup = async (req, res, next) =>{
    try {
        const checkup = await CheckupService.getCheckup(req.params.id);
        res.status(200).json(checkup);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
}
exports.updateCheckup = async (req, res, next) =>{
    try {
        const checkup = await CheckupService.updateCheckup(req.params.id, req.body);
        res.status(200).json(checkup);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
}
exports.deleteCheckup = async (req, res, next) =>{
    try {
        const checkup = await CheckupService.deleteCheckup(req.params.id);
        res.status(200).json(checkup);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
}
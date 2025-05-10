const adminService = require('../services/admin.service.js');
const AppError = require('../utils/AppError.js');

exports.createAdmin = async (req, res) => {
    try {
        const admin = await adminService.createAdmin(req.body);
        res.status(201).json({ message: "new admin created", data: admin });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
}

exports.getAdmins = async (req, res) => {
    try {
        const admins = await adminService.getAdmins(req.query);
        res.status(200).json(admins);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
}

exports.getAdmin = async (req, res) => {
    try {
        const admin = await adminService.getAdmin(req.params.id);
        res.status(200).json(admin);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
}

exports.updateAdmin = async (req, res) => {
    try {
        const admin = await adminService.updateAdmin(req.params.id, req.body);
        res.status(200).json({ message: "admin data updated successfully", data: admin });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
}

exports.deleteAdmin = async (req, res) => {
    try {
        const admin = await adminService.deleteAdmin(req.params.id);
        res.status(200).json("admin deleted successfully", admin);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
}
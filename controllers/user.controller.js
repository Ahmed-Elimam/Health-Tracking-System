const userService = require('../services/user.service.js');
const AppError = require('../utils/AppError');

exports.createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
}

exports.getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers(req.query);
        res.status(200).json(users);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await userService.getUser(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.status(200).json(user);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(new AppError(error.message, 500));
    }
}
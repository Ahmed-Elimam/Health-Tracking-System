const ThreadService = require('../services/thread.service');
const AppError = require('../utils/AppError');

exports.createThread = async (req, res, next) => {
    try {
        const thread = await ThreadService.createThread(req.body);
        res.status(201).json( thread );
    } catch (error) {
        next(new AppError(error.message, 400));
    }
};

exports.getThreads = async (req, res, next) => {
    try {
        const threads = await ThreadService.getThreads();
        res.status(200).json( threads );
    } catch (error) {
        next(new AppError(error.message, 400));
    }
};

exports.getThread = async (req, res, next) => {
    try {
        const thread = await ThreadService.getThread(req.params.id);
        res.status(200).json( thread );
    } catch (error) {
        next(new AppError(error.message, 400));
    }
};

exports.updateThread = async (req, res, next) => {
    try {
        const thread = await ThreadService.updateThread(
            req.params.id,
            req.body
        );
        res.status(200).json( thread );
    } catch (error) {
        next(new AppError(error.message, 400));
    }
};

exports.deleteThread = async (req, res, next) => {
    try {
        const thread = await ThreadService.deleteThread(req.params.id);
        res.status(200).json( thread );
    } catch (error) {
        next(new AppError(error.message, 400));
    }
};

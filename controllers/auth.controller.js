const authService = require('../services/auth.service');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const crypto = require('crypto');
const catchAsync = require('../utils/catchAsync');

const register = async (req, res, next) => {
    try {
        const newUser = await authService.registerUser(req.body, req.file);
        res.status(201).json({
            message: 'User created successfully',
            user: newUser,
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { token, fullUserData, refreshToken } = await authService.userLogin(req.body);
        await User.updateOne({ _id: fullUserData._id }, { $set: { refreshToken ,token} });
        res.status(200).json({ token, refreshToken, user: fullUserData });
    } catch (error) {
        next(error);
    }
};

const verify = async (req, res, next) => {
    const { token } = req.query;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
        mailVerificationToken: hashedToken,
        mailVerificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
        next(new AppError('Token is invalid or has expired', 400));
    }

    user.emailVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.send('Email verified successfully!');
};
const refresh = catchAsync(async (req, res, next) => {
    const { accessToken:token, refreshToken } = await authService.refresh(req.body.refreshToken);
    res.status(200).json({ token,refreshToken });
});
module.exports = {
    register,
    login,
    verify,
    refresh,
};

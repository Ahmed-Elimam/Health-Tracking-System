const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const User = require('../models/User');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Specialization = require('../models/Specialization');
const { sendVerificationEmail } = require('./mailing.service');

exports.registerUser = async (userData, file) => {
    const {
        firstName,
        lastName,
        email,
        password,
        nationalId,
        phone,
        specializationName,
        certificates,
        bio,
        experience,
        plan,
        address,
    } = userData;

    if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !nationalId ||
        !phone
    ) {
        throw new AppError('All fields are required', 400);
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new AppError('Email already in use', 400);
    }

    const nationalIdExists = await User.findOne({ nationalId });
    if (nationalIdExists) {
        throw new AppError('National ID already in use', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let profileImage = null;
    if (file) {
        profileImage = file.path;
    }
    const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        nationalId,
        phone,
        address,
        profileImage,
    });

    if (specializationName) {
        const specialization = await Specialization.findOne({
            name: specializationName,
        });
        if (!specialization) {
            throw new AppError('Specialization not found', 400);
        }

        await Doctor.create({
            userId: newUser._id,
            specialization: specialization._id,
            certificates,
            bio,
            experience,
        });
    }

    if (plan) {
        await Patient.create({
            userId: newUser._id,
            plan,
        });
    }
    await sendVerificationEmail(newUser);
    return newUser;
};

exports.userLogin = async userLoginData => {
    const { login, password } = userLoginData;
    const user = await User.findOne({ email: login }).select('+password');

    if (!user) {
        throw new AppError('Invalid Credentials', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new AppError('Invalid Credentials', 401);
    }

    if (user.emailVerified === false) {
        throw new AppError('Your email is not verified. Please verify your email', 401);
    }

    let fullUserData = user.toObject();
    delete fullUserData.password;

    const tokenPayload = {
        userId: user._id,
        role: user.role,
    };

    if (user.role === 'patient') {
        const patientData = await Patient.findOne({ userId: user._id });
        if (patientData) {
            fullUserData.patient = patientData;
            tokenPayload.patientId = patientData._id;
        }
    }

    if (user.role === 'doctor') {
        const doctorData = await Doctor.findOne({ userId: user._id });
        const patientData = await Patient.findOne({ userId: user._id });

        if (doctorData) {
            fullUserData.doctor = doctorData;
            tokenPayload.doctorId = doctorData._id;
        }

        if (patientData) {
            fullUserData.patient = patientData;
            tokenPayload.patientId = patientData._id;
        }
    }

    const {  accessToken: token, refreshToken } = generateTokens(tokenPayload);

    return { token, fullUserData, refreshToken };
};
exports.refresh = async (refreshToken) => {
    if (!refreshToken) {
        return next(new AppError('Refresh token is required', 400));
    }

    try {

        const user = await User.findOne({refreshToken});
        if (!user) {
            return next(new AppError('User not found', 401));
        }

        const payload = {
            userId: user._id,
            role: user.role,
        };

        if (user.role === 'patient') {
            const patient = await Patient.findOne({ userId: user._id });
            if (patient) payload.patientId = patient._id;
        }

        if (user.role === 'doctor') {
            const doctor = await Doctor.findOne({ userId: user._id });
            if (doctor) payload.doctorId = doctor._id;

            // In case the doctor is also a patient:
            const patient = await Patient.findOne({ userId: user._id });
            if (patient) payload.patientId = patient._id;
        }

        const result = generateTokens(payload);
        user.token = result.accessToken;
        user.refreshToken = result.refreshToken;
        await user.save();
        return result;

    } catch (error) {
        throw new AppError('Invalid or expired refresh token', 401);
    }
};

const generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d', // or shorter for better security
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    return { accessToken, refreshToken };
};
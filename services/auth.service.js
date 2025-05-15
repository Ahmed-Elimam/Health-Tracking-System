const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const User = require('../models/User');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Specialization = require('../models/Specialization');
const {sendVerificationEmail} = require('./mailing.service');

exports.registerUser = async(userData,file) => {
    const {
        firstName, lastName, email, password,
        nationalId, phone, specializationName, certificates, bio, experience, plan, address
    } = userData;

    if (!firstName || !lastName || !email || !password || !nationalId || !phone) {
        throw new AppError("All fields are required", 400);
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new AppError("Email already in use", 400);
    }

    const nationalIdExists = await User.findOne({ nationalId });
    if (nationalIdExists) {
        throw new AppError("National ID already in use", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let profileImage = null;
    if (file){
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
        profileImage
    });

    if (specializationName) {
        const specialization = await Specialization.findOne({ name: specializationName });
        if (!specialization) {
            throw new AppError("Specialization not found", 400);
        }

    await Doctor.create({
        userId: newUser._id,
        specialization: specialization._id,
        certificates,
        bio,
        experience});
    }

    if (plan) {
        await Patient.create({
            userId: newUser._id,
            plan});
    }
    await sendVerificationEmail(newUser);
    return newUser;
}

exports.userLogin = async (userLoginData) =>{
    const { login, password } = userLoginData;
    const user = await User.findOne({ email:login }).select('+password');
    console.log(user, userLoginData);
    if (!user) {
    throw new AppError("Invalid Credentials", 401);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
    throw new AppError("Invalid Credentials", 401);
    }
    let fullUserData = user.toObject();
    delete fullUserData.password;

    if(fullUserData.emailVerified === false){
        throw new AppError("Your email is not verified. Please verify your email", 401);
    }

    let tokenPayload = {
        id: user._id,
        role: user.role
    }

    if (user.role === 'patient') {
        const patientData = await Patient.findOne({ userId: user._id }).populate('userId');
        if (patientData){
            fullUserData = patientData;
            tokenPayload.patientId = patientData._id;
        }
    }

    if (user.role === 'doctor') {
    const doctorData = await Doctor.findOne({ userId: user._id }).populate('userId specialization');
    if (doctorData){
        fullUserData = doctorData;
        tokenPayload.doctorId = doctorData._id;
    }
    }
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return {token, fullUserData}
}

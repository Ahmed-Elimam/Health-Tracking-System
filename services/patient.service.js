const Patient = require('../models/Patient');
const User = require('../models/User');
const Treating = require('../models/Treating');
const { parseQueryParams } = require('../utils/parseQueryParams');
const AppError = require('../utils/AppError');
const Doctor = require('../models/Doctor');
const mongoose = require('mongoose');

exports.getPatients = async query => {
    const { filters, sorts } = parseQueryParams(query);
    return await Patient.find(filters).sort(sorts).populate('userId');
};
exports.getDoctorPatients = async (docId) => {
  const treatings = await Treating.find({ doctorId: docId }).populate({
    path: "patientId",
    populate: { path: "userId" },
  });

  const uniquePatients = new Map();

  treatings.forEach(t => {
    const patient = t.patientId;
    uniquePatients.set(patient._id.toString(), patient);
  });

  return Array.from(uniquePatients.values());
};
exports.getPatient = async patientId => {
    return await Patient.findOne({ _id: patientId }).populate('userId');
};

exports.createPatient = async patientData => {
    return await Patient.create(patientData);
};

exports.updatePatient = async (patientId, data) => {
    const { userId: userData, ...patientData } = data;
    const patient = await Patient.findOne({ _id: patientId });
    const updatedPatient = await Patient.findOneAndUpdate(
        { _id: patientId },
        patientData,
        {
            new: true,
        }
    );
    await User.findOneAndUpdate(patient.userId, userData, {
        new: true,
    });
    return updatedPatient;
};

exports.deletePatient = async patientId => {
    const patient = await Patient.findOne({ _id: patientId });
    const userId = patient.userId;
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const deletedPatient = await Patient.findOneAndDelete(
            { _id: patientId },
            { session }
        );

        await User.findOneAndDelete({ _id: userId }, { session });

        await session.commitTransaction();
        session.endSession();

        return deletedPatient;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};
exports.requestAccess = async (userId, patientId) => {
    try {
        const [patient, doctor] = await Promise.all([
            Patient.findById(patientId),
            Doctor.findOne({ userId }),        ]);

        if (!patient) {
            throw new AppError("Patient not found", 404);
        }

        if (!doctor) {
            throw new AppError("Doctor not found", 404);
        }

        const treating = await Treating.findOne({
            patientId: patient._id,
            doctorId: doctor._id,
            treatmentEndDate: { $gt: new Date() },
        });
        if (treating) {
            throw new AppError("Access already granted", 400);
        }
        const doctorIdStr = doctor._id.toString();
        const requests = patient.accessRequests || [];

        const alreadyRequested = requests.some(id => id.toString() === doctorIdStr);
        if (alreadyRequested) {
            throw new AppError("Access request already sent", 400);
        }

        requests.push(doctor._id);
        patient.accessRequests = requests;

        await patient.save();
        return patient;

    } catch (error) {
        if (error instanceof AppError) throw error;
        throw new AppError("An unexpected error occurred", 500, [error]);
    }
};
exports.acceptRequestAccess = async (userId, doctorId) => {
    const patient = await Patient.findOne({ userId });

    if (!patient) {
        throw new AppError("Patient not found", 404);
    }

    // Check if the doctorId exists in accessRequests
    const hasRequest = patient.accessRequests.some(id => id.equals(doctorId));
    if (!hasRequest) {
        throw new AppError("Access request not found", 404);
    }

    // Remove the doctorId from accessRequests
    patient.accessRequests = patient.accessRequests.filter(
        id => !id.equals(doctorId)
    );
    const updatedPatient = await patient.save();

    // Create Treating record
    await Treating.create({
        patientId: patient._id,
        doctorId,
        treatmentStartDate: new Date(),
        treatmentEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        isActive: true
    });

    return updatedPatient;
};

exports.searchPatientsToRequestAccess = async (query) => {
    const { filters, sorts } = parseQueryParams(query);
    
    if(Object.keys(filters).length === 0 || !filters){
        throw new AppError("Filters not found", 404);
    }

    const patients = await User.find({...filters,role:"patient"},{firstName:1,lastName:1}).sort(sorts);
    const results = patients.map(patient => {
        return {
            id: patient._id,
            firstName: patient.firstName,
            lastName: patient.lastName[0]+'*********',
        };
    })
    return results;
}
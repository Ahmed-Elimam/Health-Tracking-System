const Checkup = require('../models/Checkup');
const Treating = require('../models/Treating');
const AppError = require('../utils/AppError');
const { parseQueryParams } = require('../utils/parseQueryParams');

exports.getCheckups = async query => {
    const { filters, sorts } = parseQueryParams(query);
    return await Checkup.find(filters).sort(sorts).populate('patientId');
};
exports.getDoctorCheckups = async doctorId => {
    // const { filters, sorts } = parseQueryParams(query);

    const myOwnCheckups = await Checkup.find({ createdBy: doctorId }).populate({
        path: 'patientId',populate:{path: 'userId', select: 'firstName lastName'} //to get patients name with the respons 
    });

    const validTreatings = await Treating.find(
        {
            doctorId,
            treatmentEndDate: { $gt: new Date() },
        },
        { patientId: 1 }
    );
    if (!validTreatings) {
        return next(
            new AppError('You are not authorized to view these checkups', 403)
        );
    }
    const acceptedPatientIds = validTreatings.map(t => t.patientId);

    const acceptedPatientCheckups = await Checkup.find({
        doctorId,
        patientId: { $in: acceptedPatientIds },
    }).populate('patientId');

    if (!acceptedPatientCheckups) {
        next(new AppError('there is no checkups for this doctor', 404));
    }

    return { myOwnCheckups, acceptedPatientCheckups };
};
exports.getPatientCheckups = async patientId => {
    // const { filters, sorts } = parseQueryParams(query);
    const myOwnCheckups = await Checkup.find({ createdBy: patientId }).populate(
        'patientId'
    );

    const validTreatings = await Treating.find(
        {
            patientId,
            treatmentEndDate: { $gt: new Date() },
        },
        { doctorId: 1 }
    );
    if (!validTreatings) {
        return next(
            new AppError('You are not authorized to view these checkups', 403)
        );
    }
    const acceptedDoctorIds = validTreatings.map(t => t.doctorId);

    const acceptedDoctorCheckups = await Checkup.find({
        patientId,
        doctorId: { $in: acceptedDoctorIds },
    }).populate('patientId');

    if (!acceptedDoctorCheckups) {
        next(new AppError('there is no checkups for this doctor', 404));
    }
    return { myOwnCheckups, acceptedDoctorCheckups };
};

exports.getCheckup = async checkupId => {
    return await Checkup.findById({ _id: checkupId }).populate('patientId');
};
exports.getDoctorCheckup = async (doctorId, checkupId) => {
    let myCheckup = await Checkup.findOne({
        _id: checkupId,
    }).populate('doctorId');
    if (!(doctorId === myCheckup.doctorId._id)) {
        next(new AppError('there is no checkups for this doctor', 404));
    }
    const patientId = myCheckup.patientId._id;
    const patientCheckup = await Treating.findOne({
        doctorId,
        patientId,
        treatmentEndDate: { $gt: new Date() },
    }).populate('patientId');
    if (!patientCheckup) {
        new AppError('You are not authorized to view this checkups', 403);
    }
    return myCheckup;
};

exports.getPatientCheckup = async (patientId, checkupId) => {
    let checkup = await Checkup.findOne({
        _id: checkupId,
    }).populate('patientId');
    if (!(patientId === checkup.patientId._id)) {
        next(new AppError('there is no checkups for this patient', 404));
    }
    const doctorId = checkup.doctorId._id;
    const treating = await Treating.findOne({
        doctorId,
        patientId,
        treatmentEndDate: { $gt: new Date() },
    }).populate('patientId');
    if (!treating) {
        new AppError('You are not authorized to view this checkups', 403);
    }
    return checkup;
};

exports.createCheckup = async checkupData => {
    return await Checkup.create(checkupData);
};

exports.updateCheckup = async (checkupId, checkupData) => {
    return await Checkup.findByIdAndUpdate(checkupId, checkupData, {
        new: true,
    });
};

exports.deleteCheckup = async checkupId => {
    return await Checkup.findByIdAndDelete(checkupId);
};

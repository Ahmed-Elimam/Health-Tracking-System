const { faker } = require('@faker-js/faker');
const Checkup = require('../models/Checkup');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Thread = require('../models/Thread');
const Specialization = require('../models/Specialization');

generateCheckupData = async (
    overrides = {},
    patientCount,
    doctorCount,
    threadCount,
    specializationCount
) => {
    if (!specializationCount)
        specializationCount = await Specialization.countDocuments();
    let patientDoc = overrides.patient;
    if (!patientDoc) {
        const randomPatient = Math.floor(Math.random() * patientCount);
        patientDoc = await Patient.findOne().skip(randomPatient).lean();
    }
    let doctorDoc = overrides.doctor;
    if (!doctorDoc) {
        const randomDoctor = Math.floor(Math.random() * doctorCount);
        doctorDoc = await Doctor.findOne().skip(randomDoctor).lean();
    }
    let threadDoc = overrides.thread;
    if (!threadDoc) {
        const randomThread = Math.floor(Math.random() * threadCount);
        threadDoc = await Thread.findOne().skip(randomThread).lean();
    }
    let specializationDoc = overrides.specialization;
    if (!specializationDoc) {
        const randomSpecialization = Math.floor(
            Math.random() * specializationCount
        );
        specializationDoc = await Specialization.findOne()
            .skip(randomSpecialization)
            .lean();
    }
    return {
        createdBy: faker.helpers.arrayElement([
            patientDoc.userId,
            doctorDoc.userId,
        ]),
        threadId: threadDoc._id,
        doctorId: doctorDoc._id,
        patientId: patientDoc._id,
        type: faker.helpers.arrayElement(['checkup', 'follow-up']),
        specialization: specializationDoc._id,
        checkupDate: faker.date.past(),
        symptoms: [faker.lorem.word()],
        doctorSigns: [faker.lorem.word()],
        diagnosis: faker.lorem.paragraph(),
        doctorRecommendations: faker.lorem.paragraph(),
        followup: {
            needed: faker.datatype.boolean(),
            checkupId: null,
            date: faker.date.future(),
        },
        ...overrides, // allows you to overwrite any field (optional)
    };
};

exports.createCheckup = async (
    overrides = {},
    patientCount,
    doctorCount,
    threadCount,
    userCount,
    specializationCount
) => {
    const data = await generateCheckupData(
        overrides,
        patientCount,
        doctorCount,
        threadCount,
        userCount,
        specializationCount
    );
    return await Checkup.create(data);
};

const {faker} = require("@faker-js/faker");
const Checkup = require("../models/Checkup");

generateCheckupData = async (overrides = {},patientCount,doctorCount,threadCount,userCount,specializationCount) => {
    const randomPatient = Math.floor(Math.random() * patientCount);
    const patientDoc = await Patient.findOne().skip(randomPatient).lean();
    const randomDoctor = Math.floor(Math.random() * doctorCount);
    const doctorDoc = await Doctor.findOne().skip(randomDoctor).lean();
    const randomThread = Math.floor(Math.random() * threadCount);
    const threadDoc = await Thread.findOne().skip(randomThread).lean();
    const randomUser = await User.findOne().skip(randomUser).lean();
    const userDoc = await User.findOne().skip(randomUser).lean();
    const randomSpecialization = Math.floor(Math.random() * specializationCount);
    const specializationDoc = await Specialization.findOne().skip(randomSpecialization).lean();
    return {
        createdBy: userDoc._id,
        threadId: threadDoc._id,
        doctorId: doctorDoc._id,
        patientId: patientDoc._id,
        type:faker.helpers.arrayElement(['checkup', 'follow-up']),
        specialization: specializationDoc._id,
        checkupDate: faker.date.past(),
        symptoms: [faker.lorem.word()],
        doctorSigns: [faker.lorem.word()],
        diagnosis: faker.lorem.paragraph(),
        doctorRecommendations: faker.lorem.paragraph(),
        followup: {
            needed: faker.datatype.boolean(),
            checkupId: faker.datatype.number(),
            date: faker.date.future(),
        },
        ...overrides, // allows you to overwrite any field (optional)
    };
}

exports.createCheckup = async (overrides = {},patientCount,doctorCount,threadCount,userCount,specializationCount) => {
    const data = generateCheckupData(overrides,patientCount,doctorCount,threadCount,userCount,specializationCount);
    return await Checkup.create(data);
}
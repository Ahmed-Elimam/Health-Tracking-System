const { faker } = require('@faker-js/faker');
const Prescription = require('../models/Prescription');
const Checkup = require('../models/Checkup');
const generatePrescriptionData = async (overrides = {}) => {
    let checkupDoc = overrides.checkup;
    if (!checkupDoc) {
        const randomCheckup = Math.floor(
            Math.random() * (await Checkup.countDocuments())
        );
        checkupDoc = await Checkup.findOne().skip(randomCheckup).lean();
    }
    return {
        createdBy: checkupDoc.createdBy,
        doctorId: checkupDoc.doctorId,
        patientId: checkupDoc.patientId,
        checkupId: checkupDoc._id,
        date: faker.date.past(),
        treatments: [
            {
                name: faker.lorem.word(),
                concentration: faker.lorem.word(),
                dose: faker.lorem.word(),
                frequency: faker.lorem.word(),
                duration: faker.lorem.word(),
                notes: faker.lorem.word(),
            },
            {
                name: faker.lorem.word(),
                concentration: faker.lorem.word(),
                dose: faker.lorem.word(),
                frequency: faker.lorem.word(),
                duration: faker.lorem.word(),
                notes: faker.lorem.word(),
            },
            {
                name: faker.lorem.word(),
                concentration: faker.lorem.word(),
                dose: faker.lorem.word(),
                frequency: faker.lorem.word(),
                duration: faker.lorem.word(),
                notes: faker.lorem.word(),
            },
        ],
        ...overrides, // allows you to overwrite any field (optional)
    };
};
exports.createPrescription = async (overrides = {}, checkupCount) => {
    const data = await generatePrescriptionData(overrides, checkupCount);
    return await Prescription.create(data);
};

const {faker} = require("@faker-js/faker");
const Prescription = require("../models/Prescription");

exports.generatePrescriptionData = (overrides = {},checkupCount) => {
    const randomCheckup = Math.floor(Math.random() * checkupCount);
    const checkupDoc = Checkup.findOne().skip(randomCheckup).lean();
    return {
        createdBy: checkupDoc.createdBy,
        doctorId: checkupDoc.doctorId,
        patientId: checkupDoc.patientId,
        checkupId: checkupDoc._id,
        date: faker.date.past(),
        treatments: [{
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
        }],
        ...overrides, // allows you to overwrite any field (optional)
    }
}
exports.createPrescription = async (overrides = {}, checkupCount) => {
    const data = generatePrescriptionData(overrides, checkupCount);
    return await Prescription.create(generatePrescriptionData(data));
}
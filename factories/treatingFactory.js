const { faker } = require("@faker-js/faker");
const Treating = require("../models/Treating");

generateTreatingData = async (overrides = {},patientCount,doctorCount) => {
    const randomPatient = Math.floor(Math.random() * patientCount);
    const patientDoc = await Patient.findOne().skip(randomPatient).lean();
    const randomDoctor = Math.floor(Math.random() * doctorCount);
    const doctorDoc = await Doctor.findOne().skip(randomDoctor).lean();
    return {
        patientId: patientDoc._id,
        doctorId: doctorDoc._id,
        treatmentStartDate: faker.date.past(),
        treatmentEndDate: faker.date.future(),
        isActive: faker.datatype.boolean(),
        ...overrides, // allows you to overwrite any field (optional)
    };
}

exports.createTreating = async (overrides = {},patientCount,doctorCount) => {
    const data = generateTreatingData(overrides,patientCount,doctorCount);
    const treating = new Treating(data);
    return await treating.save();
}
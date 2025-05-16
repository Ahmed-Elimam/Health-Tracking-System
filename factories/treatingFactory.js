const { faker } = require('@faker-js/faker');
const Treating = require('../models/Treating');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const generateTreatingData = async (
    overrides = {},
    patientCount,
    doctorCount
) => {
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
    return {
        patientId: patientDoc._id,
        doctorId: doctorDoc._id,
        treatmentStartDate: faker.date.past(),
        treatmentEndDate: faker.date.future(),
        isActive: faker.datatype.boolean(),
        ...overrides, // allows you to overwrite any field (optional)
    };
};

exports.createTreating = async (overrides = {}, patientCount, doctorCount) => {
    const data = await generateTreatingData(
        overrides,
        patientCount,
        doctorCount
    );
    const treating = new Treating(data);
    return await treating.save();
};

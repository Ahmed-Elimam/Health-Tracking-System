const { createThread } = require('../factories/threadFactory');
const { createCheckup } = require('../factories/checkupFactory');
const { createPrescription } = require('../factories/prescriptionFactory');
const { createTreating } = require('../factories/treatingFactory');
const Patient = require('../models/Patient');
const dbConnect = require('../config/dbConnection'); // Your DB connection logic
const Specialization = require('../models/Specialization');
const Doctor = require('../models/Doctor');
const Thread = require('../models/Thread');

async function seed() {
    await dbConnect();
    const patientCount = await Patient.countDocuments();
    const specializationCount = await Specialization.countDocuments();
    const DoctorCount = await Doctor.countDocuments();
    const threadCount = await Thread.countDocuments();
    // console.log(patientCount, specializationCount, DoctorCount, threadCount);
    for (let i = 0; i < 10; i++) {
        const thread = await createThread();
        const randomInt = Math.floor(Math.random() * 3) + 1;
        const randomPatients = Math.floor(Math.random() * patientCount) + 1;
        const patientDoc = await Patient.findOne().skip(randomPatients).lean();
        const randomSpecialization =
            Math.floor(Math.random() * specializationCount) + 1;
        const specializationDoc = await Specialization.findOne()
            .skip(randomSpecialization)
            .lean();
        for (let j = 0; j < randomInt; j++) {
            const checkup = await createCheckup(
                {
                    threadId: thread._id,
                    patient: patientDoc,
                    specializationId: specializationDoc._id,
                },
                patientCount,
                DoctorCount,
                threadCount,
                specializationCount
            );
            await createTreating(
                {
                    threadId: thread._id,
                    patient: patientDoc,
                    specializationId: specializationDoc._id,
                    doctorId: checkup.doctorId,
                },
                patientCount,
                DoctorCount
            );
            await createPrescription({ checkup: checkup });
        }
    }
    console.log('Cases seeded!');
    process.exit();
}

seed();

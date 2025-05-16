const { createPatient } = require('../factories/patientFactory');
const dbConnect = require('../config/dbConnection'); // Your DB connection logic
const User = require('../models/User');

async function seed() {
    await dbConnect();

    const userCount = await User.countDocuments();
    const patientsUsers = await User.find({ role: 'patient' });

    for (let i = 0; i < patientsUsers.length; i++) {
        await createPatient({ user: patientsUsers[i] }, userCount);
    }

    console.log('Patients seeded!');
    process.exit();
}
seed();

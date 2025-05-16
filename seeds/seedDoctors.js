const { createDoctor } = require('../factories/doctorFactory');
const dbConnect = require('../config/dbConnection');
const User = require('../models/User');
const Specialization = require('../models/Specialization');

async function seed() {
    await dbConnect(); // Ensure DB is connected before any DB operations

    const specializationCount = await Specialization.countDocuments();
    const userCount = await User.countDocuments();
    const doctorsUsers = await User.find({ role: 'doctor' });

    for (let i = 0; i < doctorsUsers.length; i++) {
        await createDoctor(
            { user: doctorsUsers[i] },
            specializationCount,
            userCount
        );
    }

    console.log('Doctors seeded!');
    process.exit();
}

seed();

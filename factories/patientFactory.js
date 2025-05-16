const { faker } = require('@faker-js/faker');
const Patient = require('../models/Patient');
const User = require('../models/User');

const generatePatientData = async (overrides = {}, userCount) => {
    let userDoc = overrides.user;
    if (!userDoc) {
        const randomUser = Math.floor(Math.random() * userCount);
        userDoc = await User.findOne().skip(randomUser).lean();
    }
    return {
        userId: userDoc._id,
        bloodType: faker.helpers.arrayElement([
            'A+',
            'A-',
            'B+',
            'B-',
            'AB+',
            'AB-',
            'O+',
            'O-',
        ]),
        height: faker.number.int({ min: 100, max: 200 }), // in cm
        weight: faker.number.int({ min: 40, max: 150 }), // in kg
        otp: faker.number.int({ min: 100000, max: 999999 }).toString(),
        plan: faker.helpers.arrayElement(['Basic', 'Premium']),

        ...overrides, // allows you to overwrite any field (optional)
    };
};

exports.createPatient = async (overrides = {}, userCount) => {
    const data = await generatePatientData(overrides, userCount); // create fake patient object
    const patient = new Patient(data); // turn it into a Mongoose model
    return await patient.save(); // insert into MongoDB
};

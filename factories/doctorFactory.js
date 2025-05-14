const {faker} = require("@faker-js/faker");
const Doctor = require("../models/Doctor");
const Specialization = require("../models/Specialization");
const User = require("../models/User");

const generateDoctorData = async (overrides = {},specializationCount,userCount) => {
    let specializationDoc = overrides.specialization;
    if(!specializationDoc) {
        const randomSpecialization = Math.floor(Math.random() * specializationCount);
        specializationDoc = await Specialization.findOne().skip(randomSpecialization).lean();
    }
    let userDoc = overrides.user;
    if(!userDoc) {
        const randomUser = Math.floor(Math.random() * userCount);
        userDoc = await User.findOne().skip(randomUser).lean();
    }
    return {
        userId: userDoc._id, 
        specialization: specializationDoc._id,
        certificates: [
            {
                name: faker.person.firstName(),
                copy: faker.image.avatar(),
            },
        ],
        clinicAddress: {
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            country: faker.location.country(),
        },
        bio: faker.lorem.paragraph(),
        experience: faker.number.int({ min: 0, max: 50 }),
        ...overrides, // allows you to overwrite any field (optional)
    };
}

exports.createDoctor = async(doctorData,specializationCount,userCount) => {
    const data = await generateDoctorData(doctorData,specializationCount,userCount);
    return await Doctor.create(data);
}
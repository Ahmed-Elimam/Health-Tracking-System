const {faker} = require("@faker-js/faker");
const Doctor = require("../models/Doctor");

generateDoctorData = async (overrides = {},specilazationCount,userCount) => {
    const random = Math.floor(Math.random() * specilazationCount);
    const specializationDoc = await Specialization.findOne().skip(random).lean();
    const randomUser = Math.floor(Math.random() * userCount);
    const userDoc = await User.findOne().skip(randomUser).lean();

    return {
        userId: userDoc._id, 
        specialization: specializationDoc._id,
        certificates: [
            {
                name: faker.name.findName(),
                copy: faker.image.imageUrl(),
            },
        ],
        clinicAddress: {
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            country: faker.address.country(),
        },
        bio: faker.lorem.paragraph(),
        experience: faker.number.int({ min: 0, max: 50 }),
        ...overrides, // allows you to overwrite any field (optional)
    };
}

exports.createDoctor = async(doctorData,specializationCount,userCount) => {
    const data = generateDoctorData(doctorData,specializationCount,userCount);
    return await Doctor.create(data);
}
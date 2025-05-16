const { faker } = require('@faker-js/faker');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const generateUserData = async (overrides = {}) => {
    return {
        email: faker.internet.email(),
        password: await bcrypt.hash('Password123', 10),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        nationalId: faker.number
            .int({ min: 10000000000000, max: 99999999999999 })
            .toString(),
        phone: [generateEgyptianPhoneNumber(), generateEgyptianPhoneNumber()],
        address: {
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            country: faker.location.country(),
        },
        profileImage: faker.image.avatar(),
        dateOfBirth: faker.date.past(),
        role: faker.helpers.arrayElement(['patient', 'doctor', 'admin']),
        currentlyActive: faker.datatype.boolean(),
        emailVerified: faker.datatype.boolean(),
        phoneVerified: faker.datatype.boolean(),

        ...overrides, // allows you to overwrite any field (optional)
    };
};

const generateEgyptianPhoneNumber = () => {
    const prefixes = ['011', '012', '015', '010'];
    const prefix = faker.helpers.arrayElement(prefixes);
    const rest = faker.string.numeric(8); // 8 random digits
    return prefix + rest;
};
exports.createUser = async userData => {
    const data = await generateUserData(userData);
    const user = await User.create(data);
    return user;
};

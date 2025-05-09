const { faker } = require("@faker-js/faker");
const User = require("../models/User");

const generateUserData = (overrides = {}) => {
    return {
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        nationalId: faker.datatype.number({ min: 10000000000000, max: 99999999999999 }).toString(),
        phone: [
            generateEgyptianPhoneNumber(),
            generateEgyptianPhoneNumber(),
        ],
        addEventListener:{
            street: faker.address.streetAddress(),
            city: faker.address.city(),
            state: faker.address.state(),
            country: faker.address.country(),
        },
        profileImage: faker.image.imageUrl(),
        dateOfBirth: faker.date.past(),
        role: faker.helpers.arrayElement(["patient", "doctor", "admin"]),
        currentlyActive: faker.datatype.boolean(),
        emailVerified: faker.datatype.boolean(),
        phoneVerified: faker.datatype.boolean(),

        ...overrides, // allows you to overwrite any field (optional)
    };
}

const generateEgyptianPhoneNumber = () => {
    const prefixes = ['+2011', '+2012', '+2015', '+2010'];
    const prefix = faker.helpers.arrayElement(prefixes);
    const rest = faker.string.numeric(8); // 8 random digits
    return prefix + rest;
  }
exports.createUser = async (userData) => {
    const data = generateUserData(userData);
    const user = await User.create(data);
    return user;
}
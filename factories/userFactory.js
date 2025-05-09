const { faker } = require("@faker-js/faker");
const User = require("../models/User");

generateUserData = (overrides = {}) => {
    return {
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        nationalId: faker.datatype.number({ min: 10000000000000, max: 99999999999999 }).toString(),
        phone: faker.phone.number(),
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
exports.createUser = async (userData) => {
    const data = generateUserData(userData);
    const user = await User.create(data);
    return user;
}
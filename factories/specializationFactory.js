const {faker} = require("@faker-js/faker");
const Specialization = require("../models/Specialization");

exports.generateSpecializationData = (overrides = {}) => {
    return {
        name: faker.unique(),
        ...overrides, // allows you to overwrite any field (optional)
    };
}
exports.createSpecialization = async (specializationData) => {
    const data = generateSpecializationData(specializationData);
    return await Specialization.create(data);
}
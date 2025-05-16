const { faker } = require('@faker-js/faker');
const Thread = require('../models/Thread');
const User = require('../models/User');

const generateThreadData = async (overrides = {}, userCount) => {
    const random = Math.floor(Math.random() * userCount);
    const userDoc = await User.findOne().skip(random).lean();
    return {
        createdBy: userDoc._id,
        name: faker.person.firstName(),
        ...overrides, // allows you to overwrite any field (optional)
    };
};
exports.createThread = async (threadData, userCount) => {
    const data = await generateThreadData(threadData, userCount);
    return await Thread.create(data);
};

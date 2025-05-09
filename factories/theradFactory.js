const { faker } = require("@faker-js/faker");
const Thread = require("../models/Thread");

 generateThreadData = (overrides = {},userCount) => {
    const random = Math.floor(Math.random() * userCount);
    const userDoc = User.findOne().skip(random).lean();
    return {
        createdBy: userDoc._id,
        name: faker.name.findName(),
        ...overrides, // allows you to overwrite any field (optional)
    };
}
exports.createThread = async (threadData,userCount) => {
    const data = generateThreadData(threadData,userCount);
    return await Thread.create(data);
}
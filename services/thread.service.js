const Thread = require('../models/Thread');

exports.getThreads = async () => {
    return await Thread.find({}).lean();
};

exports.getThread = async threadId => {
    return await Thread.findById(threadId).lean();
};

exports.createThread = async threadData => {
    return await Thread.create(threadData);
};

exports.updateThread = async (threadId, threadData) => {
    return await Thread.findByIdAndUpdate(threadId, threadData, { new: true });
};

exports.deleteThread = async threadId => {
    return await Thread.findByIdAndDelete(threadId);
};

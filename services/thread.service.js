const Thread = require("../models/Thread");
const { parseQueryParams } = require("../utils/parseQueryParams");
exports.getThreads = async (query) => {
  const { filters, sorts } = parseQueryParams(query);
  return await Thread.find(filters).sort(sorts);
};

exports.getThread = async (threadId) => {
  return await Thread.findById(threadId);
};

exports.createThread = async (threadData) => {
  return await Thread.create(threadData);
};

exports.updateThread = async (threadId, threadData) => {
  return await Thread.findByIdAndUpdate(threadId, threadData, { new: true });
};

exports.deleteThread = async (threadId) => {
  return await Thread.findByIdAndDelete(threadId);
};

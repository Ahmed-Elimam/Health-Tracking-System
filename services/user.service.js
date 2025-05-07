const User = require("../models/User");
const { parasQueryParams } = require("../utils/parasQueryParams");
exports.getUsers = async (query) => {
    const { filters, sorts } = parasQueryParams(query);
    const users = await User.find(filters).sort(sorts);
    return users;
};

exports.getUser = async (userId) => {
    const user = await User.findById(userId);
    return user;
};

exports.createUser = async (userData) => {
    const user = await User.create(userData);
    return user;
}

exports.updateUser = async (userId, userData) => {
    const user = await User.findOneAndUpdate({ _id: userId }, userData, {
        new: true,
    });
    return user;
};

exports.deleteUser = async (userId) => {
    const user = await User.findByIdAndDelete(userId);
    return user;
};

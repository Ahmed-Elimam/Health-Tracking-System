const User = require("../models/User");
const { parseQueryParams } = require("../utils/parseQueryParams");

exports.getAdmins = async (query) => {
  const { filters, sorts } = parseQueryParams(query);
  filters.role = "admin";
  const admins = await User.find(filters).sort(sorts);
  return admins;
};

exports.getAdmin = async (adminId) => {
  const admin = await User.findById(adminId);
  return admin;
};

exports.createAdmin = async (adminData) => {
  adminData.role = "admin";
  const newAdmin = await User.create(adminData);
  return newAdmin;
};

exports.updateAdmin = async (adminId, adminData) => {
  const admin = await User.findOneAndUpdate({ _id: adminId }, adminData, {
    new: true,
  });
  return admin;
};

exports.deleteAdmin = async (adminId) => {
  const admin = await User.findByIdAndDelete(adminId);
  return admin;
};

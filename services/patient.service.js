const Patient = require("../models/Patient");
const User = require("../models/User");
const Treating = require("../models/Treating");
const { parseQueryParams } = require("../utils/parseQueryParams");
exports.getPatients = async (query) => {
  const { filters, sorts } = parseQueryParams(query);
  return await Patient.find(filters).sort(sorts).populate("userId");
};
exports.getDoctorPatients = async (docId) => {
  // const { filters, sorts } = parseQueryParams(query);
  // const treatingsCount = await Treating.countDocuments({ doctorId: docId });
  // console.log(treatingsCount);

  let treatings = await Treating.find({ doctorId: docId }).populate({
    path: "patientId",
    populate: { path: "userId" },
  });

  const patients = treatings.map((t) => t.patientId);
  return patients;
};
exports.getPatient = async (patientId) => {
  return await Patient.findOne({ _id: patientId }).populate("userId");
};

exports.createPatient = async (patientData) => {
  return await Patient.create(patientData);
};

exports.updatePatient = async (patientId, data) => {
  const { userId: userData, ...patientData } = data;
  const patient = await Patient.findOne({ _id: patientId });
  const updatedPatient = await Patient.findOneAndUpdate(
    { _id: patientId },
    patientData,
    {
      new: true,
    }
  );
  await User.findOneAndUpdate(patient.userId, userData, {
    new: true,
  });
  return updatedPatient;
};

exports.deletePatient = async (patientId) => {
  const patient = await Patient.findOne({ _id: patientId });
  const userId = patient.userId;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const deletedPatient = await Patient.findOneAndDelete(
      { _id: patientId },
      { session }
    );

    await User.findOneAndDelete({ _id: userId }, { session });

    await session.commitTransaction();
    session.endSession();

    return deletedPatient;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

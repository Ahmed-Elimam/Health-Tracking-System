const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Patient = require("../models/Patient");

function generatePatientData(overrides = {}) {
  return {
    userId: new mongoose.Types.ObjectId(), // fake ObjectId for the user
    bloodType: faker.helpers.arrayElement([
      "A+",
      "A-",
      "B+",
      "B-",
      "AB+",
      "AB-",
      "O+",
      "O-",
    ]),
    height: faker.number.int({ min: 100, max: 200 }), // in cm
    weight: faker.number.int({ min: 40, max: 150 }), // in kg
    otp: faker.number.int({ min: 100000, max: 999999 }).toString(),
    doctors: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
    plan: faker.helpers.arrayElement(["Basic", "Premium"]),

    ...overrides, // allows you to overwrite any field (optional)
  };
}

async function createPatient(overrides = {}) {
  const data = generatePatientData(overrides); // create fake patient object
  const patient = new Patient(data); // turn it into a Mongoose model
  return await patient.save(); // insert into MongoDB
}
module.exports = {
  generatePatientData,
  createPatient,
};

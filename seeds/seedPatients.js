const mongoose = require("mongoose");
const { createPatient } = require("../factories/patientFactory");
const dbConnect = require("../config/dbConnection"); // Your DB connection logic

async function seed() {
  await dbConnect();
  for (let i = 0; i < 10; i++) {
    await createPatient();
  }
  console.log("Patients seeded!");
  process.exit();
}

seed();

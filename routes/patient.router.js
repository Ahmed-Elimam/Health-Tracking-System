const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patient.controller");

router
  .route("/")
  .get(patientController.getPatients)
  .post(patientController.createPatient);
router
  .route("/:id")
  .get(patientController.getPatient)
  .patch(patientController.updatePatient)
  .delete(patientController.deletePatient);
module.exports = router;

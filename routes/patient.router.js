const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patient.controller");
const roleMiddleware = require("../middlewares/roleMiddleware.js");

router
  .route("/")
  .get(roleMiddleware.authorizeRole(["admin"]), patientController.getPatients)
  .post(
    roleMiddleware.authorizeRole(["admin"]),
    patientController.createPatient
  );
router
  .route("/:id")
  .get(
    roleMiddleware.authorizeRole(["admin", "doctor"]),
    patientController.getPatient
  )
  .patch(
    roleMiddleware.authorizeRole(["admin", "patient"]),
    patientController.updatePatient
  )
  .delete(
    roleMiddleware.authorizeRole(["admin"]),
    patientController.deletePatient
  );
module.exports = router;

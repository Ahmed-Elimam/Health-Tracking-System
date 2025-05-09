const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patient.controller");
const roleMiddleware = require("../middlewares/roleMiddleware.js");
const verifyToken = require("../middlewares/authValidation");
const { authorizeRole } = require("../middlewares/roleMiddleware");
const { checkOwnership } = require("../middlewares/checkOwnership");

router
  .route("/")
  .get(verifyToken, authorizeRole("admin"), patientController.getPatients)
  .post(verifyToken, authorizeRole("admin"), patientController.createPatient);
router
  .route("/:id")
  .get(verifyToken, authorizeRole("admin", "patient"), checkOwnership, patientController.getPatient)
  .patch(verifyToken, authorizeRole("admin", "patient"), checkOwnership, patientController.updatePatient)
  .delete(verifyToken, authorizeRole("admin"),checkOwnership, patientController.deletePatient);
module.exports = router;

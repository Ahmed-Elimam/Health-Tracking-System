const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctor.controller");
const verifyToken = require("../middlewares/authValidation");
const { authorizeRole } = require("../middlewares/roleMiddleware");
const { checkOwnership } = require("../middlewares/checkOwnership")

router
  .route("/")
  .get(verifyToken, authorizeRole("admin"), doctorController.getDoctors)
  .post(verifyToken, authorizeRole("admin"), doctorController.createDoctor);

router
  .route("/:id")
  .get(verifyToken, authorizeRole("admin", "doctor"), checkOwnership, doctorController.getDoctor)
  .patch(verifyToken, authorizeRole("admin", "doctor"), checkOwnership, doctorController.updateDoctor)
  .delete(verifyToken, authorizeRole("admin"), checkOwnership, doctorController.deleteDoctor);

module.exports = router;

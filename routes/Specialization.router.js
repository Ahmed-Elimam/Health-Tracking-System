const express = require("express");
const router = express.Router();
const specializationController = require("../controllers/specialization.controller");
const verifyToken = require("../middlewares/authValidation");
const { authorizeRole } = require("../middlewares/roleMiddleware");

router
    .route("/")
    .get(verifyToken, specializationController.getSpecializations)
    .post(verifyToken, authorizeRole("super-admin", "admin"), specializationController.createSpecialization);

router
    .route("/:id")
    .get(verifyToken, specializationController.getSpecialization)
    .patch(verifyToken, authorizeRole("super-admin", "admin"), specializationController.updateSpecialization)
    .delete(verifyToken, authorizeRole("super-admin", "admin"), specializationController.deleteSpecialization);

module.exports = router;
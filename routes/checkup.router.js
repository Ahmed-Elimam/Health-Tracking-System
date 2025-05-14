const express = require("express");
const router = express.Router();
const checkupController = require("../controllers/checkup.controller");
const verifyToken = require("../middlewares/authValidation");
const { authorizeRole } = require("../middlewares/roleMiddleware");
const { checkOwnership } = require("../middlewares/checkOwnership");

router
  .route("/")
  .get(
    verifyToken,
    authorizeRole("super-admin", "admin", "doctor", "patient"),
    checkupController.getCheckups
  )
  .post(
    verifyToken,
    authorizeRole("super-admin", "admin"),
    checkupController.createCheckups
  );
// router
//   .route("/my-patient/:id")
//   .get(
//     verifyToken,
//     authorizeRole("super-admin", "admin", "patient", "doctor"),
//     checkupController.getCheckups
//   );
router
  .route("/:id")
  .get(
    verifyToken,
    authorizeRole("super-admin", "admin", "patient", "doctor"),
    checkupController.getCheckup
  )
  .patch(
    verifyToken,
    authorizeRole("super-admin", "admin"),
    checkupController.updateCheckup
  )
  .delete(
    verifyToken,
    authorizeRole("super-admin", "admin"),
    checkupController.deleteCheckup
  );
module.exports = router;

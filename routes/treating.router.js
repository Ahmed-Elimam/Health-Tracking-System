const express = require('express');
const router = express.Router();
const treatingController = require('../controllers/treating.controller');
const verifyToken = require('../middlewares/authValidation');
const { authorizeRole } = require('../middlewares/roleMiddleware');

router
    .route('/')
    .get(verifyToken, treatingController.getTreatings)
    .post(verifyToken, treatingController.createTreating);
router
    .route('/:id')
    .get(
        verifyToken,
        authorizeRole('super-admin', 'admin'),
        treatingController.getTreating
    )
    .patch(
        verifyToken,
        authorizeRole('super-admin', 'admin'),
        treatingController.updateTreating
    )
    .delete(
        verifyToken,
        authorizeRole('super-admin', 'admin'),
        treatingController.deleteTreating
    );

module.exports = router;

const express = require('express');
const router = express.Router();
const threadController = require('../controllers/thread.controller');
const verifyToken = require('../middlewares/authValidation');

router
    .route('/')
    .get(verifyToken, threadController.getThreads)
    .post(
        verifyToken,threadController.createThread);

router
    .route('/:id')
    .get(verifyToken, threadController.getThread)
    .patch(verifyToken, threadController.updateThread)
    .delete( verifyToken, threadController.deleteThread);

module.exports = router;

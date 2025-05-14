const express = require('express');
const router = express.Router();
const checkupController = require('../controllers/checkup.controller');

router.get('/', checkupController.getCheckups);
router.get('/:id', checkupController.getCheckup);
router.post('/', checkupController.createCheckup);
router.put('/:id', checkupController.updateCheckup);
router.delete('/:id', checkupController.deleteCheckup);

module.exports = router;
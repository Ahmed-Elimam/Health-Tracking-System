
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

router.get('/', paymentController.renderPaymentPage);
router.post('/checkout', paymentController.createCheckoutSession);
router.get('/complete', paymentController.paymentSuccess);
router.get('/cancel', paymentController.paymentCancel);

module.exports = router;

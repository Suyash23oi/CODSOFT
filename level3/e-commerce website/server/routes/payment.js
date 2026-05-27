const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createPaymentIntent, recordPayment } = require('../controllers/paymentController');

router.post('/intent', protect, createPaymentIntent);
router.post('/record', protect, recordPayment);

module.exports = router;

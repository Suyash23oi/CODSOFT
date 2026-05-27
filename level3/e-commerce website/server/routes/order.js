const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const { createOrder, getOrders, getOrderById, getAllOrders } = require('../controllers/orderController');

router.post('/', protect, createOrder);
router.get('/my', protect, getOrders);
router.get('/:id', protect, getOrderById);
router.get('/', protect, admin, getAllOrders);

module.exports = router;

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getCart, addToCart, removeFromCart, updateCart } = require('../controllers/cartController');

router.get('/', protect, getCart);
router.put('/', protect, updateCart);
router.post('/', protect, addToCart);
router.delete('/:productId', protect, removeFromCart);

module.exports = router;

const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const { createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

router.post('/products', protect, admin, createProduct);
router.put('/products/:id', protect, admin, updateProduct);
router.delete('/products/:id', protect, admin, deleteProduct);

module.exports = router;

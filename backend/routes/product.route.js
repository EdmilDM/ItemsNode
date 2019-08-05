const express = require('express');

const productController = require('../controllers/product.controller');
const auth = require('../utils/auth');

const router = new express.Router();

router.get('/products', auth.required, productController.getAllProducts);
router.post('/create-product', auth.required, productController.createProduct);

module.exports = router;

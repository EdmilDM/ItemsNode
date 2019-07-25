const express = require('express');

const productController = require('../controllers/product.controller');

const router = new express.Router();

router.get('/products', productController.getAllProducts);
router.post('/create-product', productController.createProduct);

module.exports = router;

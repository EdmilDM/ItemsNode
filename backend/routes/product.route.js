const express = require('express');

const productController = require('../controllers/product.controller');
const auth = require('../utils/auth');

const router = new express.Router();

router.get('/products', auth.required, productController.getAllProducts);
router.post('/create-product', auth.required, productController.createProduct);
router.get('/product/:_id', auth.required, productController.findProductById);
router.put('/update-product', auth.required, productController.updateProduct);
router.delete('/delete-product', auth.required,
    productController.deleteProduct);

module.exports = router;

const express = require('express');

// Import of all routes
const productRoutes = require('./product.route');

const router = new express.Router();

router.use('/product', productRoutes);

module.exports = router;

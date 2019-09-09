const express = require('express');

// Import of all routes
const productRoutes = require('./product.route');
const userRoutes = require('./user.route');

const router = new express.Router();

router.use('/api/v1', productRoutes, userRoutes);

module.exports = router;

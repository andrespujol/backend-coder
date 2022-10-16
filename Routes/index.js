const express = require('express');
const productsRoutes = require('./productsRouter');

const router = express.Router();

router.use('/products', productsRoutes);

module.exports = router;
const express = require('express');
const router = express.Router();

const productRoutes = require('./products');
const userRoutes = require('./users');
const orderRoutes = require('./orders');
const commentRoutes = require('./comments');
const cartRoutes = require('./carts');

router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/orders', orderRoutes);
router.use('/comments', commentRoutes);
router.use('/carts', cartRoutes);


module.exports = router;
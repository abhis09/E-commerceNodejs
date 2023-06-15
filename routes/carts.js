const express = require('express');
const router = express.Router();

const cartControllers = require('../controllers/cartController');
const Authentication = require('../middlewares/Auth');

router.get('/getCartItems', Authentication, cartControllers.GetCartItems);
router.post('/addToCart', Authentication, cartControllers.UpdateCart);
router.delete('/removeFromCart', Authentication, cartControllers.DeleteCartItem);

module.exports = router;
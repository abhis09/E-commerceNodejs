const express = require('express');
const router = express.Router();

const orderControllers = require('../controllers/orderController');
const Authentication = require('../middlewares/Auth');

router.post("/createOrder", Authentication, orderControllers.CreateOrder);
router.get("/getOrders", Authentication, orderControllers.GetOrders);
router.get("/getOrder/:id", Authentication, orderControllers.GetOrder);

module.exports = router;
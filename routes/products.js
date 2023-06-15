const express = require('express');
const router = express.Router();

const productControllers = require('../controllers/productController');

router.post("/addProduct", productControllers.AddProduct);
router.get("/getProducts", productControllers.GetProducts);
router.get("/getProducts/:id", productControllers.GetProduct);
router.put("/updateProduct/:id", productControllers.UpdateProduct);
router.delete("/deleteProduct/:id", productControllers.DeleteProduct);


module.exports = router;
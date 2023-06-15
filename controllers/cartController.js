const Product = require('../Models/Product');
const Cart = require("../Models/Cart");

exports.UpdateCart = function(req, res) {

    //add to cart
    if (!req.body.ProductId || !req.body.Quantity) {
        res.status(400).json({
            status: 400,
            message: "ProductId and Quantity are required"
        });
    }

    //check if product exists
    var product = Product.findOne({
        productId: Number(req.body.ProductId)
    }, function(err, product) {
        if (err) {
            res.status(500).json({
                status: 500,
                message: "Error finding product"
            });
        } else if (!product) {
            res.status(400).json({
                status: 400,
                message: "Product not found"
            });
        } else {
            //check if product is in cart
            var cart = Cart.findOne({
                userId: Number(req.user.userId),
                productId: Number(req.body.ProductId)
            }, function(err, cart) {
                if (err) {
                    res.status(500).json({
                        status: 500,
                        message: err
                    });
                } else if (!cart) {
                    //create new cart
                    var newCart = new Cart({
                        userId: req.user.userId,
                        productId: req.body.ProductId,
                        quantity: req.body.Quantity
                    });

                    newCart.save(function(err, cart) {
                        if (err) {
                            res.status(500).json({
                                status: 500,
                                message: err
                            });
                        } else {
                            res.status(200).json({
                                status: 200,
                                message: "Cart updated"
                            });
                        }
                    });
                } else {
                    //update cart
                    cart.quantity = req.body.Quantity;
                    cart.save(function(err, cart) {
                        if (err) {
                            res.status(500).json({
                                status: 500,
                                message: "Error saving cart"
                            });
                        } else {
                            res.status(200).json({
                                status: 200,
                                message: "Cart updated"
                            });
                        }
                    });
                }
            });
        };
    });
};

exports.GetCartItems = function(req, res) {

    //get cart items
    Cart.find({
        userId: req.user.userId
    }, function(err, cart) {
        if (err) {
            res.status(500).json({
                status: 500,
                message: err
            });
        } else {
            res.status(200).json({
                status: 200,
                message: "Cart items retrieved",
                cart: cart
            });
        }
    });

};

exports.DeleteCartItem = function(req, res) {

    //delete cart item
    Cart.findOneAndDelete({
        userId: req.user.userId,
        productId: req.body.ProductId
    }, function(err, cart) {
        if (err) {
            res.status(500).json({
                status: 500,
                message: err
            });
        } else if (!cart) {
            res.status(400).json({
                status: 400,
                message: "Cart item not found"
            });
        } else {
            res.status(200).json({
                status: 200,
                message: "Cart item deleted"
            });
        }
    });
};

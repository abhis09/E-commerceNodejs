const Product = require('../Models/Product');
const Cart = require("../Models/Cart");
const Order = require("../Models/Order");

exports.CreateOrder = function(req, res) {

    //make a new order
    //get items from the cart

    Cart.find({
        userId: Number(req.user.userId)
    }, function(err, cart) {
        if (err) {
            res.status(500).json({
                status: 500,
                message: err
            });
        } else {

            //get producty details

            Product.find({
                productId: {
                    $in: cart.map(function(item) {
                        return Number(item.productId);
                    })
                }
            }, function(err, products) {
                if (err) {
                    res.status(500).json({
                        status: 500,
                        message: err
                    });
                } else {


                    var tmpProducts = [];

                    var totalAmount = 0;
                    products.forEach(function(product) {
                        var id = product.productId;
                        var quantity = cart.find(function(item) {
                            return item.productId === product.productId;
                        }).quantity;

                        tmpProducts.push({
                            productId: id,
                            quantity: quantity
                        });


                        totalAmount += product.productPrice * cart.find(function(item) {
                            return item.productId === product.productId;
                        }).quantity;
                    });


                    //create order

                    const order = new Order({
                        userId: req.user.userId,
                        products: tmpProducts,
                        totalPrice: totalAmount
                    });

                    console.log(order);

                    order.save(function(err, order) {
                        if (err) {
                            res.status(500).json({
                                status: 500,
                                message: err
                            });
                        } else {
                            delete cart
                            Cart.deleteMany({
                                userId: req.user.userId
                            }, function(err) {
                                if (err) {
                                    res.status(500).json({
                                        status: 500,
                                        message: err
                                    });
                                } else {
                                    res.status(200).json({
                                        status: 200,
                                        message: "Order created successfully"
                                    });
                                }
                            });
                        }
                    });

                }

            });
        };

    });
};

exports.GetOrder = function(req, res) {

    //get order by id

    Order.findOne({
        orderId: req.params.id
    }, function(err, order) {
        if (err) {
            res.status(500).json({
                status: 500,
                message: err
            });
        } else {
            res.status(200).json({
                status: 200,
                message: "Order fetched successfully",
                data: order
            });
        }
    })


};

exports.GetOrders = function(req, res) {
    //get order details

    Order.find({
        userId: req.user.userId
    }, function(err, orders) {
        if (err) {
            res.status(500).json({
                status: 500,
                message: err
            });
        } else {
            res.status(200).json({
                status: 200,
                message: "Orders fetched successfully",
                orders: orders
            });
        }
    });
};
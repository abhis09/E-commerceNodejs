const Product = require("../Models/Product");

exports.AddProduct = async function(req, res) {

    //add product
    console.log(req.body);

    const product = new Product({
        productName: req.body.ProductName,
        productImage: req.body.ProductImage,
        productPrice: req.body.ProductPrice,
        productDescription: req.body.ProductDescription,
        shippingCost: req.body.ShippingCost,
    }
    ,
    // {
    //     _id:false
    // }
    );

    console.log(product);

  await product.save(function(err) {
        if (err) {
            res.json({ status: 400, message: err });
        } else {
            res.json({ status: 200, message: 'Product added successfully!' });
        }

    });
};

exports.UpdateProduct = function(req, res) {

    if (!req.params.id) {
        res.json({ status: 400, message: 'Product id is required!' });
    }


    //update product

    Product.findOneAndUpdate({ productId: Number(req.params.id) }, {
        $set: {
            productName: req.body.ProductName,
            productImage: req.body.ProductImage,
            productPrice: req.body.ProductPrice,
            productDescription: req.body.ProductDescription,
            shippingCost: req.body.ShippingCost,
        }
    }, { new: true }, function(err, product) {
        if (err) {
            res.send({ status: 400, message: err });
        } else {
            res.json({ status: 200, message: 'Product updated successfully!' });
        }
    });


};

exports.GetProducts = function(req, res) {

    //get all products

    Product.find({}, function(err, products) {
        if (err) {
            res.send({ status: 400, message: err });
        } else {
            res.json({ status: 200, message: 'Products fetched successfully!', products: products });
        }
    });


};

exports.GetProduct = function(req, res) {

    //get product by id

    Product.findOne({ productId: Number(req.params.id) }, function(err, product) {
        if (err) {
            res.send({ status: 400, message: err });
        } else {
            res.json({ status: 200, message: 'Product fetched successfully!', product: product });
        }
    });

};

exports.DeleteProduct = function(req, res) {

    //check if product id is present and if its present delete product

    if (!req.params.id) {
        res.json({ status: 400, message: 'Product id is required!' });
    }

    Product.findOneAndRemove({ productId: Number(req.params.id) }, function(err, product) {
        if (err) {
            res.send({ status: 400, message: err });
        } else {
            res.json({ status: 200, message: 'Product deleted successfully!' });
        }
    });

};
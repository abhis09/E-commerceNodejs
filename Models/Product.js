const mongoose = require("mongoose");
const validator = require("validator");

const ProductSchema = new mongoose.Schema({
  productId: {
    type: Number,
    unique: true,
    trim: true,
  },
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  productPrice: {
    type: Number,
    required: true,
    trim: true,
  },
  productDescription: {
    type: String,
    required: true,
    trim: true,
  },
  productImage: {
    type: String,
    required: true,
    trim: true,
  },
  shippingCost: {
    type: Number,
    required: true,
    trim: true,
  },
});

ProductSchema.pre("save", function (next) {
  var tmp = this;
  mongoose
    .model("Product", ProductSchema)
    .countDocuments(function (error, counter) {
      if (error) return next(error);
      tmp.productId = counter + 1;
      next();
    });
});

module.exports = mongoose.model("Product", ProductSchema);

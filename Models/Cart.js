const mongoose = require("mongoose");
const validator = require("validator");

const CartSchema = new mongoose.Schema({
  cartId: {
    type: Number,
    unique: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  productId: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

CartSchema.pre("save", function (next) {
  var tmp = this;
  mongoose.model("Cart", CartSchema).countDocuments(function (error, counter) {
    if (error) return next(error);
    tmp.cartId = counter + 1;
    next();
  });
});

module.exports = mongoose.model("Cart", CartSchema);

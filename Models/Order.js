const mongoose = require("mongoose");
const validator = require("validator");

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    unique: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  products: [
    {
      productId: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
});

OrderSchema.pre("save", function (next) {
  var tmp = this;
  mongoose
    .model("Order", OrderSchema)
    .countDocuments(function (error, counter) {
      if (error) return next(error);
      tmp.orderId = counter + 1;
      next();
    });
});

module.exports = mongoose.model("Order", OrderSchema);

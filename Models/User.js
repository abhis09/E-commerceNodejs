const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  userId: {
    type: Number,
  },
  username: {
    type: String,
    required: false,
    trim: true,
  },
  emailAddress: {
    type: String,
    unique: true,
    required: false,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Please enter valid email address");
      }
    },
  },
  password: {
    type: String,
    required: false,
    trim: true,
  },
  shippingAddress: {
    type: String,
    required: false,
    trim: true,
  },
});

UserSchema.pre("save", function (next) {
  var tmp = this;
  mongoose.model("User", UserSchema).countDocuments(function (error, counter) {
    if (error) return next(error);
    tmp.userId = counter + 1;
    next();
  });
});

module.exports = mongoose.model("User", UserSchema);

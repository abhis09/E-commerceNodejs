const mongoose = require("mongoose");
const validator = require("validator");

const CommentSchema = new mongoose.Schema({
  commentId: {
    type: Number,
    unique: true,
  },
  commentText: {
    type: String,
    required: true,
    trim: true,
  },
  commentImage: {
    type: String,
    required: true,
    trim: true,
  },
  commentDate: {
    type: Date,
    default: Date.now,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  userId: {
    type: Number,
    required: true,
  },
  productId: {
    type: Number,
    required: true,
  },
});

CommentSchema.pre("save", function (next) {
  var tmp = this;
  mongoose
    .model("Comment", CommentSchema)
    .countDocuments(function (error, counter) {
      if (error) return next(error);
      tmp.commentId = counter + 1;
      next();
    });
});

module.exports = mongoose.model("Comment", CommentSchema);

const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Review rating is required. Please provide a rating."],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Review title is required. Please provide a title."],
      maxLength: [100, "Review title cannot be more than 100 characters."],
    },
    comment: {
      type: String,
      trim: true,
      required: [true, "Review comment is required. Please provide a comment."],
      maxLength: [1000, "Review comment cannot be more than 1000 characters."],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose("Review", reviewSchema);

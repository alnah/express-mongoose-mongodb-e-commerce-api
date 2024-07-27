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

// only one review per product and per user
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.statics.updateProductRatingStats = async function (productId) {
  const pipeline = [
    // match reviews for the specified product
    { $match: { product: productId } },
    // group all matched reviews to calculate average rating and total reviews
    {
      $group: {
        _id: null, // no criteria to group and aggregate all matched documents
        averageRating: { $avg: "$rating" }, // calculate average rating
        numOfReviews: { $sum: 1 }, // count the number of reviews
      },
    },
  ];
  const result = await this.aggregate(pipeline);
  try {
    await this.model("Product").findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (error) {
    console.error(error);
  }
};

// update product rating stats on product.save() method
reviewSchema.post("save", async function () {
  await this.constructor.updateProductRatingStats(this.product);
});

// update product rating stats on product.deleteOne() method
reviewSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function () {
    await this.constructor.updateProductRatingStats(this.product);
  }
);

module.exports = mongoose.model("Review", reviewSchema);

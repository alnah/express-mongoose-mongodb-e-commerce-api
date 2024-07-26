const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [
        true,
        "Product name is required. Please provide a product name.",
      ],
      maxLength: [100, "Product name cannot be more than 100 characters."],
    },
    price: {
      type: Number,
      required: [
        true,
        "Product price is required. Please provide a product price.",
      ],
      default: 0,
    },
    description: {
      type: String,
      required: [
        true,
        "Product description is required. Please provide a product description.",
      ],
      maxLength: [
        1000,
        "Product description cannot be more than 1000 characters.",
      ],
    },
    image: {
      type: String,
      default: "/uploads/example.jpeg",
    },
    category: {
      type: String,
      required: [
        true,
        "Product category is required. Please provide a product category.",
      ],
      enum: ["office", "kitchen", "bedroom"],
    },
    company: {
      type: String,
      required: [
        true,
        "Product company is required. Please provide a product company",
      ],
      enum: {
        values: ["ikea", "liddy", "marcos"],
        message: "{VALUE} is not a registered company.",
      },
    },
    colors: {
      type: [String],
      required: [true, "At least one color is required."],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: true,
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

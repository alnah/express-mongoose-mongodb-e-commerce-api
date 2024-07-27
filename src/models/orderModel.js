const mongoose = require("mongoose");

const singleCartItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Item name is required. Please provide a name."],
  },
  image: {
    type: String,
    required: [true, "Item image is required. Please provide an image."],
  },
  price: {
    type: Number,
    required: [true, "Item price is required. Please provide a price."],
  },
  amount: {
    type: Number,
    required: [true, "Item amount is required. Please provide an amount."],
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: [true, "Product is required. Please provide a product."],
  },
});

const orderSchema = mongoose.Schema(
  {
    tax: {
      type: Number,
      required: [true, "Tax amount is required. Please provide a tax amount."],
    },
    shippingFee: {
      type: Number,
      required: [
        true,
        "Shipping fee is required. Please provide a shipping fee.",
      ],
    },
    subtotal: {
      type: Number,
      required: [true, "Subtotal is required. Please provide a subtotal."],
    },
    total: {
      type: Number,
      required: [
        true,
        "Total amount is required. Please provide a total amount.",
      ],
    },
    cardItems: [singleCartItemSchema],
    status: {
      type: String,
      enum: ["pending", "failed", "delivered", "canceled"],
      default: "pending",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "User is required. Please provide a user."],
    },
    clientSecret: {
      type: String,
      required: [
        true,
        "Client secret is required. Please provide a client secret.",
      ],
    },
    paymentIntentId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

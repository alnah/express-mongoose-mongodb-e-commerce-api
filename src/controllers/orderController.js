const { StatusCodes: SC } = require("http-status-codes");

const { BadRequestError, NotFoundError } = require("../errors");
const { productModel, orderModel } = require("../models");
const { fakeStripeApi, checkPermissions } = require("../utils");

const getAllOrders = async (req, res) => {
  const orders = await orderModel.find({});
  res.status(SC.OK).json({ orders, count: orders.length });
};

const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;
  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError(
      "Please make sure to add items to your cart. It should contain at least one item."
    );
  }
  if (!tax) {
    throw new BadRequestError("Tax is required.");
  }
  if (!shippingFee) {
    throw new BadRequestError("Shipping fee is required.");
  }
  let orderItems = [];
  let subtotal = 0;
  orderItems = await Promise.all(
    cartItems.map(async (item) => {
      const dbProduct = await productModel.findOne({ _id: item.product });
      if (!dbProduct) {
        throw new NotFoundError(`Product not found with id: ${item.product}.`);
      }
      const { name, price, image, _id } = dbProduct;
      subtotal += item.amount * price;
      return {
        amount: item.amount,
        name,
        price,
        image,
        product: _id,
      };
    })
  );
  const total = tax + shippingFee + subtotal;
  const paymentIntent = await fakeStripeApi({ amount: total, currency: "usd" });
  const order = await orderModel.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.clientSecret,
    user: req.user.userId,
  });
  res.status(SC.CREATED).json({ order, clientSecret: order.clientSecret });
};

const getSingleOrder = async (req, res) => {
  const orderId = req.params.id;
  const order = await orderModel.findOne({ _id: orderId });
  if (!order) {
    throw new NotFoundError(`Order not found with id: ${orderId}`);
  }
  checkPermissions(req.user, order.user);
  res.status(SC.OK).json({ order });
};

const getCurrentUserOrders = async (req, res) => {
  const currentUserId = req.user.userId;
  const orders = await orderModel.find({ user: currentUserId });
  res.status(SC.OK).json({ orders, count: orders.length });
};

const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { paymentIntentId } = req.body;
  const order = await orderModel.findOne({ _id: orderId });
  if (!order) {
    throw new NotFoundError(`Order not found with id: ${orderId}`);
  }
  checkPermissions(req.user, order.user);
  await orderModel.updateOne(
    { paymentIntentId, status: "paid" },
    { new: true, runValidators: true }
  );
  res.status(SC.OK).json({ order });
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};

const { StatusCodes: SC } = require("http-status-codes");

const { productModel } = require("../models");

const getAllProducts = (req, res, next) => {
  res.send("get all products");
};

const createProduct = async (req, res, next) => {
  const product = await productModel.create({
    ...req.body,
    user: req.user.userId,
  });
  res.status(SC.CREATED).json({ product });
};

const getSingleProduct = async (req, res, next) => {
  res.send("get a single product");
};

const updateProduct = async (req, res, next) => {
  res.send("update a product");
};

const deleteProduct = async (req, res, next) => {
  res.send("delete a product");
};

const uploadImage = async (req, res, next) => {
  res.send("upload an image");
};

module.exports = {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};

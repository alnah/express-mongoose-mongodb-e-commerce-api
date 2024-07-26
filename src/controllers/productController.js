const { StatusCodes: SC } = require("http-status-codes");

const { productModel } = require("../models");
const { BadRequestError } = require("../errors");

const getAllProducts = async (req, res, next) => {
  const products = await productModel.find({});
  res.status(SC.OK).json(products);
};

const createProduct = async (req, res, next) => {
  const product = await productModel.create({
    ...req.body,
    user: req.user.userId,
  });
  res.status(SC.CREATED).json({ product });
};

const getSingleProduct = async (req, res, next) => {
  const productId = req.params.id;
  const product = await productModel.findOne({ _id: productId });
  if (!product) {
    throw new BadRequestError(`Product not found with id: ${productId}`);
  }
  res.status(SC.OK).json({ product });
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

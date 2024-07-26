const fs = require("fs");

const { StatusCodes: SC } = require("http-status-codes");
const cloudinary = require("cloudinary").v2;

const { productModel } = require("../models");
const { NotFoundError } = require("../errors");

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
    throw new NotFoundError(`Product not found with id: ${productId}.`);
  }
  res.status(SC.OK).json({ product });
};

const updateProduct = async (req, res, next) => {
  const productId = req.params.id;
  const product = await productModel.findOneAndUpdate(
    { _id: productId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!product) {
    throw new NotFoundError(`Product not found with id: ${productId}.`);
  }
  res.status(SC.OK).json({ product });
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;
  const product = await productModel.findOne({ _id: productId });
  if (!product) {
    throw new NotFoundError(`Product not found with id: ${productId}.`);
  }
  await product.remove();
  res
    .status(SC.OK)
    .json({ message: `Successfully deleted product with id: ${productId}.` });
};

const uploadImage = async (req, res, next) => {
  const tmpFilePath = req.files.image.tempFilePath;
  const result = await cloudinary.uploader.upload(tmpFilePath, {
    use_filename: true,
    folder: "file-upload",
  });
  fs.unlinkSync(tmpFilePath);
  res.status(SC.OK).json({ image: { src: result.secure_url } });
};

module.exports = {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};

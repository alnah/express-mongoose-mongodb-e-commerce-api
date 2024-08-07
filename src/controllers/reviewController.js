const { StatusCodes: SC } = require("http-status-codes");

const { NotFoundError, BadRequestError } = require("../errors");
const { reviewModel, productModel, userModel } = require("../models");
const { checkPermissions } = require("../utils");

const getAllReviews = async (req, res, next) => {
  const reviews = await reviewModel
    .find({})
    .populate("product", "name company price");
  res.status(SC.OK).json({ reviews, count: reviews.length });
};

const createReview = async (req, res, next) => {
  const { productId } = req.body;
  const isValidProduct = await productModel.findOne({ _id: productId });
  if (!isValidProduct) {
    throw new NotFoundError(`Product not found with id: ${productId}`);
  }
  const { userId } = req.user;
  const isAlreadySubmitted = await reviewModel.findOne({
    user: userId,
    product: productId,
  });
  if (isAlreadySubmitted) {
    throw new BadRequestError(
      `A review has already been submitted by user '${userId}' for product '${productId}'. Only one review per user per product is allowed.`
    );
  }
  const review = await reviewModel.create({
    ...req.body,
    product: productId,
    user: userId,
  });
  res.status(SC.CREATED).json({ review });
};

const getSingleReview = async (req, res, next) => {
  const reviewId = req.params.id;
  const review = await reviewModel.findOne({ _id: reviewId });
  if (!review) {
    throw new NotFoundError(`Review not found with id: ${reviewId}.`);
  }
  res.status(SC.OK).json({ review });
};

const updateReview = async (req, res, next) => {
  const {
    params: { id: reviewId },
    body: { title, comment, rating },
  } = req;
  const review = await reviewModel.findOne({ _id: reviewId });
  if (!review) {
    throw new NotFoundError(`Review not found with id: ${reviewId}.`);
  }
  checkPermissions(req.user, review.user);
  Object.assign(review, {
    title: title ?? review.title,
    comment: comment ?? review.comment,
    rating: rating ?? review.rating,
  });
  await review.save();
  res.status(SC.OK).json({ review });
};

const deleteReview = async (req, res, next) => {
  const reviewId = req.params.id;
  const review = await reviewModel.findOne({ _id: reviewId });
  if (!review) {
    throw new NotFoundError(`Review not found with id: ${reviewId}.`);
  }
  checkPermissions(req.user, review.user);
  await review.deleteOne();
  res
    .status(SC.OK)
    .json({ message: `Successfully deleted review with id: ${reviewId}.` });
};

const getSingleProductReviews = async (req, res) => {
  const productId = req.params.id;
  const reviews = await reviewModel.find({ product: productId });
  res.status(SC.OK).json({ reviews, count: reviews.length });
};

module.exports = {
  getAllReviews,
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
  getSingleProductReviews,
};

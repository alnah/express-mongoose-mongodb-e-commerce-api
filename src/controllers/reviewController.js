const getAllReviews = async (req, res, next) => {
  res.send("get all reviews");
};

const createReview = async (req, res, next) => {
  res.send("create a review");
};

const getSingleReview = async (req, res, next) => {
  res.send("get a single review");
};

const updateReview = async (req, res, next) => {
  res.send("update a review");
};

const deleteReview = async (req, res, next) => {
  res.send("delete a review");
};

module.exports = {
  getAllReviews,
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
};

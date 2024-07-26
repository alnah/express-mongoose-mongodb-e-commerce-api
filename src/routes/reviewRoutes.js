const router = require("express").Router();

const {
  getAllReviews,
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const { authenticateUserMiddleware: authUser } = require("../middlewares");

router.route("/").get(getAllReviews).post(authUser, createReview);
router
  .route("/:id")
  .get(getSingleReview)
  .patch(authUser, updateReview)
  .delete(authUser, deleteReview);

module.exports = router;

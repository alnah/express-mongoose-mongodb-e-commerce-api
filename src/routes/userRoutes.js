const router = require("express").Router();

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");
const { authenticateUserMiddleware: authUser } = require("../middlewares");

router.route("/").get(authUser, getAllUsers);

router.route("/showMe").get(showCurrentUser);
router.route("/updateUser").post(updateUser);
router.route("/updateUserPassword").post(updateUserPassword);

router.route("/:id").get(authUser, getSingleUser);

module.exports = router;

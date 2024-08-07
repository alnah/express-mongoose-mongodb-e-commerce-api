const router = require("express").Router();

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require("../controllers/userController");
const {
  authenticateUserMiddleware: authUser,
  authorizePermissionsMiddleware: authPermissions,
} = require("../middlewares");

router.route("/").get(authUser, authPermissions("admin"), getAllUsers);

router.route("/showMe").get(authUser, showCurrentUser);
router.route("/updateUser").patch(authUser, updateUser);
router.route("/updateUserPassword").patch(authUser, updateUserPassword);

router.route("/:id").get(authUser, getSingleUser);

module.exports = router;

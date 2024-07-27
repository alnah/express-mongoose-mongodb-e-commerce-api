const router = require("express").Router();

const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
} = require("../controllers/orderController");

const {
  authenticateUserMiddleware: authUser,
  authorizePermissionsMiddleware: authPermissions,
} = require("../middlewares");

router
  .route("/")
  .get(authUser, authPermissions("admin"), getAllOrders)
  .post(authUser, createOrder);

router.route("/:id").get(authUser, getSingleOrder).patch(authUser, updateOrder);

router.route("/showAllMyOrders").get(authUser, getCurrentUserOrders);

module.exports = router;

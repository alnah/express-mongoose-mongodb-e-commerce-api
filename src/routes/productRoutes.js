const router = require("express").Router();

const {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require("../controllers/productController");
const {
  authenticateUserMiddleware: authUser,
  authorizePermissionsMiddleware: authPermissions,
} = require("../middlewares/authenticationMiddleware");

router
  .route("/")
  .get(getAllProducts)
  .post(authUser, authPermissions("admin"), createProduct);

router
  .route("/:id")
  .get(getSingleProduct)
  .patch(authUser, authPermissions("admin"), updateProduct)
  .delete(authUser, authPermissions("admin"), deleteProduct);

router
  .route("/uploadImage")
  .post(authUser, authPermissions("admin"), uploadImage);

module.exports = router;

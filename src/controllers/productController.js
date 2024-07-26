const getAllProducts = (req, res, next) => {
  res.send("get all products");
};

const createProduct = (req, res, next) => {
  res.send("create a product");
};

const getSingleProduct = (req, res, next) => {
  res.send("get a single product");
};

const updateProduct = (req, res, next) => {
  res.send("update a product");
};

const deleteProduct = (req, res, next) => {
  res.send("delete a product");
};

const uploadImage = (req, res, next) => {
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

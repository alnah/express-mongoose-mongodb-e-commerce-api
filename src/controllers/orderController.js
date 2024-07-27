const getAllOrders = (req, res) => {
  res.send("Get all orders");
};

const getSingleOrder = (req, res) => {
  res.send("Get single order");
};

const getCurrentUserOrders = (req, res) => {
  res.send("Get current user orders");
};

const createOrder = (req, res) => {
  res.send("Create order");
};

const updateOrder = (req, res) => {
  res.send("Update order");
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
};

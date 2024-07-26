const { StatusCodes: SC } = require("http-status-codes");

const { userModel } = require("../models");
const { NotFoundError } = require("../errors");

const getAllUsers = async (req, res) => {
  const users = await userModel.find({ role: "user" }).select("-password");
  res.status(SC.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const userId = req.params.id;
  const user = await userModel.findOne({ _id: userId }).select("-password");
  if (!user) {
    throw new NotFoundError(`User not found with id: ${userId}`);
  }
  res.status(SC.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  const { user } = req;
  res.status(SC.OK).json({ user });
};

const updateUser = async (req, res) => {
  res.send("update user");
};

const updateUserPassword = async (req, res) => {
  res.send("update user password");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};

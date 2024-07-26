const { StatusCodes: SC } = require("http-status-codes");

const { userModel } = require("../models");

const getAllUsers = async (req, res) => {
  const users = await userModel.find({ role: "user" }).select("-password");
  res.status(SC.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  res.send("get single user");
};

const showCurrentUser = async (req, res) => {
  res.send("show current user");
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

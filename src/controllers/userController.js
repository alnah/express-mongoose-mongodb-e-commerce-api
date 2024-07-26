const { StatusCodes: SC } = require("http-status-codes");

const { userModel } = require("../models");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const { createTokenUser, attachCookiesToResponse } = require("../utils");

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
  const {
    user: { userId },
    body: { name, email },
  } = req;
  if (!name) {
    throw new BadRequestError("Name is required.");
  }
  if (!email) {
    throw new BadRequestError("Email is required.");
  }
  const updatedUser = await userModel.findOneAndUpdate(
    { _id: userId },
    { name, email },
    { new: true, runValidators: true }
  );
  const tokenUser = createTokenUser(updatedUser);
  attachCookiesToResponse({ res, status: SC.OK, user: tokenUser });
};

const updateUserPassword = async (req, res) => {
  const {
    user: { userId },
    body: { oldPassword, newPassword },
  } = req;
  if (!oldPassword) {
    throw new BadRequestError("Old password is required.");
  }
  if (!newPassword) {
    throw new BadRequestError("New password is required.");
  }
  const user = await userModel.findOne({ _id: userId });
  if (!user) {
    throw new NotFoundError(`User not found with id: ${userId}`);
  }
  const isPasswordCorrect = await user.comparePassword(oldPassword);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials.");
  }
  user.password = newPassword;
  await user.save();
  res
    .status(SC.OK)
    .json({ message: "Password has been successfully updated." });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};

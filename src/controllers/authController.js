const { StatusCodes: SC } = require("http-status-codes");

const { userModel } = require("../models");
const { BadRequestError } = require("../errors");

const register = async (req, res) => {
  if (await userModel.findOne({ email: req.body.email })) {
    throw new BadRequestError("This email already exists.");
  }

  const user = await userModel.create(req.body);
  res.status(SC.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send("login user");
};

const logout = async (req, res) => {
  res.send("logout user");
};

module.exports = { register, login, logout };

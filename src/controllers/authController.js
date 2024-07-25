const { StatusCodes: SC } = require("http-status-codes");

const { userModel } = require("../models");
const { BadRequestError } = require("../errors");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (await userModel.findOne({ email })) {
    throw new BadRequestError("This email already exists.");
  }
  const user = await userModel.create({ name, email, password });

  res.status(SC.CREATED).json({ user });
};

const login = async (req, res) => {
  res.send("login user");
};

const logout = async (req, res) => {
  res.send("logout user");
};

module.exports = { register, login, logout };

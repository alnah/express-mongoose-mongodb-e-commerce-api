const { StatusCodes: SC } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const { userModel } = require("../models");
const { BadRequestError } = require("../errors");
const { createJwt } = require("../utils");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (await userModel.findOne({ email })) {
    throw new BadRequestError("This email already exists.");
  }

  const user = await userModel.create({ name, email, password });
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  const token = createJwt({ payload: tokenUser });

  res.status(SC.CREATED).json({ user: tokenUser, token });
};

const login = async (req, res) => {
  res.send("login user");
};

const logout = async (req, res) => {
  res.send("logout user");
};

module.exports = { register, login, logout };

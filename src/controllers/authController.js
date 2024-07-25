const { StatusCodes: SC } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const { userModel } = require("../models");
const { BadRequestError } = require("../errors");
const { createJwt } = require("../utils");

const ONE_DAY = 1000 * 60 * 60 * 24;

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (await userModel.findOne({ email })) {
    throw new BadRequestError("This email already exists.");
  }

  const user = await userModel.create({ name, email, password });
  const tokenUser = { name: user.name, userId: user._id, role: user.role };
  const token = createJwt({ payload: tokenUser });

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  res.status(SC.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  res.send("login user");
};

const logout = async (req, res) => {
  res.send("logout user");
};

module.exports = { register, login, logout };

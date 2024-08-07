const { StatusCodes: SC } = require("http-status-codes");

const { userModel } = require("../models");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const {
  attachCookiesToResponse,
  detachCookiesFromResponse,
  createTokenUser,
} = require("../utils");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (await userModel.findOne({ email })) {
    throw new BadRequestError("This email already exists.");
  }
  const isFirstUser = (await userModel.countDocuments({})) === 0;
  const role = isFirstUser ? "admin" : "user";
  const user = await userModel.create({ name, email, password, role });
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, status: SC.CREATED, user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    throw new BadRequestError("Please provide an email.");
  }
  if (!password) {
    throw new BadRequestError("Please provide a password.");
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials.");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials.");
  }
  const tokenUser = createTokenUser(user);
  attachCookiesToResponse({ res, status: SC.OK, user: tokenUser });
};

const logout = async (req, res) => {
  detachCookiesFromResponse({ res, status: SC.OK });
};

module.exports = { register, login, logout };

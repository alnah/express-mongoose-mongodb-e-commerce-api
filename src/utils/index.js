const { createJwt, isTokenValid } = require("./jwt");
const {
  attachCookiesToResponse,
  detachCookiesFromResponse,
} = require("./cookies");
const createTokenUser = require("./createTokenUser");
const checkPermissions = require("./checkPermissions");
const fakeStripeApi = require("./fakeStripeApi");

module.exports = {
  createJwt,
  isTokenValid,
  attachCookiesToResponse,
  detachCookiesFromResponse,
  createTokenUser,
  checkPermissions,
  fakeStripeApi,
};

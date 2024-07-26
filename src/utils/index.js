const { createJwt, isTokenValid } = require("./jwt");
const {
  attachCookiesToResponse,
  detachCookiesFromResponse,
} = require("./cookies");

module.exports = {
  createJwt,
  isTokenValid,
  attachCookiesToResponse,
  detachCookiesFromResponse,
};

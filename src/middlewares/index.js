const errorHandlerMiddleware = require("./errorHandlerMiddleware");
const routeNotFoundMiddleware = require("./routeNotFoundMiddleware");
const {
  authenticateUserMiddleware,
  authorizePermissionsMiddleware,
} = require("./authenticationMiddleware");

module.exports = {
  errorHandlerMiddleware,
  routeNotFoundMiddleware,
  authenticateUserMiddleware,
  authorizePermissionsMiddleware,
};

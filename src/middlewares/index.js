const errorHandlerMiddleware = require("./errorHandlerMiddleware");
const routeNotFoundMiddleware = require("./routeNotFoundMiddleware");
const authenticateUserMiddleware = require("./authenticationMiddleware");

module.exports = {
  errorHandlerMiddleware,
  routeNotFoundMiddleware,
  authenticateUserMiddleware,
};

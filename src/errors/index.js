const BadRequestError = require("./badRequestError");
const CustomApiError = require("./customApiError");
const NotRouteError = require("./notRouteError");
const UnauthenticatedError = require("./unauthenticatedError");
const UnauthorizedError = require("./unauthorizedError");

module.exports = {
  BadRequestError,
  CustomApiError,
  NotRouteError,
  UnauthenticatedError,
  UnauthorizedError,
};

const BadRequestError = require("./badRequestError");
const CustomApiError = require("./customApiError");
const NotFoundError = require("./notRouteError");
const UnauthenticatedError = require("./unauthenticatedError");
const UnauthorizedError = require("./unauthorizedError");

module.exports = {
  BadRequestError,
  CustomApiError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
};

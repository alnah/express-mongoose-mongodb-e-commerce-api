const { StatusCodes } = require("http-status-codes");

const CustomApiError = require("./customApiError");

class UnauthorizedError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = UnauthorizedError;

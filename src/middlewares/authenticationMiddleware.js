const { isTokenValid } = require("../utils");
const { UnauthenticatedError } = require("../errors");

const authenticateUserMiddleware = async (req, res, next) => {
  const { token } = req.signedCookies;
  if (!token) {
    throw new UnauthenticatedError("Auth invalid. No token provided.");
  }
  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch {
    throw new UnauthenticatedError("Auth invalid. No token provided.");
  }
};

module.exports = authenticateUserMiddleware;

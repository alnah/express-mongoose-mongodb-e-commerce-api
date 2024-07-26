const { isTokenValid } = require("../utils");
const { UnauthenticatedError, UnauthorizedError } = require("../errors");

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

const authorizePermissionsMiddleware = (...roles) => {
  return async (req, rest, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError(
        `Only '${roles.join(", ")}' users can access this resource.`
      );
    }
    next();
  };
};

module.exports = { authenticateUserMiddleware, authorizePermissionsMiddleware };

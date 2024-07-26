const { BadRequestError } = require("../errors");

const checkPermissions = (currentUser, queriedUser) => {
  if (currentUser.role === "admin") return;
  if (currentUser.userId === queriedUser._id.toString()) return;
  throw new BadRequestError(
    `Current user with ID: ${currentUser.userId} is not authorized to access user with ID: ${queriedUser._id.toString()}.`
  );
};

module.exports = checkPermissions;

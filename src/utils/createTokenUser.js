const { attachCookiesToResponse } = require("./cookies");

const createTokenUser = (user, status) => {
  return { name: user.name, userId: user._id, role: user.role };
};

module.exports = createTokenUser;

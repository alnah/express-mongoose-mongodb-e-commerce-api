const { createJwt } = require("./jwt");

const ONE_DAY = 1000 * 60 * 60 * 24;

const attachCookiesToResponse = ({ res, status, user }) => {
  const token = createJwt({ payload: user });

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
    secure: process.env.NODE_ENV === "production",
    signed: true,
    sameSite: "Strict",
  });

  res.status(status).json({ user });
};

const detachCookiesFromResponse = ({ res, status }) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(status).json({ message: "User logged out." });
};

module.exports = { attachCookiesToResponse, detachCookiesFromResponse };

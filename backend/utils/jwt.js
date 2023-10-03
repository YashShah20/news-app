const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const sign = (payload) => {
  try {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: "3d",
    });
  } catch (error) {
    throw error;
  }
};

const verify = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  sign,
  verify,
};

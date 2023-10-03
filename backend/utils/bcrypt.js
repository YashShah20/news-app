const bcrypt = require("bcrypt");

const hash = async (password) => {
  return bcrypt.hash(password, 10);
};
const compare = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

module.exports = { hash, compare };

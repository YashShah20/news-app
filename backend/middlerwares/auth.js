const { verify } = require("../utils/jwt");

const userAuth = (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(" ");

    const user = verify(token);

    req.user = user;
    next();
  } catch (error) {
    res.status(403);
    next(new Error("auth failed..."));
  }
};

module.exports = { userAuth };

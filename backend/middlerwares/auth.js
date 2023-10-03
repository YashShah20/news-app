const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(" ");

    const user = jwt.decode(token);
    
  } catch (error) {
    next(error);
  }
};

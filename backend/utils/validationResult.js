const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  } else {
    const errors = result.array();
    res.status(400);
    next(errors);
  }
};

module.exports = validate;

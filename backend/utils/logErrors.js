const logErrors = (error, req, res, next) => {
  if (error) {
    console.log(error.message);
    next(error);
  }
  next();
};

module.exports = logErrors;

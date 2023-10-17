const logErrors = (error, req, res, next) => {
  if (error) {
    if (error.message) {
      console.log(error.message);
    } else {
      console.dir(error);
    }
    next(error);
  }
  next();
};

module.exports = logErrors;

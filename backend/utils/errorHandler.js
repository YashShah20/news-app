const errorHandler = (error, req, res, next) => {
  if (error) {
    if (res.headersSent) {
      return res.send({ error: error.message });
    }
    const statusCode = res.statusCode >= 400 ? res.statusCode : 500;
    const message =
      statusCode === 500
        ? "internal server error"
        : Array.isArray(error)
        ? error
        : error.message;
    return res.status(statusCode).send({ error: message });
  }
  next();
};

module.exports = errorHandler;

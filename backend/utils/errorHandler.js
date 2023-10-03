const errorHandler = (error, req, res, next) => {
  if (error) {
    if (res.headersSent) {
      return res.send({ error: error.message });
    }
    return res.status(res.statusCode || 500).send({ error: error.message });
  }
  next();
};

module.exports = errorHandler;

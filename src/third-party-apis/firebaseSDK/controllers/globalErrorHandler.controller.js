const globalErrorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 505;
  const errorMsg = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    error: errorMsg,
  });
};

module.exports = globalErrorHandler
/* =============================================================================
Global Error Handler Controller
============================================================================= */

const globalErrorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode || 500;
  let message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = globalErrorHandler;

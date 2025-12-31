const asyncErrorHander = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(err);
  }
};

module.exports = asyncErrorHander;

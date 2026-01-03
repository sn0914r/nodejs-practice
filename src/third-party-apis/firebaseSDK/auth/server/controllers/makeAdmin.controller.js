const { admin } = require("../../../config/firebase.config");
const asyncErrorHander = require("../../../utils/asyncErrorHandler");

const makeAdmin = asyncErrorHander(async (req, res, next) => {
  try {
    await admin.auth().setCustomUserClaims(req.user.uid, {
      role: "admin",
    });
    res.status(200).json({
      isSuccess: true,
      message: "User's role modified to admin",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = makeAdmin;

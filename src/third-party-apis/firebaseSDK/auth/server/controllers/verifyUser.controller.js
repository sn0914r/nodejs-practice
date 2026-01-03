const { admin } = require("../../../config/firebase.config");
const asyncErrorHander = require("../../../utils/asyncErrorHandler");

const verifyUser = asyncErrorHander(async (req, res, next) => {
  if (!req.headers?.authorization?.startsWith("Bearer ")) {
    res.statusCode = 400;
    throw new Error("Token must be provided");
  }

  const idToken = req.headers.authorization.split(" ")[1];
  const decodedToken = await admin.auth().verifyIdToken(idToken);
  req["user"] = decodedToken;
  next();
});

module.exports = verifyUser;

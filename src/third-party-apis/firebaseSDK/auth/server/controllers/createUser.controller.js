const { admin } = require("../../../config/firebase.config");
const asyncErrorHander = require("../../../utils/asyncErrorHandler");

const createUser = asyncErrorHander(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.statusCode = 500;
    throw new Error("Invalid form data");
  }

  try {
    const user = await admin.auth().createUser({
      email,
      password,
    });

    await admin.auth().setCustomUserClaims({
      role: "user",
      uid: user.uid,
    });

    const customToken = await admin.auth().createCustomToken(user.uid);

    res.status(200).json({
      isSuccess: true,
      token: customToken,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = createUser;

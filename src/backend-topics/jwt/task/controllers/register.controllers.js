/* =============================================================================
Register Controller

- sends the jwt token to the client
============================================================================= */
const registerController = (req, res) => {
  res.status(200).json({
    success: true,
    message: "register success",
    token: req.token,
  });
};

module.exports = {
  registerController,
};

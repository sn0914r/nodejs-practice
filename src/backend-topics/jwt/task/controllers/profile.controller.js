/* =============================================================================
Profile Controller

- Sends the user's profile to client
============================================================================= */

const profileController = (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
};

module.exports = profileController;

// Task 3: Implement a Protected Route
// Create an Express route that requires JWT authentication.
// Use the verifyToken middleware from task2.
// If authenticated, return a success message with the user's username.
// If not, the middleware will handle the error.

const express = require("express");
const verifyToken = require("./task2");
const generateToken = require("./task1");

const router = express.Router();

router.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({
    isSuccess: true,
    message: "Access Granted",
    user: req.user.username,
  });
});

router.get(
  "/create-token",
  (req, res, next) => {
    const { username, userId, role } = req.body;

    if (!username || !userId || !role) {
      res.statusCode = 400;
      throw new Error("All fields are required");
    }

    let token = generateToken({ username, userId, role });
    req.token = token;
    next();
  },
  (req, res) => {
    res.status(200).json({
      isSuccess: true,
      token: req.token,
      message: "token generated successfully",
    });
  }
);

module.exports = router;

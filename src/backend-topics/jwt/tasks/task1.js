// Task 1: Implement JWT Token Generation

const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "TIGOR";

const generateToken = (user) => {
  return jwt.sign(user, SECRET_KEY, {
    expiresIn: "1hr",
  });
};

module.exports = generateToken;


// Task 2: Implement JWT Verification Middleware
// Create a middleware function that verifies the JWT token from the Authorization header.
// If valid, attach the decoded payload to req.user.
// If invalid, return a 401 Unauthorized response.
// Use the secret key 'mySecretKey'.

const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY || "TIGOR";

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token || !token.startsWith("Bearer ")) {
    res.statusCode = 401;
    throw new Error("Authorization token is missing"); // global error handler catches this error
  }

  token = token.split(" ")[1];
  let decoded = jwt.verify(token, SECRET_KEY);
  req.user = decoded;
  next();
};

module.exports = verifyToken;

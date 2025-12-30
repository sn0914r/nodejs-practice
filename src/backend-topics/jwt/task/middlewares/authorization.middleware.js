const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../db/DB");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "TIGOR";

/* =============================================================================
Authorization Middleware:

- decodes the client sent bearer token
- sets the user object to the request object if the token is valid
- otherwise throws an error
============================================================================= */

const authorization = (req, res, next) => {
  const bearerToken = req.headers["authorization"];

  if (!bearerToken || !bearerToken.startsWith("Bearer")) {
    const err = new Error("Token missing");
    err.statusCode = 401;
    return next(err);
  }

  const token = bearerToken.split(" ")[1];

  try {
    const decodedUser = jwt.verify(token, JWT_SECRET_KEY);
    const targetUser = db.find((user) => user.id === decodedUser.id);
    req.user = {
      name: targetUser.name,
      email: targetUser.email,
      role: targetUser.role,
      id: targetUser.id,
    };
    next();
  } catch (error) {
    res.statusCode = 401;
    next(error);
  }
};

module.exports = authorization;

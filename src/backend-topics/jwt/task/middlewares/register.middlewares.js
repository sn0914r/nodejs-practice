const joi = require("joi");
const jwt = require("jsonwebtoken");
const users = require("../db/DB");
const bcrypt = require("bcrypt");

/* =============================================================================
JOI Validation
============================================================================= */
const validate = (req, res, next) => {
  const schemaObject = joi.object({
    name: joi.string().required().min(3),
    email: joi.string().email().required().min(3),
    role: joi.string().valid("user").valid("public").required(),
    password: joi.string().min(3).required(),
    confirmPassword: joi.ref("password"),
  });

  const { error, value } = schemaObject.validate(req.body);

  if (error) {
    res.status(400).json({
      success: true,
      message: "Validation Error",
      errors: error.details.map((err) => err.message),
    });
  } else {
    req.body = value;
    next();
  }
};

/* =============================================================================
Token Generation
============================================================================= */
const tokenGeneration = (SECRET_KEY, expTime) => (req, res, next) => {
  const { id, role } = req.body;
  const claims = { id, role };
  const token = jwt.sign(claims, SECRET_KEY, {
    expiresIn: expTime,
  });

  req.token = token;

  next();
};

/* =============================================================================
Storing Data in Users DB
============================================================================= */
const StoreInDB = async (req, res, next) => {
  const { name, email, role, password } = req.body;

  if (users.find((user) => user.email === email)) {
    res.status(400).json({
      success: false,
      message: "user already exists",
    });
  } else {
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      name,
      email,
      role,
      password: hashedPassword,
      id: users.length + 1,
    };
    users.push(newUser);
    console.log(newUser);
    req.body = newUser;
    next();
  }
};

module.exports = {
  validate,
  tokenGeneration,
  StoreInDB,
};

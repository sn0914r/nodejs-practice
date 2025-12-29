const express = require("express");
const joi = require("joi");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

/* =======================================================================
joi validation middleware
========================================================================== */
const validationFormData = () => (req, res, next) => {
  console.log("hh");
  const schemaObject = joi
    .object({
      name: joi.string().min(3).required(),
      email: joi.string().email().required(),
      password: joi.string().min(3).required(),
      confirmPassword: joi.ref("password"),
    })
    .options({ abortEarly: false });

  const { error, value } = schemaObject.validate(req.body);

  if (error) {
    res.json({
      success: false,
      message: "validation error",
      errors: error.details.map((err) => err.message),
    });
  } else {
    next();
  }
};

app.post("/form-validation", validationFormData(), (req, res) => {
  res.status(200).json({
    success: true,
    data: req.body,
  });
});

app.listen(PORT, () => console.log("Server is running at", PORT));

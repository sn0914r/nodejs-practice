const joi = require("joi");

// SCHEMAS

// Single product schema
const productSchema = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  price: joi.number().required().positive(),
  quantity: joi.number().positive().min(1),
  category: joi
    .string()
    .required()
    .lowercase()
    .valid("electronics", "clothing", "food", "books"),
  discount: joi.number().positive().optional().max(100).required(),
});

// Single product schema with optional field values for PATCH HTTP method
const productSchemaPATCH = joi.object({
  name: joi.string().optional(),
  description: joi.string().optional(),
  price: joi.number().optional().positive(),
  quantity: joi.number().positive().min(1),
  category: joi
    .string()
    .optional()
    .lowercase()
    .valid("electronics", "clothing", "food", "books"),
  discount: joi.number().positive().optional().max(100).optional(),
});

// Multiple product schema
const productsSchema = joi.array().items(productSchema).min(1).required().unique();


// VALIDATION SCHEMA MIDDLEWARE
const validationMiddleware = (schema) => (req, res, next) => {
  let { error, value } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      isSuccess: false,
      error: error.details.map((err) => err.message),
      message: "validation error",
    });
  }

  req.validatedData = value;
  next();
};

module.exports = {
  productSchema,
  validationMiddleware,
  productSchemaPATCH,
  productsSchema,
};

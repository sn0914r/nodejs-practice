# Joi Validation Library Notes

## Overview

Joi is javascript library used to validate request data in Javascript applications using predefined data schemas

## Installation

```bash
npm install joi
```

## Basic Usage

### Importing Joi

```javascript
const Joi = require("joi");
```

### Creating a Schema

```javascript
const schema = Joi.object({
  // Define your validation rules here
});
```

### Validating Data

```javascript
const { error, value } = schema.validate(data);

if (error) {
  // Handle validation errors
  console.log(error.details.map((err) => err.message));
} else {
  // Data is valid
  console.log(value);
}
```

## Common Validators

### String Validation

- `Joi.string()` - Validates string type
- `.min(length)` - Minimum length
- `.max(length)` - Maximum length
- `.email()` - Email format validation
- `.required()` - Field is required
- `.optional()` - Field is optional
- `.alphanum()` - Only alphanumeric characters
- `.uppercase()` - Convert to uppercase
- `.lowercase()` - Convert to lowercase

### Number Validation

- `Joi.number()` - Validates number type
- `.integer()` - Must be integer
- `.min(value)` - Minimum value
- `.max(value)` - Maximum value
- `.positive()` - Must be positive
- `.negative()` - Must be negative

### Date Validation

- `Joi.date()` - Validates date type
- `.greater(date)` - Must be greater than specified date
- `.less(date)` - Must be less than specified date
- `.iso()` - Must be ISO date format

### Boolean Validation

- `Joi.boolean()` - Validates boolean type

### Array Validation

- `Joi.array()` - Validates array type
- `.items(schema)` - Validate array items against schema
- `.min(length)` - Minimum array length
- `.max(length)` - Maximum array length

## Advanced Features

### References

Use `Joi.ref()` to reference other fields in the schema:

```javascript
const schema = Joi.object({
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.ref("password"), // Must match password field
});
```

### Nested Objects

```javascript
const schema = Joi.object({
  details: {
    stateCode: Joi.string().max(2),
    pincode: Joi.number(),
  },
});
```

### Validation Options

```javascript
const schema = Joi.object({
  // fields...
}).options({
  abortEarly: false, // Return all errors, not just the first one
});
```

## Error Handling

Validation errors are returned in the `error.details` array:

```javascript
if (error) {
  const errorMessages = error.details.map((detail) => detail.message);
  // errorMessages: ['"email" must be a valid email', '"name" is not allowed to be empty']
}
```

## Performance Tips

| Tip                                    | Reason                                            |
| -------------------------------------- | ------------------------------------------------- |
| Use `abortEarly: false`                | Collect all errors at once, don't repeat requests |
| Reuse schemas                          | Define once, use many times                       |
| Order validators logically             | Type check first, then constraints                |
| Cache middleware functions             | Don't recreate middleware per request             |
| Use `.forbidden()` for unwanted fields | Reject extra/unsafe fields                        |
| Validate early                         | Catch errors before processing                    |

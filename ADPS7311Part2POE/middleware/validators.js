const { body, validationResult } = require("express-validator");

// validation rules
const registerValidation = [
  body("fullName")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name must contain only letters"),

  body("username")
    .matches(/^[A-Za-z0-9]+$/)
    .withMessage("Username must be alphanumeric"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("accountNumber")
    .matches(/^[0-9]+$/)
    .withMessage("Account number must be numeric"),
];

const paymentValidation = [
  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be greater than 0"),

  body("currency")
    .matches(/^[A-Z]{3}$/)
    .withMessage("Currency must be 3 uppercase letters"),

  body("accountInfo")
    .matches(/^[0-9]+$/)
    .withMessage("Account must be numeric"),

  body("swiftCode")
    .matches(/^[A-Z0-9]{8,11}$/)
    .withMessage("Invalid SWIFT code"),
];

// middleware to check errors
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = {
  registerValidation,
  paymentValidation,
  validate,
};
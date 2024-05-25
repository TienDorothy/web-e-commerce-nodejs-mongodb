const express = require("express");
const { body } = require("express-validator");

const router = express.Router();
const authController = require("../controllers/authController");
const User = require("../models/User");
const { isAuth } = require("../middleware/isAuth");

// router

router.post("/register", validateRegister(), authController.registerUser);
router.post("/login", validateLogin(), authController.login);
router.post("/logout", validateLogout(), authController.logout);
router.post("/test", authController.test);

module.exports = router;

// validate
function validateRegister() {
  return [
    body("fullName").trim().notEmpty(),
    body("password").trim().isLength({ min: 5 }),
    body("phone")
      .trim()
      .notEmpty({ min: 10 })
      .custom(async (value) => {
        if (!/^\d+$/.test(value)) {
          throw new Error("Phone number must contain only digits");
        }
        const existingUser = await User.findOne({ phone: value });
        if (existingUser) {
          throw new Error("Phone number already in use");
        }
      }),
    body("address").trim().notEmpty(),
    // body("role").trim().notEmpty().isIn(["admin", "client", "assistant"]),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
          throw new Error("Email already in use");
        }
      })

      .normalizeEmail(),
  ];
}

function validateLogin() {
  return [
    body("password").trim().isLength({ min: 5 }),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (!user) {
          throw new Error("Email is not exits");
        }
      })
      .normalizeEmail(),
  ];
}

function validateLogout() {
  return [
    body("userId").custom(async (value) => {
      const user = await User.findOne({ _id: value });
      if (!user) {
        throw new Error("Email is not exits");
      }
    }),
  ];
}

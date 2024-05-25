const express = require("express");
const router = express.Router();

const { body } = require("express-validator");
const { default: mongoose } = require("mongoose");

const orderController = require("../controllers/orderController");
const { isAuth, isAdmin, isUser } = require("../middleware/isAuth");
const User = require("../models/User");

router.get("/orders", isAdmin, orderController.getAll);
router.get("/order/:orderId", isAdmin, orderController.getById);
router.get("/order-user/:userId", isUser, orderController.getByUserId);
router.post("/create", isAuth, validateCreate(), orderController.create);
router.put(
  "/update/:orderId",
  isUser,
  validateUpdate(),
  orderController.update
);
router.delete("/delete/:orderId", isAdmin, orderController.delete);
router.post("/cancel/:orderId", isUser, orderController.cancel);

module.exports = router;

function validateCreate() {
  return [
    body("userId").custom(async (value) => {
      const user = await User.findById(value)
      if (!user) {
        throw new Error('Not found user')
      }
    }),
    body("cart").isArray().withMessage("Cart must be an array"),
    body("cart.*.product").custom(async (value) => {
      isMongooseObjectId(value, "productId");
    }),
    body("cart.*.quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be an integer greater than 0"),
  ];
}

function validateUpdate() {
  return [
    body("cart").isArray().withMessage("cart must be an array"),
    body("cart.*.product.").custom(async (value) => {
      isMongooseObjectId(value, "productId");
    }),
    body("cart.*.quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be an integer greater than 0"),
  ];
}

function isMongooseObjectId(value, nameValue) {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new Error(`${nameValue} is not ObjectId`);
  }

  return true;
}

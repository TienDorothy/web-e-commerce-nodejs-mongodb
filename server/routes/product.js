const express = require("express");
const router = express.Router();

const { body } = require("express-validator");
const productController = require("../controllers/productController");
const { uploadAny, uploadMultiple } = require("../middleware/multer");
const { isAuth, isAdmin } = require("../middleware/isAuth");
const Product = require("../models/Product");

router.get("/products", productController.getAll);
router.get("/product/:productId", productController.getById);

// login
router.post(
  "/create",
  isAuth,
  uploadMultiple, // phan tich req.file
  validateCreate(),
  productController.create
);

// admin
router.put(
  "/update/:productId",
  isAdmin,
  uploadAny,
  validateUpdate(),
  productController.update
);

router.put(
  "/update-img/:productId",
  isAdmin,
  uploadMultiple,
  validateUpdate(),
  productController.updateWithImg
);
router.delete("/delete/:productId", isAdmin, productController.delete);

module.exports = router;

// validate
function validateCreate() {
  return [
    body("name")
      .trim()
      .notEmpty()
      .custom(async (value) => {
        const prod = await Product.findOne({ name: value });
        if (prod) {
          throw new Error("Name product already in use");
        }
      }),
    body("category")
      .trim()
      .notEmpty()
      .isIn(["iphone", "ipad", "watch", "airpod"]),

    // body("img1").custom(validateImg),
    // body("img2").custom(validateImg),
    // body("img3").custom(validateImg),
    // body("img4").custom(validateImg),

    body("long_desc").trim().notEmpty(),
    body("short_desc").trim().notEmpty(),
    body("price").isInt({ min: 0 }),
    body("stock").isInt({ min: 0 }),
  ];
}
function validateUpdate() {
  return [
    body("name").trim().notEmpty(),
    body("category")
      .trim()
      .notEmpty()
      .isIn(["iphone", "ipad", "watch", "airpod"]),
    body("image").custom(validateUrlImg),
    body("long_desc").trim().notEmpty(),
    body("short_desc").trim().notEmpty(),
    body("price").isInt({ min: 0 }),
    body("stock").isInt({ min: 0 }),
  ];
}
function validateImg(value, { req }) {
  if (!req.file || !req.file.mimetype.startsWith("image/")) {
    throw new Error("Invalid image file");
  }
  return true;
}

function validateUrl(value) {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  if (!urlRegex.test(value)) {
    throw new Error("Invalid URL");
  }

  return true;
}
function validateUrlImg(values) {
  if (!Array.isArray(values)) {
    throw new Error("Images must be an array");
  }
  for (let i = 0; i < values.length; i++) {
    const image = values[i];
    validateUrl(image);
  }
  return true;
}

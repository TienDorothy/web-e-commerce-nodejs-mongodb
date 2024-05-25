const path = require("path");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { throwNotFoundError, validateError } = require("../middleware/error");
const { uploadImages, deleteImageUrls } = require("./uploadImgController");

exports.getAll = async (req, res, next) => {
  try {
    const products = await Product.find({});
    return res.status(200).json({ products });
  } catch (error) {}
};

exports.getById = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throwNotFoundError("Not found product by Id");
    }

    return res.status(200).json({ product });
  } catch (error) {
    next(error); //throw err to middleware
  }
};

exports.create = async (req, res, next) => {
  try {
    await validateError(req, res, next);
    const { name, category, long_desc, short_desc, price, stock } = req.body;
    const images = req.files;

    // Upload multiple images to Firebase
    const imagesUrl = await uploadImages({ images: images }, "multiple", name);
    const [img1, img2, img3, img4] = imagesUrl;

    const product = new Product({
      name,
      category,
      long_desc,
      short_desc,
      price,
      stock,
      img1,
      img2,
      img3,
      img4,
    });
    await product.save();
    return res.status(201).json({
      message: "Create new product",
      product: product,
    });
    //  return res.json({ok:"ok"})
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    let product = await Product.findById(productId);

    if (!product) {
      throwNotFoundError("Not found product by Id");
    }
    await validateError(req, res, next);

    const { name, category, long_desc, short_desc, price, stock, image } =
      req.body;
    const [img1, img2, img3, img4] = image;

    let oldPrice = product.price;
    let priceDiff = price - oldPrice;

    product.name = name;
    product.category = category;
    product.long_desc = long_desc;
    product.short_desc = short_desc;
    product.price = price;
    product.stock = stock;
    product.img1 = img1;
    product.img2 = img2;
    product.img3 = img3;
    product.img4 = img4;

    if (priceDiff !== 0) {
      const orders = await Order.find({ "products.productId": product._id });
      if (orders.length !== 0) {
        await updateTotalOrderWithProduct(orders, productId, priceDiff);
      }
    }

    await product.save();
    return res.status(200).json({ product });
  } catch (error) {
    next(error); //throw err to middleware
  }
};
exports.updateWithImg = async (req, res, next) => {
  const productId = req.params.productId;
  const { name, category, long_desc, short_desc, price, stock } = req.body;
  const images = req.files;
  try {
    let product = await Product.findById(productId);

    if (!product) {
      throwNotFoundError("Not found product by Id");
    }
    // await validateError(req, res, next);

    product.name = name;
    product.category = category;
    product.long_desc = long_desc;
    product.short_desc = short_desc;
    product.price = price;
    product.stock = stock;

    //   Upload multiple images to Firebase
    const imagesUrl = await uploadImages({ images: images }, "multiple", name);
    const [img1, img2, img3, img4] = imagesUrl;
    // delete oldImgUrls
    await deleteImageUrls(product);

    //  update new imgs
    product.img1 = img1;
    product.img2 = img2;
    product.img3 = img3;
    product.img4 = img4;

    let oldPrice = product.price;
    let priceDiff = price - oldPrice;

    if (priceDiff !== 0) {
      const orders = await Order.find({ "products.productId": product._id });
      if (orders.length !== 0) {
        await updateTotalOrderWithProduct(orders, productId, priceDiff);
      }
    }

    await product.save();

    return res.status(200).json({ product });
  } catch (error) {
    next(error); //throw err to middleware
  }
};

exports.delete = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    let product = await Product.findById(productId);
    if (!product) {
      throwNotFoundError("Not found product by Id");
    }

    await deleteImageUrls(product);
    await product.deleteOne();

    return res.status(200).json({ message: "Delete product is success" });
  } catch (error) {}
};

// METHOD
async function updateTotalOrderWithProduct(orders, productId, priceDiff) {
  for (const order of orders) {
    let total = order.total;

    let findProduct = order.products.find(
      (prod) => prod.productId.toString() === productId.toString()
    );

    let quantity = findProduct.quantity;

    total += priceDiff * quantity;
    order.total = total;
    await order.save();
  }
}

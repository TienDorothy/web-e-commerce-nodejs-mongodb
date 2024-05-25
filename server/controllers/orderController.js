const {
  throwNotFoundError,
  validateError,
  throwInsufficientStockError,
  throwNewError,
  throwAuthAccessError,
} = require("../middleware/error");

const Order = require("../models/Order");
const User = require("../models/User");
const Product = require("../models/Product");
const sendEmail = require("../middleware/nodemailer");

exports.getAll = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate([
      { path: "userId", select: "_id fullName phone address" },
      { path: "products.product" },
    ]);
    return res.status(200).json({ orders });
  } catch (error) {}
};

exports.getById = async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    // const order = await Order.findById(orderId);
    const order = await Order.findById(orderId).populate([
      { path: "userId", select: "_id fullName phone address" },
      { path: "products.product" },
    ]);

    if (!order) {
      throwNotFoundError("Not found order by Id");
    }

    return res.status(200).json({ order });
  } catch (error) {
    next(error); //throw err to middleware
  }
};
exports.getByUserId = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const orders = await Order.find({ userId: userId }).populate([
      { path: "userId", select: "_id fullName phone address" },
      { path: "products.product", select: "_id name img1 price" },
    ]);

    if (!orders) {
      throwNotFoundError("Not found order by userId");
    }
    return res.status(200).json({
      status: "ok",
      orders: orders,
    });
  } catch (error) {
    next(error); //throw err to middleware
  }
};
exports.create = async (req, res, next) => {
  try {
    await validateError(req, res, next);
    const { userId, cart } = req.body;

    const user = await User.findById(userId);

    await checkAndUpdateProduct(cart);
    let total = await calculateTotal(cart);

    const order = Order({
      userId: userId,
      products: cart,
      total: total,
    });
    await order.save();
    // update cart user
    user.cart = [];
    await user.save();

    //  send Email
    const productsInfo = await Order.findById(order._id).populate(
      "products.product"
    );

    const productsSendEmail = productsInfo.products;
    await sendEmail(user, productsSendEmail, total);
    return res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId);
    checkOrder(order);
    checkUserAccess(order, req);

    // Validate request data
    await validateError(req, res, next);

    // Get list of products from the database and from the request
    const productsDB = order.products;
    const productsReq = req.body.products;

    /*
      Loop through each product in the request
    */
    for (const prodReq of productsReq) {
      // Find the product in the database based on productId
      let product = await Product.findById(prodReq.productId);
      let stock = product.stock;

      if (!product) {
        throwNotFoundError(`Product not found: ${prodReq.productId}`);
      }

      // Find the product in the order's product list
      let prodDB = productsDB.find(
        ({ productId }) => productId.toString() === prodReq.productId.toString()
      );

      /*
      If the product does not exist in the previous order 
      - handle like new product
      - check stock  and update product
      */
      if (!prodDB) {
        if (prodReq.quantity > stock) {
          throwInsufficientStockError(prodReq.productId);
        }
        product.stock = stock - prodReq.quantity;
        await product.save();
        continue;
      }

      /*
      update new quantity and stock with old product
      */
      let newQuantity = prodReq.quantity;
      let oldQuantity = prodDB.quantity;

      // increase quantity
      if (newQuantity > oldQuantity) {
        const increaseAmount = newQuantity - oldQuantity;
        stock -=
          stock < increaseAmount
            ? throwInsufficientStockError(prodReq.productId)
            : increaseAmount;
      }

      // decrease quantity
      if (newQuantity < oldQuantity) {
        stock += oldQuantity - newQuantity;
      }

      //update product
      product.stock = stock;
      await product.save();
    }

    //update order
    order.products = productsReq;
    order.total = await calculateTotal(productsReq);
    await order.save();

    return res.status(201).json({
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    next(error); //throw err to middleware
  }
};

exports.delete = async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    let order = await Order.findById(orderId);
    checkOrder(order);
    checkUserAccess(order, req);
    await order.deleteOne();
    return res.status(200).json({
      message: `Order Id - ${orderId} is delete success.`,
    });
  } catch (error) {
    next(error); //throw err to middleware
  }
};

exports.cancel = async (req, res, next) => {
  const orderId = req.params.orderId;

  try {
    let order = await Order.findById(orderId);
    checkOrder(order);
    checkUserAccess(order, req);

    order.status = Order.orderStatusCancel;
    await order.save();
    return res.status(200).json({
      message: `Order Id - ${orderId} is cancel success.`,
    });
  } catch (error) {}
};

////////////////////////////////////////
// methods
async function calculateTotal(products) {
  let total = 0;
  for (const item of products) {
    let product = await Product.findById(item.product);
    if (!product || !product.price) {
      throwNewError(
        400,
        `Product with ID ${item.product} not found or price not available.`
      );
    }

    total += product.price * item.quantity;
  }

  return total;
}

async function checkAndUpdateProduct(products) {
  for (let i = 0; i < products.length; i++) {
    let item = products[i];
    const product = await Product.findById(item.product);
    if (!product) {
      products.splice(i, 1);
      i--;
      continue;
    }

    if (product.stock < item.quantity) {
      throwInsufficientStockError(product._id);
    }

    product.stock -= item.quantity;

    await product.save();
  }
}

function checkOrder(order) {
  if (!order) {
    throwNotFoundError("Not found order.");
  }
  if (order.status === Order.orderStatusCancel) {
    throwNotFoundError("Order is cancelled");
  }
}
function checkUserAccess(order, req) {
  if (order.userId.toString() !== req.session.user.userId) {
    throwAuthAccessError();
  }
}

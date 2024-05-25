const { validationResult } = require("express-validator");

exports.validateError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('errors :>> ', errors);
    const arrayErr = errors.array()
    const err = new Error(arrayErr[0].msg);
    err.status = 422;
    err.data = arrayErr;
    throw err;
  }

};

exports.throwNewError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  throw err;
};

exports.throwAuthError = () => {
  const err = new Error("Not authenticated");
  err.status = 401;
  throw err;
};

exports.throwAuthAccessError = () => {
  const err = new Error("You're not allowed to do that!");
  err.status = 403;
  throw err;
};
exports.throwNotFoundError = (message) => {
  const err = new Error(message);
  err.status = 404;
  throw err;
};

exports.throwInsufficientStockError = (productId) => {
  const err = new Error(`Insufficient stock for product ${productId}`);
  err.status = 422;
  throw err;
};

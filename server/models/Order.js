const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const orderStatus = ["pay", "confirmed", "cancelled"];

const orderSchema = new Schema(
  {
    userId: { type: Types.ObjectId, require: true, ref: "User" },
    products: [
      {
        product: { type: Types.ObjectId, ref: "Product", require: true },
        quantity: { type: Number, require: true },
      },
    ],
    delivery: { type: String, default: "processing" },
    status: { type: String, enum: orderStatus, default: "pay" },
    total: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
module.exports.orderStatusCancel = 'cancelled';
module.exports.orderStatusNew = 'pay';
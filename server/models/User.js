const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const userSchema = new Schema({
  fullName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  phone: { type: String, require: true, unique: true },
  address: { type: String, require: true },
  role: {
    type: String,
    require: true,
    default: "client",
    enum: ["admin", "client", "assistant"],
  },
  cart: {
    type: [
      {
        product: { type: Types.ObjectId, ref: "Product", require: true },
        quantity: { type: Number, require: true },
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("User", userSchema);

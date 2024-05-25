const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const categoryProduct = ["iphone", "ipad", "watch", "airpod"];

const productSchema = new Schema({
  name: { type: String, require: true , unique:true},
  category: {
    type: String,
    require: true,
    enum: categoryProduct,
  },
  img1: { type: String },
  img2: { type: String },
  img3: { type: String },
  img4: { type: String },
  long_desc: { type: String, require: true },
  short_desc: { type: String, require: true },

  price: {
    type: Number,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
module.exports.categoryProduct = categoryProduct;

const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

const sessionSchema = new Schema(
  {
    expires: Date,
    session: {
      cookie: Object,
      isAuth: Boolean,
      userId: { type: Types.ObjectId, ref: "User" },
      role: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);

const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      min: 4,
      max: 50,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
        type: String,
        enum: ["reader", "author", "admin"],
        default: "reader",
    },
  },
  { timestamps: true },
);

const User = model('user', userSchema);

module.exports = User;
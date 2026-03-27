const { Schema, model } = require("mongoose");

const articleSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 255,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    sub_content: {
      type: String,
      maxLength: 500,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "draft",
    },
  },
  { timestamps: true }
);

const Article = model("article", articleSchema);

module.exports = Article;
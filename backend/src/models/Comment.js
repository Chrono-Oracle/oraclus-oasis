const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    article: {
      type: Schema.Types.ObjectId,
      ref: "article",
      required: true,
    },
    reader: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxLength: 2000,
    },
  },
  { timestamps: true }
);

const Comment = model("comment", commentSchema);

module.exports = Comment;
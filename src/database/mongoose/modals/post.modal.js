const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: { type: String, required: true, minLength: 5 },
    content: String,
    status: { type: String, enum: ["draft", "published"], default: "draft" },
  },
  { timestamps: true },
);

const postModal = model("users", postSchema);
module.exports = { postModal };

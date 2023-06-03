const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      require: [true, "category is required"],
    },
    title: {
      type: String,
      require: [true, "title is required"],
    },
    displayContent: {
      type: String,
      required: [true, "displayContent is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    image: {
      type: String,
      required: [true, "image is required"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      require: [true, "user id is required"],
    },
  },
  { timestamps: true }
);

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;

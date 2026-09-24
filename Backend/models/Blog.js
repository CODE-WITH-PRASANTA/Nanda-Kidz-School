const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
      trim: true,
    },

    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    image: {
      type: String,
      required: [true, "Featured image is required"],
      trim: true,
    },

    excerpt: {
      type: String,
      maxlength: [200, "Excerpt cannot exceed 200 characters"],
      default: "",
      trim: true,
    },

    content: {
      type: String,
      required: [true, "Blog content is required"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },

    author: {
      type: String,
      default: "Admin",
      trim: true,
    },

    publishDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["Published", "Draft"],
      default: "Published",
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Video title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["published", "draft"],
      default: "published",
    },
    duration: {
      type: Number,
      default: 0,
    },
    sizeMB: {
      type: Number,
      default: 0,
    },
    videoUrl: {
      type: String,
      required: [true, "Video file path is required"],
    },
    thumbnailUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Video", videoSchema);
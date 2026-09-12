const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [
        true,
        "Please enter an image title",
      ],
      trim: true,
    },

    image: {
      type: String,
      required: [
        true,
        "Please provide an image URL or upload file",
      ],
      trim: true,
    },

    uploadedOn: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Gallery",
  gallerySchema
);
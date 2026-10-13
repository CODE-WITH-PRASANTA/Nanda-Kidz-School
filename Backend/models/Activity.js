
const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Activity title is required"],
      trim: true,
      maxlength: 100,
    },

    category: {
      type: String,
      required: [true, "Activity category is required"],
      trim: true,
      maxlength: 50,
    },

    description: {
      type: String,
      required: [true, "Activity description is required"],
      trim: true,
      maxlength: 240,
    },

    images: {
      type: [String],
      required: true,
      validate: {
        validator: (images) =>
          Array.isArray(images) &&
          images.length >= 1 &&
          images.length <= 10,
        message: "An activity must have between 1 and 10 images.",
      },
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Activity", activitySchema);

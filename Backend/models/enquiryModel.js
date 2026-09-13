const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Child's name is required."],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required."],
      trim: true,
    },
    age: {
      type: String,
      required: [true, "Child's age is required."],
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Enquiry", enquirySchema);
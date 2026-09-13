const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    designation: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      default: "Teacher",
    },

    status: {
      type: String,
      default: "Active",
    },

    bio: {
      type: String,
      default: "",
    },

    fb: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    twitter: {
      type: String,
      default: "",
    },

    instagram: {
      type: String,
      default: "",
    },

    // ==========================================
    // IMPORTANT
    // ==========================================
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Teacher", teacherSchema);
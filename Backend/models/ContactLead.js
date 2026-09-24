const mongoose = require("mongoose");

const contactLeadSchema = new mongoose.Schema(
  {
    // ==========================================
    // BASIC CONTACT INFORMATION
    // ==========================================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    surname: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    // ==========================================
    // PARENT ENQUIRY FIELDS
    // ==========================================

    childAge: {
      type: String,
      default: "",
      trim: true,
    },

    city: {
      type: String,
      default: "",
      trim: true,
    },

    // ==========================================
    // HOME CONTACT FIELD
    // ==========================================

    subject: {
      type: String,
      default: "",
      trim: true,
    },

    // ==========================================
    // MESSAGE
    // ==========================================

    message: {
      type: String,
      required: true,
      trim: true,
    },

    // ==========================================
    // SOURCE
    // ==========================================

    source: {
      type: String,
      enum: [
        "Home Contact",
        "Parent Enquiry",
      ],
      default: "Home Contact",
    },

    // ==========================================
    // LEAD STATUS
    // ==========================================

    status: {
      type: String,
      enum: [
        "New",
        "Contacted",
        "Interested",
        "Not Interested",
        "Converted",
      ],
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ContactLead",
  contactLeadSchema
);
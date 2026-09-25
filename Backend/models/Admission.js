const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    originalName: {
      type: String,
      default: "",
    },

    fileName: {
      type: String,
      default: "",
    },

    url: {
      type: String,
      default: "",
    },

    mimeType: {
      type: String,
      default: "",
    },

    size: {
      type: Number,
      default: 0,
    },
  },
  {
    _id: false,
  }
);

const admissionSchema = new mongoose.Schema(
  {
    // ================= STUDENT DETAILS =================

    studentName: {
      type: String,
      required: true,
      trim: true,
    },

    dob: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    bloodGroup: {
      type: String,
      default: "",
    },

    aadhaar: {
      type: String,
      default: "",
    },

    nationality: {
      type: String,
      default: "Indian",
    },

    religion: {
      type: String,
      default: "",
    },

    caste: {
      type: String,
      default: "",
    },

    specialNeeds: {
      type: String,
      default: "",
    },

    // ================= PARENT DETAILS =================

    fatherName: {
      type: String,
      required: true,
      trim: true,
    },

    motherName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    altMobile: {
      type: String,
      default: "",
    },

    occupation: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },

    parentStatus: {
      type: String,
      default: "Father",
    },

    annualIncome: {
      type: String,
      default: "",
    },

    // ================= TRANSPORT =================

    transportRequired: {
      type: String,
      default: "No",
    },

    pickupLocation: {
      type: String,
      default: "",
    },

    dropLocation: {
      type: String,
      default: "",
    },

    routeBus: {
      type: String,
      default: "",
    },

    pickupTime: {
      type: String,
      default: "",
    },

    dropTime: {
      type: String,
      default: "",
    },

    // ================= ADMISSION =================

    admissionClass: {
      type: String,
      required: true,
    },

    session: {
      type: String,
      required: true,
    },

    medium: {
      type: String,
      default: "English",
    },

    admissionDate: {
      type: String,
      required: true,
    },

    previousSchool: {
      type: String,
      default: "",
    },

    lastClassCompleted: {
      type: String,
      default: "",
    },

    // ================= STATUS =================

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    // ================= DOCUMENTS =================

    documents: {
      birthCertificate: {
        type: documentSchema,
        default: null,
      },

      aadhaarCard: {
        type: documentSchema,
        default: null,
      },

      addressProof: {
        type: documentSchema,
        default: null,
      },

      passportPhoto: {
        type: documentSchema,
        default: null,
      },

      previousTc: {
        type: documentSchema,
        default: null,
      },
    },
  },

  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Admission ||
  mongoose.model("Admission", admissionSchema);
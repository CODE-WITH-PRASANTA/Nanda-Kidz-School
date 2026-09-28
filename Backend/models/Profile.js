const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    travelStyle: { type: String, default: "Solo Backpacker" },
    baseLocation: { type: String, default: "Not Specified" },
    bio: { type: String, default: "" },
    avatar: { type: String, default: "" },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
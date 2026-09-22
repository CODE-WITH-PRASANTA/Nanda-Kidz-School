const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: [true, 'Announcement heading is required'],
      trim: true,
      maxlength: [100, 'Heading cannot exceed 100 characters'],
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt dates
  }
);

module.exports = mongoose.model('Announcement', announcementSchema);
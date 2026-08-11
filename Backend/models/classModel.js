const mongoose = require('mongoose');

const classSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Class name is required'],
      trim: true,
    },
    code: {
      type: String,
      required: [true, 'Class code is required'],
      trim: true,
    },
    section: {
      type: String,
      required: [true, 'Section is required'],
      default: 'A',
    },
    teacher: {
      type: String,
      default: '--',
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Class', classSchema);
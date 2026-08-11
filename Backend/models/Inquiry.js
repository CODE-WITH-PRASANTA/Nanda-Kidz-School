const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  sr: { type: Number, unique: true },
  enqDate: { type: String, required: true },
  parentName: { type: String, required: true },
  babyName: { type: String, required: true },
  age: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  transport: { type: String, required: true },
  status: { type: String, required: true, default: 'New' },
  email: { type: String },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);
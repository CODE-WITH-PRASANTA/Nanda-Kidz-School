const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  className: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Subject', SubjectSchema);
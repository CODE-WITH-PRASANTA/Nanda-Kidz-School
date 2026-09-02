const SubjectModel = require('../models/SubjectModel');

// Get all subjects
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await SubjectModel.find().sort({ createdAt: -1 });
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a subject
exports.createSubject = async (req, res) => {
  try {
    const newSubject = new SubjectModel(req.body);
    const savedSubject = await newSubject.save();
    res.status(201).json(savedSubject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a subject
exports.updateSubject = async (req, res) => {
  try {
    const updatedSubject = await SubjectModel.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json(updatedSubject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update subject status (PATCH)
exports.updateSubjectStatus = async (req, res) => {
  try {
    const updatedSubject = await SubjectModel.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status }, 
      { new: true }
    );
    res.json(updatedSubject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a subject
exports.deleteSubject = async (req, res) => {
  try {
    await SubjectModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Subject deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
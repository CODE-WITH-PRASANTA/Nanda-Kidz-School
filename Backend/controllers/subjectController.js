const Subject = require('../models/Subject');

// @desc    Get all subjects
// @route   GET /api/subjects
// @access  Public
const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ createdAt: -1 });
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching subjects', error: error.message });
  }
};

// @desc    Create a new subject
// @route   POST /api/subjects
// @access  Public
const createSubject = async (req, res) => {
  try {
    const { name, code, className, description, status } = req.body;

    if (!name || !code || !className) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const existingCode = await Subject.findOne({ code: code.trim().toUpperCase() });
    if (existingCode) {
      return res.status(400).json({ message: 'Subject code already exists' });
    }

    const newSubject = await Subject.create({
      name,
      code,
      className,
      description,
      status: status || 'Active',
    });

    res.status(201).json(newSubject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating subject', error: error.message });
  }
};

// @desc    Update a subject
// @route   PUT /api/subjects/:id
// @access  Public
const updateSubject = async (req, res) => {
  try {
    const { name, code, className, description, status } = req.body;
    const { id } = req.params;

    const subject = await Subject.findById(id);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    // Check code uniqueness if code changed
    if (code && code.trim().toUpperCase() !== subject.code) {
      const codeExists = await Subject.findOne({ code: code.trim().toUpperCase() });
      if (codeExists) {
        return res.status(400).json({ message: 'Subject code already exists' });
      }
    }

    subject.name = name || subject.name;
    subject.code = code ? code.toUpperCase() : subject.code;
    subject.className = className || subject.className;
    subject.description = description !== undefined ? description : subject.description;
    subject.status = status || subject.status;

    const updatedSubject = await subject.save();
    res.status(200).json(updatedSubject);
  } catch (error) {
    res.status(500).json({ message: 'Error updating subject', error: error.message });
  }
};

// @desc    Delete a subject
// @route   DELETE /api/subjects/:id
// @access  Public
const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findByIdAndDelete(id);

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.status(200).json({ message: 'Subject deleted successfully', id });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subject', error: error.message });
  }
};

// @desc    Update subject status only
// @route   PATCH /api/subjects/:id/status
// @access  Public
const updateSubjectStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Active', 'Inactive'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const subject = await Subject.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error: error.message });
  }
};

module.exports = {
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  updateSubjectStatus,
};
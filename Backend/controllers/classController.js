const Class = require('../models/classModel');

// @desc    Get all classes
// @route   GET /api/classes
const getClasses = async (req, res) => {
  try {
    const classes = await Class.find().sort({ createdAt: -1 });
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching classes', error: error.message });
  }
};

// @desc    Create a new class
// @route   POST /api/classes
const createClass = async (req, res) => {
  try {
    const { name, code, section, teacher, status } = req.body;

    if (!name || !code) {
      return res.status(400).json({ message: 'Please provide name and code' });
    }

    const newClass = await Class.create({
      name,
      code,
      section: section || 'A',
      teacher: teacher || '--',
      status: status || 'Active',
    });

    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: 'Error creating class', error: error.message });
  }
};

// @desc    Update a class
// @route   PUT /api/classes/:id
const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, section, teacher, status } = req.body;

    const existingClass = await Class.findById(id);
    if (!existingClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    const updatedClass = await Class.findByIdAndUpdate(
      id,
      {
        name,
        code,
        section,
        teacher: teacher || '--',
        status,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: 'Error updating class', error: error.message });
  }
};

// @desc    Delete a class
// @route   DELETE /api/classes/:id
const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    const existingClass = await Class.findById(id);
    if (!existingClass) {
      return res.status(404).json({ message: 'Class not found' });
    }

    await Class.findByIdAndDelete(id);
    res.status(200).json({ id, message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting class', error: error.message });
  }
};

module.exports = {
  getClasses,
  createClass,
  updateClass,
  deleteClass,
};
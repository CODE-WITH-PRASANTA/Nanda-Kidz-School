const ClassModel = require('../models/ClassModel');

// Get all classes
exports.getClasses = async (req, res) => {
  try {
    const classes = await ClassModel.find().sort({ createdAt: -1 });
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a class
exports.createClass = async (req, res) => {
  try {
    const newClass = new ClassModel(req.body);
    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a class
exports.updateClass = async (req, res) => {
  try {
    const updatedClass = await ClassModel.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json(updatedClass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a class
exports.deleteClass = async (req, res) => {
  try {
    await ClassModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Class deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const Inquiry = require('../models/Inquiry');

// Get all inquiries
exports.getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ sr: -1 });
    res.status(200).json(inquiries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new inquiry
exports.createInquiry = async (req, res) => {
  try {
    const lastInquiry = await Inquiry.findOne().sort({ sr: -1 });
    const nextSr = lastInquiry ? lastInquiry.sr + 1 : 1;

    const newInquiry = new Inquiry({
      ...req.body,
      sr: nextSr
    });

    const savedInquiry = await newInquiry.save();
    res.status(201).json(savedInquiry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update inquiry
exports.updateInquiry = async (req, res) => {
  try {
    const updatedInquiry = await Inquiry.findOneAndUpdate(
      { sr: req.params.sr },
      req.body,
      { new: true }
    );
    if (!updatedInquiry) return res.status(404).json({ error: 'Inquiry not found' });
    res.status(200).json(updatedInquiry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete inquiry
exports.deleteInquiry = async (req, res) => {
  try {
    const deletedInquiry = await Inquiry.findOneAndDelete({ sr: req.params.sr });
    if (!deletedInquiry) return res.status(404).json({ error: 'Inquiry not found' });
    res.status(200).json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

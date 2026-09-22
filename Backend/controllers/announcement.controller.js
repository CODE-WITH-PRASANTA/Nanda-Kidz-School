const Announcement = require('../models/Announcement.model');

// @desc    Get all announcements
// @route   GET /api/announcements
// @access  Public / Admin
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: announcements.length,
      data: announcements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

// @desc    Create a new announcement
// @route   POST /api/announcements
// @access  Admin
exports.createAnnouncement = async (req, res) => {
  try {
    const { heading } = req.body;

    if (!heading || !heading.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an announcement heading',
      });
    }

    const announcement = await Announcement.create({
      heading,
      status: 'Active',
    });

    res.status(201).json({
      success: true,
      data: announcement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create announcement',
      error: error.message,
    });
  }
};

// @desc    Update an announcement
// @route   PUT /api/announcements/:id
// @access  Admin
exports.updateAnnouncement = async (req, res) => {
  try {
    const { heading } = req.body;

    let announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found',
      });
    }

    announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      { heading },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: announcement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update announcement',
      error: error.message,
    });
  }
};

// @desc    Delete an announcement
// @route   DELETE /api/announcements/:id
// @access  Admin
exports.deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found',
      });
    }

    await announcement.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
      message: 'Announcement removed successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete announcement',
      error: error.message,
    });
  }
};
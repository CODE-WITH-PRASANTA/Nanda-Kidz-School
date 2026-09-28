const Profile = require("../models/Profile");
const { deleteProcessedImage } = require("../middleware/upload");

// Get all profiles
exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, profiles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create profile
exports.createProfile = async (req, res) => {
  try {
    const { name, email, travelStyle, baseLocation, bio } = req.body;
    const avatar = req.processedFile ? req.processedFile.url : "";

    const newProfile = await Profile.create({
      name,
      email,
      travelStyle,
      baseLocation,
      bio,
      avatar,
    });

    res.status(201).json({ success: true, profile: newProfile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, travelStyle, baseLocation, bio, status } = req.body;

    const existingProfile = await Profile.findById(id);
    if (!existingProfile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    let avatar = existingProfile.avatar;
    if (req.processedFile) {
      if (existingProfile.avatar) {
        deleteProcessedImage(existingProfile.avatar.replace("/uploads/", ""));
      }
      avatar = req.processedFile.url;
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      id,
      { name, email, travelStyle, baseLocation, bio, status, avatar },
      { new: true }
    );

    res.status(200).json({ success: true, profile: updatedProfile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle status
exports.toggleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    profile.status = profile.status === "Active" ? "Inactive" : "Active";
    await profile.save();

    res.status(200).json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete profile
exports.deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    if (profile.avatar) {
      deleteProcessedImage(profile.avatar.replace("/uploads/", ""));
    }

    await Profile.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
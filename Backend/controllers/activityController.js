
const path = require("path");
const Activity = require("../models/Activity");
const {
  deleteProcessedImage,
} = require("../middleware/upload");

const getImagePath = (file) => {
  return file?.url || file?.path || "";
};

const deleteImageFiles = (imagePaths = []) => {
  imagePaths.forEach((imagePath) => {
    if (!imagePath) return;

    // Only pass the filename to the existing upload helper.
    deleteProcessedImage(path.basename(imagePath));
  });
};

const getNewImagePaths = (req) =>
  (req.processedFiles || [])
    .map(getImagePath)
    .filter(Boolean);

const sendError = (res, error, message) => {
  console.error(message, error);

  return res.status(500).json({
    success: false,
    message,
  });
};

// GET /api/activities
exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: activities.length,
      data: activities,
    });
  } catch (error) {
    return sendError(res, error, "Failed to fetch activities.");
  }
};

// GET /api/activities/:id
exports.getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: activity,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid activity ID.",
      });
    }

    return sendError(res, error, "Failed to fetch activity.");
  }
};

// POST /api/activities
exports.createActivity = async (req, res) => {
  const newImagePaths = getNewImagePaths(req);

  try {
    const { title, category, description, status } = req.body;

    if (
      !title?.trim() ||
      !category?.trim() ||
      !description?.trim()
    ) {
      deleteImageFiles(newImagePaths);

      return res.status(400).json({
        success: false,
        message: "Title, category and description are required.",
      });
    }

    if (newImagePaths.length < 1 || newImagePaths.length > 10) {
      deleteImageFiles(newImagePaths);

      return res.status(400).json({
        success: false,
        message: "Upload between 1 and 10 images.",
      });
    }

    if (status && !["Active", "Inactive"].includes(status)) {
      deleteImageFiles(newImagePaths);

      return res.status(400).json({
        success: false,
        message: "Status must be Active or Inactive.",
      });
    }

    const activity = await Activity.create({
      title: title.trim(),
      category: category.trim(),
      description: description.trim(),
      status: status || "Active",
      images: newImagePaths,
    });

    return res.status(201).json({
      success: true,
      message: "Activity created successfully.",
      data: activity,
    });
  } catch (error) {
    deleteImageFiles(newImagePaths);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return sendError(res, error, "Failed to create activity.");
  }
};

// PUT /api/activities/:id
// existingImages must contain the image paths to retain.
exports.updateActivity = async (req, res) => {
  const newImagePaths = getNewImagePaths(req);

  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      deleteImageFiles(newImagePaths);

      return res.status(404).json({
        success: false,
        message: "Activity not found.",
      });
    }

    const { title, category, description, status } = req.body;

    if (
      !title?.trim() ||
      !category?.trim() ||
      !description?.trim()
    ) {
      deleteImageFiles(newImagePaths);

      return res.status(400).json({
        success: false,
        message: "Title, category and description are required.",
      });
    }

    if (status && !["Active", "Inactive"].includes(status)) {
      deleteImageFiles(newImagePaths);

      return res.status(400).json({
        success: false,
        message: "Status must be Active or Inactive.",
      });
    }

    let existingImages;

    try {
      existingImages = JSON.parse(req.body.existingImages || "[]");
    } catch {
      deleteImageFiles(newImagePaths);

      return res.status(400).json({
        success: false,
        message: "Invalid existingImages data.",
      });
    }

    if (!Array.isArray(existingImages)) {
      deleteImageFiles(newImagePaths);

      return res.status(400).json({
        success: false,
        message: "existingImages must be an array.",
      });
    }

    // Only permit image paths already belonging to this activity.
    const previousImages = activity.images || [];
    const retainedImages = [
      ...new Set(
        existingImages.filter((imagePath) =>
          typeof imagePath === "string" &&
          previousImages.includes(imagePath)
        )
      ),
    ];

    const finalImages = [...retainedImages, ...newImagePaths];

    if (finalImages.length < 1 || finalImages.length > 10) {
      deleteImageFiles(newImagePaths);

      return res.status(400).json({
        success: false,
        message: "An activity must have between 1 and 10 images.",
      });
    }

    activity.title = title.trim();
    activity.category = category.trim();
    activity.description = description.trim();
    activity.status = status || activity.status;
    activity.images = finalImages;

    // Save first. Delete removed files only after a successful save.
    await activity.save();

    const removedImages = previousImages.filter(
      (imagePath) => !finalImages.includes(imagePath)
    );

    deleteImageFiles(removedImages);

    return res.status(200).json({
      success: true,
      message: "Activity updated successfully.",
      data: activity,
    });
  } catch (error) {
    deleteImageFiles(newImagePaths);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid activity ID.",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return sendError(res, error, "Failed to update activity.");
  }
};

// DELETE /api/activities/:id
exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found.",
      });
    }

    await activity.deleteOne();

    // Delete files after the database record is deleted.
    deleteImageFiles(activity.images || []);

    return res.status(200).json({
      success: true,
      message: "Activity deleted successfully.",
      data: activity,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid activity ID.",
      });
    }

    return sendError(res, error, "Failed to delete activity.");
  }
};

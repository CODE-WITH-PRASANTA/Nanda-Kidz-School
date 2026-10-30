const Video = require("../models/Video");
const path = require("path");
const fs = require("fs");

const deleteLocalFile = (fileRelPath) => {
  if (!fileRelPath) return;
  const fileName = path.basename(fileRelPath);
  const fullPath = path.join(__dirname, "../uploads", fileName);
  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
    } catch (err) {
      console.error("File deletion error:", err);
    }
  }
};

// 1. GET ALL VIDEOS & STATS
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 });

    const total = videos.length;
    const published = videos.filter((v) => v.status === "published").length;
    const drafts = total - published;
    const storageMB = videos.reduce((acc, v) => acc + (v.sizeMB || 0), 0);

    return res.status(200).json({
      success: true,
      stats: { total, published, drafts, storageMB },
      data: videos,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 2. CREATE NEW VIDEO
exports.createVideo = async (req, res) => {
  try {
    const { title, category, status, duration } = req.body;

    if (!req.files || !req.files.video || !req.files.video[0]) {
      return res.status(400).json({ success: false, message: "Video file is required." });
    }

    const videoFile = req.files.video[0];
    const videoUrl = `/uploads/${videoFile.filename}`;
    const sizeMB = Number((videoFile.size / (1024 * 1024)).toFixed(2));
    const thumbnailUrl = req.processedThumbnail || "";

    const newVideo = await Video.create({
      title,
      category,
      status: status || "published",
      duration: Number(duration) || 0,
      sizeMB,
      videoUrl,
      thumbnailUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Video uploaded successfully",
      data: newVideo,
    });
  } catch (error) {
    // Cleanup if failure happens
    if (req.files?.video?.[0]) deleteLocalFile(req.files.video[0].filename);
    if (req.processedThumbnail) deleteLocalFile(req.processedThumbnail);

    return res.status(500).json({ success: false, message: error.message });
  }
};

// 3. UPDATE VIDEO
exports.updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, status } = req.body;

    const existing = await Video.findById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }

    if (title) existing.title = title;
    if (category) existing.category = category;
    if (status) existing.status = status;

    // If new thumbnail was uploaded
    if (req.processedThumbnail) {
      if (existing.thumbnailUrl) deleteLocalFile(existing.thumbnailUrl);
      existing.thumbnailUrl = req.processedThumbnail;
    }

    await existing.save();

    return res.status(200).json({
      success: true,
      message: "Video updated successfully",
      data: existing,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 4. DELETE VIDEO
exports.deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).json({ success: false, message: "Video not found" });
    }

    deleteLocalFile(video.videoUrl);
    deleteLocalFile(video.thumbnailUrl);

    await Video.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Video deleted successfully",
      id,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
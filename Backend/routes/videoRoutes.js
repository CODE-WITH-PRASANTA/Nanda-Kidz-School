const express = require("express");
const router = express.Router();

const {
  getVideos,
  createVideo,
  updateVideo,
  deleteVideo,
} = require("../controllers/videoController");

// Import from upload.js instead of videoUpload.js
const {
  videoUploadFields,
  convertVideoThumbnailToWebp,
} = require("../middleware/upload");

router.get("/", getVideos);
router.post("/", videoUploadFields, convertVideoThumbnailToWebp, createVideo);
router.put("/:id", videoUploadFields, convertVideoThumbnailToWebp, updateVideo);
router.delete("/:id", deleteVideo);

module.exports = router;
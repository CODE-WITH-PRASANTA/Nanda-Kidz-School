
const express = require("express");

const router = express.Router();

const {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
} = require("../controllers/activityController");

const {
  upload,
  convertMultipleToWebp,
  handleUploadError,
} = require("../middleware/upload");

const setActivityUploadPrefix = (req, res, next) => {
  req.uploadPrefix = "activity";
  next();
};

router.get("/", getActivities);
router.get("/:id", getActivityById);

router.post(
  "/",
  setActivityUploadPrefix,
  upload.array("images", 10),
  convertMultipleToWebp,
  createActivity
);

router.put(
  "/:id",
  setActivityUploadPrefix,
  upload.array("images", 10),
  convertMultipleToWebp,
  updateActivity
);

router.delete("/:id", deleteActivity);

// Keep this after the routes so upload/Sharp errors receive proper responses.
router.use(handleUploadError);

module.exports = router;

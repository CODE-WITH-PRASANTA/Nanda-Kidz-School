const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const { upload, convertSingleToWebp, handleUploadError } = require("../middleware/upload");

// Middleware to set upload prefix
const setProfilePrefix = (req, res, next) => {
  req.uploadPrefix = "profile";
  next();
};

// Check that each controller function exists before passing to router
router.get("/", profileController.getProfiles);

router.post(
  "/",
  setProfilePrefix,
  upload.single("avatar"),
  handleUploadError,
  convertSingleToWebp,
  profileController.createProfile
);

router.put(
  "/:id",
  setProfilePrefix,
  upload.single("avatar"),
  handleUploadError,
  convertSingleToWebp,
  profileController.updateProfile
);

router.patch("/:id/status", profileController.toggleStatus);
router.delete("/:id", profileController.deleteProfile);

module.exports = router; // <-- Must not be omitted or misspelled!
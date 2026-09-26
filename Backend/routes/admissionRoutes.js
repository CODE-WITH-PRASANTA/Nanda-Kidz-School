const express = require("express");

const router = express.Router();

const {
  upload,
  convertMultipleToWebp,
} = require("../middleware/upload");

const {
  createAdmission,
  getAdmissions,
  getAdmission,
  updateAdmission,
  updateAdmissionStatus,
  deleteAdmission,
} = require("../controllers/admissionController");

// ======================================================
// FILE UPLOAD
// ======================================================

const admissionFiles = [
  upload.any(),
  convertMultipleToWebp,
];

// ======================================================
// GET ALL
// ======================================================

router.get(
  "/",
  getAdmissions
);

// ======================================================
// GET SINGLE
// ======================================================

router.get(
  "/:id",
  getAdmission
);

// ======================================================
// CREATE
// ======================================================

router.post(
  "/",
  ...admissionFiles,
  createAdmission
);

// ======================================================
// UPDATE
// ======================================================

router.put(
  "/:id",
  ...admissionFiles,
  updateAdmission
);

// ======================================================
// STATUS
// ======================================================

router.patch(
  "/:id/status",
  updateAdmissionStatus
);

// ======================================================
// DELETE
// ======================================================

router.delete(
  "/:id",
  deleteAdmission
);

module.exports = router;
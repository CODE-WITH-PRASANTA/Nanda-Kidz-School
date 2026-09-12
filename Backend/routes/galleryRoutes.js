const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
  convertSingleToWebp,
} = require("../middleware/upload");

const {
  getGalleries,
  createGallery,
  updateGallery,
  deleteGallery,
} = require("../controllers/galleryController");

/* =========================================================
   GET ALL GALLERY
========================================================= */

router.get(
  "/",
  getGalleries
);

/* =========================================================
   CREATE GALLERY
========================================================= */

router.post(
  "/",
  upload.single("image"),
  convertSingleToWebp,
  createGallery
);

/* =========================================================
   UPDATE GALLERY
========================================================= */

router.put(
  "/:id",
  upload.single("image"),
  convertSingleToWebp,
  updateGallery
);

/* =========================================================
   DELETE GALLERY
========================================================= */

router.delete(
  "/:id",
  deleteGallery
);

module.exports = router;
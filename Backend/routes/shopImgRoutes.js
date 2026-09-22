const express = require("express");

const router = express.Router();

// =====================================================
// CONTROLLER
// =====================================================

const {
  createShopImg,
  getShopImgs,
  getShopImgById,
  updateShopImg,
  deleteShopImg,
} = require("../controllers/shopImgController");

// =====================================================
// UPLOAD MIDDLEWARE
// =====================================================

const {
  upload,
  convertSingleToWebp,
  handleUploadError,
} = require("../middleware/upload");

// =====================================================
// CREATE
// POST /api/shop-images
// =====================================================

router.post(
  "/",
  upload.single("image"),
  convertSingleToWebp,
  createShopImg
);

// =====================================================
// CREATE / UPLOAD ERROR HANDLER
// =====================================================

router.use(handleUploadError);

// =====================================================
// GET ALL
// GET /api/shop-images
// =====================================================

router.get(
  "/",
  getShopImgs
);

// =====================================================
// GET SINGLE
// GET /api/shop-images/:id
// =====================================================

router.get(
  "/:id",
  getShopImgById
);

// =====================================================
// UPDATE
// PUT /api/shop-images/:id
// =====================================================

router.put(
  "/:id",
  upload.single("image"),
  convertSingleToWebp,
  updateShopImg
);

// =====================================================
// DELETE
// DELETE /api/shop-images/:id
// =====================================================

router.delete(
  "/:id",
  deleteShopImg
);

// =====================================================
// EXPORT
// =====================================================

module.exports = router;
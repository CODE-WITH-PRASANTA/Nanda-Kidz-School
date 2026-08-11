const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 1. Storage strategy: Memory Storage (process image in buffer before writing to disk)
const storage = multer.memoryStorage();

// 2. Filter: Allow image types only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (JPEG, PNG, WebP, etc.) are allowed!"), false);
  }
};

// 3. Multer middleware configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB maximum size per file
  },
});

/**
 * Middleware: Convert Single Uploaded Image to WebP
 */
const convertSingleToWebp = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = `image-${uniqueSuffix}.webp`;
    const outputPath = path.join(uploadDir, filename);

    // Convert to WebP using Sharp
    await sharp(req.file.buffer)
      .webp({ quality: 80 }) // Compress to 80% quality
      .toFile(outputPath);

    // Attach processed file metadata to request
    req.processedFile = {
      filename: filename,
      path: `/uploads/${filename}`,
      size: fs.statSync(outputPath).size,
      mimetype: "image/webp",
    };

    next();
  } catch (error) {
    return res.status(500).json({ error: "Single image conversion failed: " + error.message });
  }
};

/**
 * Middleware: Convert Bulk/Multiple Uploaded Images to WebP
 */
const convertMultipleToWebp = async (req, res, next) => {
  if (!req.files || req.files.length === 0) return next();

  try {
    req.processedFiles = [];

    // Process all images concurrently using Promise.all
    await Promise.all(
      req.files.map(async (file, index) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const filename = `bulk-${index + 1}-${uniqueSuffix}.webp`;
        const outputPath = path.join(uploadDir, filename);

        await sharp(file.buffer)
          .webp({ quality: 80 })
          .toFile(outputPath);

        req.processedFiles.push({
          originalName: file.originalname,
          filename: filename,
          path: `/uploads/${filename}`,
          size: fs.statSync(outputPath).size,
          mimetype: "image/webp",
        });
      })
    );

    next();
  } catch (error) {
    return res.status(500).json({ error: "Bulk image conversion failed: " + error.message });
  }
};

module.exports = {
  upload,
  convertSingleToWebp,
  convertMultipleToWebp,
};
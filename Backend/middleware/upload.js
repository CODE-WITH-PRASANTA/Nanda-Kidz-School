
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// =========================================================
// UPLOAD DIRECTORY
// =========================================================

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {
    recursive: true,
  });
}

// =========================================================
// MULTER STORAGE
// =========================================================

const storage = multer.memoryStorage();

// =========================================================
// FILE FILTER
// =========================================================

const fileFilter = (req, file, cb) => {
  if (!file || !file.mimetype) {
    return cb(
      new Error("Invalid image file."),
      false
    );
  }

  if (file.mimetype.startsWith("image/")) {
    return cb(null, true);
  }

  return cb(
    new Error(
      "Only image files are allowed. JPG, JPEG, PNG and WEBP only."
    ),
    false
  );
};

// =========================================================
// MULTER CONFIGURATION
// =========================================================

const upload = multer({
  storage: storage,

  fileFilter: fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 15,
  },
});

// =========================================================
// GENERATE UNIQUE FILE NAME
// =========================================================

const generateFileName = (prefix = "image") => {
  const timestamp = Date.now();

  const randomNumber = Math.floor(
    Math.random() * 1000000000
  );

  return `${prefix}-${timestamp}-${randomNumber}.webp`;
};

// =========================================================
// GET UPLOAD PREFIX
//
// Allows different modules to use different prefixes.
//
// Example:
// req.uploadPrefix = "teacher"
// req.uploadPrefix = "gallery"
// req.uploadPrefix = "vehicle"
//
// If nothing is provided, "gallery" is used.
// =========================================================

const getUploadPrefix = (req, defaultPrefix = "gallery") => {
  if (
    req &&
    req.uploadPrefix &&
    typeof req.uploadPrefix === "string"
  ) {
    return req.uploadPrefix;
  }

  return defaultPrefix;
};

// =========================================================
// SINGLE IMAGE → WEBP
// =========================================================

const convertSingleToWebp = async (
  req,
  res,
  next
) => {
  try {
    // ------------------------------------------
    // No image uploaded
    // ------------------------------------------

    if (!req.file) {
      return next();
    }

    // ------------------------------------------
    // Get prefix
    // ------------------------------------------

    const prefix = getUploadPrefix(
      req,
      "gallery"
    );

    // ------------------------------------------
    // Generate filename
    // ------------------------------------------

    const filename =
      generateFileName(prefix);

    // ------------------------------------------
    // Full file path
    // ------------------------------------------

    const outputPath = path.join(
      uploadDir,
      filename
    );

    // ------------------------------------------
    // Convert image to WEBP
    // ------------------------------------------

    await sharp(req.file.buffer)
      .rotate()
      .resize({
        width: 1200,
        withoutEnlargement: true,
      })
      .webp({
        quality: 82,
      })
      .toFile(outputPath);

    // ------------------------------------------
    // Get file information
    // ------------------------------------------

    const stats =
      fs.statSync(outputPath);

    // ------------------------------------------
    // Save processed file information
    // ------------------------------------------

    req.processedFile = {
      originalName:
        req.file.originalname,

      filename: filename,

      path: `/uploads/${filename}`,

      url: `/uploads/${filename}`,

      size: stats.size,

      mimetype: "image/webp",
    };

    console.log(
      "IMAGE PROCESSED:",
      req.processedFile
    );

    next();
  } catch (error) {
    console.error(
      "SINGLE IMAGE CONVERSION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Image conversion failed.",

      error: error.message,
    });
  }
};

// =========================================================
// TEACHER SINGLE IMAGE → WEBP
//
// This is an additional middleware specifically for
// TeacherPost.
//
// It uses the same multer + sharp system.
// Nothing is duplicated or removed.
//
// Usage:
//
// router.post(
//   "/",
//   upload.single("image"),
//   convertTeacherImageToWebp,
//   createTeacher
// );
//
// =========================================================

const convertTeacherImageToWebp = async (
  req,
  res,
  next
) => {
  try {
    // ------------------------------------------
    // No image
    // ------------------------------------------

    if (!req.file) {
      return next();
    }

    // ------------------------------------------
    // Set Teacher prefix
    // ------------------------------------------

    req.uploadPrefix = "teacher";

    // ------------------------------------------
    // Generate filename
    // ------------------------------------------

    const filename =
      generateFileName("teacher");

    // ------------------------------------------
    // Full path
    // ------------------------------------------

    const outputPath = path.join(
      uploadDir,
      filename
    );

    // ------------------------------------------
    // Convert to WEBP
    // ------------------------------------------

    await sharp(req.file.buffer)
      .rotate()
      .resize({
        width: 1200,
        withoutEnlargement: true,
      })
      .webp({
        quality: 82,
      })
      .toFile(outputPath);

    // ------------------------------------------
    // File statistics
    // ------------------------------------------

    const stats =
      fs.statSync(outputPath);

    // ------------------------------------------
    // Save processed Teacher image
    // ------------------------------------------

    req.processedFile = {
      originalName:
        req.file.originalname,

      filename: filename,

      path: `/uploads/${filename}`,

      url: `/uploads/${filename}`,

      size: stats.size,

      mimetype: "image/webp",
    };

    console.log(
      "TEACHER IMAGE PROCESSED:",
      req.processedFile
    );

    next();
  } catch (error) {
    console.error(
      "TEACHER IMAGE CONVERSION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Teacher image conversion failed.",

      error: error.message,
    });
  }
};

// =========================================================
// MULTIPLE IMAGES → WEBP
// =========================================================

const convertMultipleToWebp = async (
  req,
  res,
  next
) => {
  try {
    // ------------------------------------------
    // No files uploaded
    // ------------------------------------------

    if (
      !req.files ||
      req.files.length === 0
    ) {
      return next();
    }

    // ------------------------------------------
    // Initialize processed files
    // ------------------------------------------

    req.processedFiles = [];

    // ------------------------------------------
    // Get prefix
    // ------------------------------------------

    const prefix = getUploadPrefix(
      req,
      "gallery"
    );

    // ------------------------------------------
    // Process every image
    // ------------------------------------------

    for (
      let i = 0;
      i < req.files.length;
      i++
    ) {
      const file = req.files[i];

      const filename =
        generateFileName(
          `${prefix}-${i + 1}`
        );

      const outputPath = path.join(
        uploadDir,
        filename
      );

      // ----------------------------------------
      // Convert to WEBP
      // ----------------------------------------

      await sharp(file.buffer)
        .rotate()
        .resize({
          width: 1200,
          withoutEnlargement: true,
        })
        .webp({
          quality: 82,
        })
        .toFile(outputPath);

      // ----------------------------------------
      // File information
      // ----------------------------------------

      const stats =
        fs.statSync(outputPath);

      // ----------------------------------------
      // Add to processed files
      // ----------------------------------------

      req.processedFiles.push({
        originalName:
          file.originalname,

        filename: filename,

        path: `/uploads/${filename}`,

        url: `/uploads/${filename}`,

        size: stats.size,

        mimetype: "image/webp",
      });
    }

    console.log(
      "MULTIPLE IMAGES PROCESSED:",
      req.processedFiles.length
    );

    next();
  } catch (error) {
    console.error(
      "MULTIPLE IMAGE CONVERSION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Multiple image conversion failed.",

      error: error.message,
    });
  }
};

// =========================================================
// EXPORT
// =========================================================

module.exports = {
  upload,

  convertSingleToWebp,

  convertMultipleToWebp,

  convertTeacherImageToWebp,
};


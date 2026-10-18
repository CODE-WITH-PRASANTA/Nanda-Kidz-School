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
// SUPPORTED TYPES
// =========================================================

const allowedMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];

const allowedVideoTypes = [
  "video/mp4",
  "video/quicktime",
  "video/x-msvideo",
  "video/webm",
];

// =========================================================
// IMAGE PROCESSING CONFIGURATION
// =========================================================

const IMAGE_WIDTH = 1200;
const IMAGE_QUALITY = 82;

// =========================================================
// MULTER STORAGE (MEMORY STORAGE FOR STANDARD IMAGES)
// =========================================================

const storage = multer.memoryStorage();

// =========================================================
// FILE FILTER FOR STANDARD IMAGES
// =========================================================

const fileFilter = (req, file, cb) => {
  try {
    if (!file || !file.mimetype) {
      return cb(new Error("Invalid image file."), false);
    }

    if (allowedMimeTypes.includes(file.mimetype)) {
      return cb(null, true);
    }

    return cb(
      new Error(
        "Only image files are allowed. JPG, JPEG, PNG, WEBP, GIF and AVIF only."
      ),
      false
    );
  } catch (error) {
    return cb(new Error("Image validation failed."), false);
  }
};

// =========================================================
// MULTER CONFIGURATION FOR IMAGES
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
// VIDEO DISK STORAGE & FILTER (FOR VIDEO MANAGEMENT)
// Videos stream directly to disk to prevent RAM overload
// =========================================================

const videoDiskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    if (file.fieldname === "video") {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `video-${Date.now()}-${Math.floor(Math.random() * 1e9)}${ext}`);
    } else {
      cb(null, `raw-thumb-${Date.now()}-${file.originalname}`);
    }
  },
});

const videoFileFilter = (req, file, cb) => {
  if (file.fieldname === "video") {
    if (
      allowedVideoTypes.includes(file.mimetype) ||
      /\.(mp4|mov|avi|webm)$/i.test(file.originalname)
    ) {
      return cb(null, true);
    }
    return cb(
      new Error("Only MP4, MOV, AVI, and WebM video files are allowed."),
      false
    );
  }

  if (file.fieldname === "thumbnail") {
    if (allowedMimeTypes.includes(file.mimetype)) {
      return cb(null, true);
    }
    return cb(new Error("Thumbnail must be a valid image file."), false);
  }

  return cb(null, true);
};

const videoUpload = multer({
  storage: videoDiskStorage,
  fileFilter: videoFileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB video limit
  },
});

const videoUploadFields = videoUpload.fields([
  { name: "video", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
]);

// Helper to convert uploaded video thumbnail to WebP using Sharp
const convertVideoThumbnailToWebp = async (req, res, next) => {
  try {
    if (req.files && req.files.thumbnail && req.files.thumbnail[0]) {
      const thumbFile = req.files.thumbnail[0];
      const webpFileName = `thumb-video-${Date.now()}-${Math.floor(
        Math.random() * 1e9
      )}.webp`;
      const outputPath = path.join(uploadDir, webpFileName);

      await sharp(thumbFile.path)
        .rotate()
        .resize({ width: 800, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);

      // Delete raw temporary thumbnail file
      if (fs.existsSync(thumbFile.path)) {
        fs.unlinkSync(thumbFile.path);
      }

      req.processedThumbnail = `/uploads/${webpFileName}`;
    }
    next();
  } catch (error) {
    console.error("VIDEO THUMBNAIL CONVERSION ERROR:", error);
    next(error);
  }
};

// =========================================================
// SANITIZE FILE PREFIX
// =========================================================

const sanitizePrefix = (prefix, fallback = "image") => {
  if (!prefix || typeof prefix !== "string") {
    return fallback;
  }

  const cleanPrefix = prefix
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return cleanPrefix || fallback;
};

// =========================================================
// GENERATE UNIQUE FILE NAME
// =========================================================

const generateFileName = (prefix = "image") => {
  const safePrefix = sanitizePrefix(prefix, "image");
  const timestamp = Date.now();
  const randomNumber = Math.floor(Math.random() * 1000000000);
  return `${safePrefix}-${timestamp}-${randomNumber}.webp`;
};

// =========================================================
// GET UPLOAD PREFIX
// =========================================================

const getUploadPrefix = (req, defaultPrefix = "gallery") => {
  if (req && req.uploadPrefix && typeof req.uploadPrefix === "string") {
    return sanitizePrefix(req.uploadPrefix, defaultPrefix);
  }
  return sanitizePrefix(defaultPrefix, "gallery");
};

// =========================================================
// SAFE FILE DELETE
// =========================================================

const safeDeleteFile = (filePath) => {
  try {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (deleteError) {
    console.error("FILE CLEANUP ERROR:", deleteError);
  }
};

// =========================================================
// GET ORIGINAL EXTENSION
// =========================================================

const getOriginalExtension = (originalName) => {
  if (!originalName || typeof originalName !== "string") {
    return "";
  }
  return path.extname(originalName).replace(".", "").toLowerCase();
};

// =========================================================
// IMAGE PROCESSING FUNCTION
// =========================================================

const processImageToWebp = async (buffer, outputPath) => {
  if (!buffer || !Buffer.isBuffer(buffer)) {
    throw new Error("Invalid image buffer.");
  }

  await sharp(buffer)
    .rotate()
    .resize({
      width: IMAGE_WIDTH,
      withoutEnlargement: true,
    })
    .webp({
      quality: IMAGE_QUALITY,
    })
    .toFile(outputPath);

  return fs.statSync(outputPath);
};

// =========================================================
// SINGLE IMAGE → WEBP
// =========================================================

const convertSingleToWebp = async (req, res, next) => {
  let outputPath = null;

  try {
    if (!req.file) {
      return next();
    }

    const prefix = getUploadPrefix(req, "gallery");
    const filename = generateFileName(prefix);
    outputPath = path.join(uploadDir, filename);

    const stats = await processImageToWebp(req.file.buffer, outputPath);

    req.processedFile = {
      originalName: req.file.originalname,
      originalExtension: getOriginalExtension(req.file.originalname),
      filename: filename,
      path: `/uploads/${filename}`,
      url: `/uploads/${filename}`,
      size: stats.size,
      mimetype: "image/webp",
      width: IMAGE_WIDTH,
      quality: IMAGE_QUALITY,
      processedAt: new Date().toISOString(),
    };

    next();
  } catch (error) {
    console.error("SINGLE IMAGE CONVERSION ERROR:", error);
    safeDeleteFile(outputPath);
    return res.status(500).json({
      success: false,
      message: "Image conversion failed.",
      error: error.message,
    });
  }
};

// =========================================================
// TEACHER SINGLE IMAGE → WEBP
// =========================================================

const convertTeacherImageToWebp = async (req, res, next) => {
  let outputPath = null;

  try {
    if (!req.file) {
      return next();
    }

    req.uploadPrefix = "teacher";
    const filename = generateFileName("teacher");
    outputPath = path.join(uploadDir, filename);

    const stats = await processImageToWebp(req.file.buffer, outputPath);

    req.processedFile = {
      originalName: req.file.originalname,
      originalExtension: getOriginalExtension(req.file.originalname),
      filename: filename,
      path: `/uploads/${filename}`,
      url: `/uploads/${filename}`,
      size: stats.size,
      mimetype: "image/webp",
      width: IMAGE_WIDTH,
      quality: IMAGE_QUALITY,
      processedAt: new Date().toISOString(),
    };

    next();
  } catch (error) {
    console.error("TEACHER IMAGE CONVERSION ERROR:", error);
    safeDeleteFile(outputPath);
    return res.status(500).json({
      success: false,
      message: "Teacher image conversion failed.",
      error: error.message,
    });
  }
};

// =========================================================
// MULTIPLE IMAGES → WEBP
// =========================================================

const convertMultipleToWebp = async (req, res, next) => {
  const generatedFiles = [];

  try {
    if (!req.files || req.files.length === 0) {
      return next();
    }

    req.processedFiles = [];
    const prefix = getUploadPrefix(req, "gallery");

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];

      if (!file || !file.buffer) {
        throw new Error(`Invalid image at position ${i + 1}.`);
      }

      const filename = generateFileName(`${prefix}-${i + 1}`);
      const outputPath = path.join(uploadDir, filename);
      generatedFiles.push(outputPath);

      const stats = await processImageToWebp(file.buffer, outputPath);

      req.processedFiles.push({
        originalName: file.originalname,
        originalExtension: getOriginalExtension(file.originalname),
        filename: filename,
        path: `/uploads/${filename}`,
        url: `/uploads/${filename}`,
        size: stats.size,
        mimetype: "image/webp",
        width: IMAGE_WIDTH,
        quality: IMAGE_QUALITY,
        processedAt: new Date().toISOString(),
      });
    }

    next();
  } catch (error) {
    console.error("MULTIPLE IMAGE CONVERSION ERROR:", error);
    generatedFiles.forEach((filePath) => safeDeleteFile(filePath));
    return res.status(500).json({
      success: false,
      message: "Multiple image conversion failed.",
      error: error.message,
    });
  }
};

// =========================================================
// BLOG SINGLE IMAGE → WEBP
// =========================================================

const convertBlogImageToWebp = async (req, res, next) => {
  let outputPath = null;

  try {
    if (!req.file) {
      return next();
    }

    req.uploadPrefix = "blog";
    const filename = generateFileName("blog");
    outputPath = path.join(uploadDir, filename);

    const stats = await processImageToWebp(req.file.buffer, outputPath);

    req.processedFile = {
      originalName: req.file.originalname,
      originalExtension: getOriginalExtension(req.file.originalname),
      filename: filename,
      path: `/uploads/${filename}`,
      url: `/uploads/${filename}`,
      size: stats.size,
      mimetype: "image/webp",
      width: IMAGE_WIDTH,
      quality: IMAGE_QUALITY,
      processedAt: new Date().toISOString(),
    };

    next();
  } catch (error) {
    console.error("BLOG IMAGE CONVERSION ERROR:", error);
    safeDeleteFile(outputPath);
    return res.status(500).json({
      success: false,
      message: "Blog image conversion failed.",
      error: error.message,
    });
  }
};

// =========================================================
// PREMIUM IMAGE INFORMATION HELPER
// =========================================================

const getImageMetadata = async (buffer) => {
  try {
    if (!buffer || !Buffer.isBuffer(buffer)) {
      throw new Error("Invalid image buffer.");
    }

    const metadata = await sharp(buffer).metadata();

    return {
      width: metadata.width || null,
      height: metadata.height || null,
      format: metadata.format || null,
      size: buffer.length,
      hasAlpha: Boolean(metadata.hasAlpha),
      orientation: metadata.orientation || null,
    };
  } catch (error) {
    console.error("IMAGE METADATA ERROR:", error);
    throw error;
  }
};

// =========================================================
// IMAGE BUFFER VALIDATION
// =========================================================

const validateImageBuffer = async (buffer) => {
  try {
    if (!buffer || !Buffer.isBuffer(buffer) || buffer.length === 0) {
      return false;
    }
    await sharp(buffer).metadata();
    return true;
  } catch (error) {
    return false;
  }
};

// =========================================================
// DELETE PROCESSED IMAGE
// =========================================================

const deleteProcessedImage = (filename) => {
  try {
    if (!filename || typeof filename !== "string") {
      return false;
    }

    const safeFilename = path.basename(filename);
    const filePath = path.join(uploadDir, safeFilename);

    if (!fs.existsSync(filePath)) {
      return false;
    }

    fs.unlinkSync(filePath);
    return true;
  } catch (error) {
    console.error("IMAGE DELETE ERROR:", error);
    return false;
  }
};

// =========================================================
// MULTER ERROR HANDLER
// =========================================================

const handleUploadError = (err, req, res, next) => {
  if (!err) {
    return next();
  }

  console.error("UPLOAD ERROR:", err);

  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File size exceeds the allowed limit.",
      });
    }

    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        success: false,
        message: "You have exceeded the maximum number of files allowed.",
      });
    }

    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        success: false,
        message: "Unexpected upload field received.",
      });
    }

    return res.status(400).json({
      success: false,
      message: err.message || "File upload failed.",
    });
  }

  return res.status(400).json({
    success: false,
    message: err.message || "Upload validation failed.",
  });
};

// =========================================================
// CONFIG HELPER
// =========================================================

const getUploadConfig = () => {
  return {
    uploadDirectory: uploadDir,
    maxFileSize: 10 * 1024 * 1024,
    maxFiles: 15,
    outputFormat: "webp",
    imageWidth: IMAGE_WIDTH,
    imageQuality: IMAGE_QUALITY,
    allowedMimeTypes: allowedMimeTypes,
  };
};

// =========================================================
// EXPORTS (INCLUDES BOTH IMAGE & VIDEO HANDLERS)
// =========================================================

module.exports = {
  upload,
  videoUploadFields,            // Used by VideoManagement
  convertVideoThumbnailToWebp,  // Used by VideoManagement
  convertSingleToWebp,
  convertMultipleToWebp,
  convertTeacherImageToWebp,
  convertBlogImageToWebp,
  handleUploadError,
  generateFileName,
  getUploadPrefix,
  sanitizePrefix,
  getImageMetadata,
  validateImageBuffer,
  deleteProcessedImage,
  getUploadConfig,
};
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
// SUPPORTED IMAGE TYPES
// =========================================================

const allowedMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];

// =========================================================
// IMAGE PROCESSING CONFIGURATION
// =========================================================

const IMAGE_WIDTH = 1200;
const IMAGE_QUALITY = 82;

// =========================================================
// MULTER STORAGE
// =========================================================

const storage = multer.memoryStorage();

// =========================================================
// FILE FILTER
// =========================================================

const fileFilter = (req, file, cb) => {
  try {
    if (!file || !file.mimetype) {
      return cb(
        new Error("Invalid image file."),
        false
      );
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
    return cb(
      new Error("Image validation failed."),
      false
    );
  }
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
// SANITIZE FILE PREFIX
// =========================================================
//
// Prevents unsafe characters from entering generated
// filenames.
//
// Example:
// "Teacher Profile" -> "teacher-profile"
//

const sanitizePrefix = (
  prefix,
  fallback = "image"
) => {
  if (
    !prefix ||
    typeof prefix !== "string"
  ) {
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

const generateFileName = (
  prefix = "image"
) => {
  const safePrefix =
    sanitizePrefix(prefix, "image");

  const timestamp = Date.now();

  const randomNumber = Math.floor(
    Math.random() * 1000000000
  );

  return `${safePrefix}-${timestamp}-${randomNumber}.webp`;
};

// =========================================================
// GET UPLOAD PREFIX
//
// Allows different modules to use different prefixes.
//
// Example:
//
// req.uploadPrefix = "teacher"
// req.uploadPrefix = "gallery"
// req.uploadPrefix = "vehicle"
// req.uploadPrefix = "blog"
//
// If nothing is provided, "gallery" is used.
// =========================================================

const getUploadPrefix = (
  req,
  defaultPrefix = "gallery"
) => {
  if (
    req &&
    req.uploadPrefix &&
    typeof req.uploadPrefix === "string"
  ) {
    return sanitizePrefix(
      req.uploadPrefix,
      defaultPrefix
    );
  }

  return sanitizePrefix(
    defaultPrefix,
    "gallery"
  );
};

// =========================================================
// SAFE FILE DELETE
// =========================================================
//
// Used when Sharp processing fails so that partially
// created files do not remain inside /uploads.
//

const safeDeleteFile = (filePath) => {
  try {
    if (
      filePath &&
      fs.existsSync(filePath)
    ) {
      fs.unlinkSync(filePath);
    }
  } catch (deleteError) {
    console.error(
      "FILE CLEANUP ERROR:",
      deleteError
    );
  }
};

// =========================================================
// GET ORIGINAL EXTENSION
// =========================================================

const getOriginalExtension = (
  originalName
) => {
  if (
    !originalName ||
    typeof originalName !== "string"
  ) {
    return "";
  }

  return (
    path
      .extname(originalName)
      .replace(".", "")
      .toLowerCase()
  );
};

// =========================================================
// IMAGE PROCESSING FUNCTION
// =========================================================
//
// Centralized Sharp processing.
// Existing middleware behavior remains unchanged.
//
// =========================================================

const processImageToWebp = async (
  buffer,
  outputPath
) => {
  if (
    !buffer ||
    !Buffer.isBuffer(buffer)
  ) {
    throw new Error(
      "Invalid image buffer."
    );
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

const convertSingleToWebp = async (
  req,
  res,
  next
) => {
  let outputPath = null;

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

    outputPath = path.join(
      uploadDir,
      filename
    );

    // ------------------------------------------
    // Convert image to WEBP
    // ------------------------------------------

    const stats =
      await processImageToWebp(
        req.file.buffer,
        outputPath
      );

    // ------------------------------------------
    // Save processed file information
    // ------------------------------------------

    req.processedFile = {
      originalName:
        req.file.originalname,

      originalExtension:
        getOriginalExtension(
          req.file.originalname
        ),

      filename: filename,

      path: `/uploads/${filename}`,

      url: `/uploads/${filename}`,

      size: stats.size,

      mimetype: "image/webp",

      width: IMAGE_WIDTH,

      quality: IMAGE_QUALITY,

      processedAt:
        new Date().toISOString(),
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

    // ------------------------------------------
    // Cleanup partially generated file
    // ------------------------------------------

    safeDeleteFile(outputPath);

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
  let outputPath = null;

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

    req.uploadPrefix =
      "teacher";

    // ------------------------------------------
    // Generate filename
    // ------------------------------------------

    const filename =
      generateFileName("teacher");

    // ------------------------------------------
    // Full path
    // ------------------------------------------

    outputPath = path.join(
      uploadDir,
      filename
    );

    // ------------------------------------------
    // Convert to WEBP
    // ------------------------------------------

    const stats =
      await processImageToWebp(
        req.file.buffer,
        outputPath
      );

    // ------------------------------------------
    // Save processed Teacher image
    // ------------------------------------------

    req.processedFile = {
      originalName:
        req.file.originalname,

      originalExtension:
        getOriginalExtension(
          req.file.originalname
        ),

      filename: filename,

      path: `/uploads/${filename}`,

      url: `/uploads/${filename}`,

      size: stats.size,

      mimetype: "image/webp",

      width: IMAGE_WIDTH,

      quality: IMAGE_QUALITY,

      processedAt:
        new Date().toISOString(),
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

    // ------------------------------------------
    // Cleanup generated file
    // ------------------------------------------

    safeDeleteFile(outputPath);

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
  const generatedFiles = [];

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

      // ----------------------------------------
      // Safety validation
      // ----------------------------------------

      if (
        !file ||
        !file.buffer
      ) {
        throw new Error(
          `Invalid image at position ${i + 1}.`
        );
      }

      // ----------------------------------------
      // Generate filename
      // ----------------------------------------

      const filename =
        generateFileName(
          `${prefix}-${i + 1}`
        );

      // ----------------------------------------
      // Full output path
      // ----------------------------------------

      const outputPath = path.join(
        uploadDir,
        filename
      );

      generatedFiles.push(
        outputPath
      );

      // ----------------------------------------
      // Convert to WEBP
      // ----------------------------------------

      const stats =
        await processImageToWebp(
          file.buffer,
          outputPath
        );

      // ----------------------------------------
      // Add to processed files
      // ----------------------------------------

      req.processedFiles.push({
        originalName:
          file.originalname,

        originalExtension:
          getOriginalExtension(
            file.originalname
          ),

        filename: filename,

        path: `/uploads/${filename}`,

        url: `/uploads/${filename}`,

        size: stats.size,

        mimetype: "image/webp",

        width: IMAGE_WIDTH,

        quality: IMAGE_QUALITY,

        processedAt:
          new Date().toISOString(),
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

    // ------------------------------------------
    // Cleanup every generated image
    // ------------------------------------------

    generatedFiles.forEach(
      (filePath) => {
        safeDeleteFile(filePath);
      }
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
// BLOG SINGLE IMAGE → WEBP
//
// Added specifically for Blog posts.
// Uses the exact same reliable structure.
//
// =========================================================

const convertBlogImageToWebp = async (
  req,
  res,
  next
) => {
  let outputPath = null;

  try {
    // ------------------------------------------
    // No new image uploaded
    //
    // Important for BLOG UPDATE.
    //
    // If the user edits a blog without selecting
    // another image, keep the existing image.
    // ------------------------------------------

    if (!req.file) {
      return next();
    }

    // ------------------------------------------
    // Set Blog prefix
    // ------------------------------------------

    req.uploadPrefix =
      "blog";

    // ------------------------------------------
    // Generate filename
    // ------------------------------------------

    const filename =
      generateFileName("blog");

    // ------------------------------------------
    // Full output path
    // ------------------------------------------

    outputPath = path.join(
      uploadDir,
      filename
    );

    // ------------------------------------------
    // Convert image to WEBP
    // ------------------------------------------

    const stats =
      await processImageToWebp(
        req.file.buffer,
        outputPath
      );

    // ------------------------------------------
    // Save processed Blog image
    // ------------------------------------------

    req.processedFile = {
      originalName:
        req.file.originalname,

      originalExtension:
        getOriginalExtension(
          req.file.originalname
        ),

      filename: filename,

      path: `/uploads/${filename}`,

      url: `/uploads/${filename}`,

      size: stats.size,

      mimetype: "image/webp",

      width: IMAGE_WIDTH,

      quality: IMAGE_QUALITY,

      processedAt:
        new Date().toISOString(),
    };

    console.log(
      "BLOG IMAGE PROCESSED:",
      req.processedFile
    );

    next();
  } catch (error) {
    console.error(
      "BLOG IMAGE CONVERSION ERROR:",
      error
    );

    // ------------------------------------------
    // Cleanup generated file
    // ------------------------------------------

    safeDeleteFile(outputPath);

    return res.status(500).json({
      success: false,

      message:
        "Blog image conversion failed.",

      error: error.message,
    });
  }
};

// =========================================================
// PREMIUM IMAGE INFORMATION HELPER
// =========================================================
//
// This helper can be used by future modules when you
// need detailed information about an uploaded image.
//
// It does NOT change the existing middleware behavior.
//
// Example:
//
// const metadata = await getImageMetadata(buffer);
//
// =========================================================

const getImageMetadata = async (
  buffer
) => {
  try {
    if (
      !buffer ||
      !Buffer.isBuffer(buffer)
    ) {
      throw new Error(
        "Invalid image buffer."
      );
    }

    const metadata =
      await sharp(buffer).metadata();

    return {
      width:
        metadata.width || null,

      height:
        metadata.height || null,

      format:
        metadata.format || null,

      size:
        buffer.length,

      hasAlpha:
        Boolean(metadata.hasAlpha),

      orientation:
        metadata.orientation || null,
    };
  } catch (error) {
    console.error(
      "IMAGE METADATA ERROR:",
      error
    );

    throw error;
  }
};

// =========================================================
// IMAGE BUFFER VALIDATION
// =========================================================
//
// Extra protection before Sharp processing.
//
// Sharp itself remains the final image validator.
//
// =========================================================

const validateImageBuffer = async (
  buffer
) => {
  try {
    if (
      !buffer ||
      !Buffer.isBuffer(buffer) ||
      buffer.length === 0
    ) {
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
//
// Utility for controllers that need to delete an image.
//
// Example:
//
// deleteProcessedImage(
//   req.processedFile.filename
// );
//
// =========================================================

const deleteProcessedImage = (
  filename
) => {
  try {
    if (
      !filename ||
      typeof filename !== "string"
    ) {
      return false;
    }

    const safeFilename =
      path.basename(filename);

    const filePath = path.join(
      uploadDir,
      safeFilename
    );

    if (
      !fs.existsSync(filePath)
    ) {
      return false;
    }

    fs.unlinkSync(filePath);

    console.log(
      "IMAGE DELETED:",
      safeFilename
    );

    return true;
  } catch (error) {
    console.error(
      "IMAGE DELETE ERROR:",
      error
    );

    return false;
  }
};

// =========================================================
// MULTER ERROR HANDLER
//
// This keeps upload errors from becoming unclear
// 500 errors.
// =========================================================

const handleUploadError = (
  err,
  req,
  res,
  next
) => {
  if (!err) {
    return next();
  }

  console.error(
    "UPLOAD ERROR:",
    err
  );

  // ------------------------------------------
  // MULTER ERRORS
  // ------------------------------------------

  if (
    err instanceof multer.MulterError
  ) {
    if (
      err.code ===
      "LIMIT_FILE_SIZE"
    ) {
      return res.status(400).json({
        success: false,

        message:
          "Image size cannot exceed 10 MB.",
      });
    }

    if (
      err.code ===
      "LIMIT_FILE_COUNT"
    ) {
      return res.status(400).json({
        success: false,

        message:
          "You can upload a maximum of 15 images.",
      });
    }

    if (
      err.code ===
      "LIMIT_UNEXPECTED_FILE"
    ) {
      return res.status(400).json({
        success: false,

        message:
          "Unexpected image field. Please check the upload field name.",
      });
    }

    if (
      err.code ===
      "LIMIT_PART_COUNT"
    ) {
      return res.status(400).json({
        success: false,

        message:
          "Too many form fields were submitted.",
      });
    }

    return res.status(400).json({
      success: false,

      message:
        err.message ||
        "Image upload failed.",
    });
  }

  // ------------------------------------------
  // CUSTOM FILE FILTER / SHARP ERRORS
  // ------------------------------------------

  return res.status(400).json({
    success: false,

    message:
      err.message ||
      "Image upload failed.",
  });
};

// =========================================================
// PREMIUM UPLOAD CONFIG INFORMATION
// =========================================================
//
// Useful for debugging / admin APIs.
//
// =========================================================

const getUploadConfig = () => {
  return {
    uploadDirectory: uploadDir,

    maxFileSize:
      10 * 1024 * 1024,

    maxFiles: 15,

    outputFormat: "webp",

    imageWidth: IMAGE_WIDTH,

    imageQuality: IMAGE_QUALITY,

    allowedMimeTypes:
      allowedMimeTypes,
  };
};

// =========================================================
// EXPORT
// =========================================================

module.exports = {
  upload,

  convertSingleToWebp,

  convertMultipleToWebp,

  convertTeacherImageToWebp,

  convertBlogImageToWebp,

  handleUploadError,

  // ------------------------------------------
  // Additional premium helpers
  // ------------------------------------------

  generateFileName,

  getUploadPrefix,

  sanitizePrefix,

  getImageMetadata,

  validateImageBuffer,

  deleteProcessedImage,

  getUploadConfig,
};
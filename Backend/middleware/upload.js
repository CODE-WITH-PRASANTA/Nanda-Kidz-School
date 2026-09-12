const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

/* =========================================================
   UPLOAD DIRECTORY
========================================================= */

const uploadDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {
    recursive: true,
  });
}

/* =========================================================
   MULTER STORAGE
========================================================= */

const storage = multer.memoryStorage();

/* =========================================================
   FILE FILTER
========================================================= */

const fileFilter = (req, file, cb) => {
  if (!file || !file.mimetype) {
    return cb(new Error("Invalid image file."), false);
  }

  if (file.mimetype.startsWith("image/")) {
    return cb(null, true);
  }

  return cb(
    new Error(
      "Only image files are allowed. Please upload JPG, JPEG, PNG or WEBP."
    ),
    false
  );
};

/* =========================================================
   MULTER CONFIGURATION
========================================================= */

const upload = multer({
  storage: storage,

  fileFilter: fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 15,
  },
});

/* =========================================================
   UNIQUE FILE NAME
========================================================= */

const generateFileName = (prefix = "image") => {
  const timestamp = Date.now();

  const randomNumber = Math.floor(
    Math.random() * 1000000000
  );

  return `${prefix}-${timestamp}-${randomNumber}.webp`;
};

/* =========================================================
   SINGLE IMAGE -> WEBP
========================================================= */

const convertSingleToWebp = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }

    const filename = generateFileName("image");

    const outputPath = path.join(
      uploadDir,
      filename
    );

    await sharp(req.file.buffer)
      .rotate()
      .webp({
        quality: 80,
      })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);

    req.processedFile = {
      originalName: req.file.originalname,
      filename: filename,
      path: `/uploads/${filename}`,
      url: `/uploads/${filename}`,
      size: stats.size,
      mimetype: "image/webp",
    };

    next();
  } catch (error) {
    console.error(
      "SINGLE IMAGE CONVERSION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Image conversion failed.",
      error: error.message,
    });
  }
};

/* =========================================================
   MULTIPLE IMAGES -> WEBP
========================================================= */

const convertMultipleToWebp = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return next();
    }

    req.processedFiles = [];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];

      const filename = generateFileName(
        `image-${i + 1}`
      );

      const outputPath = path.join(
        uploadDir,
        filename
      );

      await sharp(file.buffer)
        .rotate()
        .webp({
          quality: 80,
        })
        .toFile(outputPath);

      const stats = fs.statSync(outputPath);

      req.processedFiles.push({
        originalName: file.originalname,
        filename: filename,
        path: `/uploads/${filename}`,
        url: `/uploads/${filename}`,
        size: stats.size,
        mimetype: "image/webp",
      });
    }

    next();
  } catch (error) {
    console.error(
      "MULTIPLE IMAGE CONVERSION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Multiple image conversion failed.",
      error: error.message,
    });
  }
};

/* =========================================================
   EXPORT
========================================================= */

/*
   IMPORTANT:

   Export multer directly so this works:

   const upload = require("../middleware/upload");

   upload.single(...)

   At the same time, attach the other functions so this
   also works:

   const {
      upload,
      convertSingleToWebp,
      convertMultipleToWebp
   } = require("./middleware/upload");
*/

module.exports = upload;

module.exports.upload = upload;
module.exports.convertSingleToWebp =
  convertSingleToWebp;
module.exports.convertMultipleToWebp =
  convertMultipleToWebp;
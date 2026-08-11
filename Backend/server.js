require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const { upload, convertSingleToWebp, convertMultipleToWebp } = require("./middleware/upload");
const inquiryRoutes = require('./routes/inquiryRoutes');

const app = express();

// Database Connection
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ==================== ROUTES ==================== //

// 1. Single Image Upload Route
app.post(
  "/api/upload/single",
  upload.single("image"), // Field name in Form Data: "image"
  convertSingleToWebp,
  (req, res) => {
    if (!req.processedFile) {
      return res.status(400).json({ message: "Please upload an image file." });
    }

    res.status(200).json({
      success: true,
      message: "Single image uploaded and converted to WebP successfully!",
      file: req.processedFile,
    });
  }
);


// 2. Bulk/Multiple Image Upload Route (Up to 15 files)
app.post(
  "/api/upload/bulk",
  upload.array("images", 15), // Field name in Form Data: "images"
  convertMultipleToWebp,
  (req, res) => {
    if (!req.processedFiles || req.processedFiles.length === 0) {
      return res.status(400).json({ message: "Please select at least one image file." });
    }

    res.status(200).json({
      success: true,
      message: `${req.processedFiles.length} images uploaded & converted to WebP successfully!`,
      files: req.processedFiles,
    });
  }
);
app.use('/api/inquiries', inquiryRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
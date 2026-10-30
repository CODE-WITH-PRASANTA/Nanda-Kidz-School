require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

// Middlewares
const {
  upload,
  convertSingleToWebp,
  convertMultipleToWebp,
  handleUploadError,
} = require("./middleware/upload");

// Import Routes
const inquiryRoutes = require("./routes/inquiryRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const classRoutes = require("./routes/classRoutes.js");
const galleryRoutes = require("./routes/galleryRoutes");
const shopImgRoutes = require("./routes/shopImgRoutes");
const orderRoutes = require("./routes/orderRoutes");
const contactRoutes = require("./routes/contactRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const blogRoutes = require("./routes/blogRoutes");
const contactLeadRoutes = require("./routes/contactLeadRoutes");
const announcementRoutes = require("./routes/announcement.routes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const admissionRoutes = require("./routes/admissionRoutes");
const schoolTeacherRoutes = require("./routes/schoolTeacherRoutes");
const profileRoutes = require("./routes/profileRoutes");
const activityRoutes = require("./routes/activityRoutes");
const videoRoutes = require("./routes/videoRoutes");

const app = express();

// Database Connection
connectDB();

// Global Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded files (Images & Videos)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ==================== ROOT ROUTE ==================== //
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Nanda Kidz School Backend API is running successfully!",
  });
});

// ==================== IMAGE UPLOAD ROUTES ==================== //

// 1. Single Image Upload Route
app.post(
  "/api/upload/single",
  upload.single("image"),
  convertSingleToWebp,
  (req, res) => {
    if (!req.processedFile) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image file.",
      });
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
  upload.array("images", 15),
  convertMultipleToWebp,
  (req, res) => {
    if (!req.processedFiles || req.processedFiles.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one image file.",
      });
    }

    res.status(200).json({
      success: true,
      message: `${req.processedFiles.length} images uploaded & converted to WebP successfully!`,
      files: req.processedFiles,
    });
  }
);

// ==================== MOUNT API ROUTES ==================== //
app.use("/api/subjects", subjectRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/shop-images", shopImgRoutes);
app.use("/api/contact-leads", contactLeadRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/school-teachers", schoolTeacherRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/videos", videoRoutes);

// Multer Upload Error Handler (Catches file size & limit errors cleanly)
if (typeof handleUploadError === "function") {
  app.use(handleUploadError);
}

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
const express = require("express");

const router = express.Router();

const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const {
  upload,
  convertBlogImageToWebp,
} = require("../middleware/upload");

// =========================================================
// GET ALL BLOGS
// GET /api/blogs
// =========================================================

router.get("/", getBlogs);

// =========================================================
// GET SINGLE BLOG BY ID
// GET /api/blogs/:id
// =========================================================

router.get("/:id", getBlogById);

// =========================================================
// CREATE BLOG
// POST /api/blogs
//
// FormData:
// title
// slug
// image
// excerpt
// content
// category
// publishDate
// status
// =========================================================

router.post(
  "/",
  upload.single("image"),
  convertBlogImageToWebp,
  createBlog
);

// =========================================================
// UPDATE BLOG BY ID
// PUT /api/blogs/:id
//
// Image is OPTIONAL during update.
// If a new image is selected:
// upload -> convert -> controller
//
// If no new image:
// existing database image will remain.
// =========================================================

router.put(
  "/:id",
  upload.single("image"),
  convertBlogImageToWebp,
  updateBlog
);

// =========================================================
// DELETE BLOG BY ID
// DELETE /api/blogs/:id
// =========================================================

router.delete("/:id", deleteBlog);

// =========================================================
// EXPORT ROUTER
// =========================================================

module.exports = router;
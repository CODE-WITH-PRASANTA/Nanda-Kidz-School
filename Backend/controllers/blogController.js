const Blog = require("../models/Blog");

// =========================================================
// GET ALL BLOGS
// GET /api/blogs
// =========================================================

const getBlogs = async (req, res) => {
  try {
    const {
      search,
      category,
      status,
    } = req.query;

    // ------------------------------------------
    // Build query
    // ------------------------------------------

    const query = {};

    // ------------------------------------------
    // Search by title or author
    // ------------------------------------------

    if (search && search.trim() !== "") {
      query.$or = [
        {
          title: {
            $regex: search.trim(),
            $options: "i",
          },
        },
        {
          author: {
            $regex: search.trim(),
            $options: "i",
          },
        },
      ];
    }

    // ------------------------------------------
    // Category filter
    // ------------------------------------------

    if (
      category &&
      category !== "All" &&
      category.trim() !== ""
    ) {
      query.category = category.trim();
    }

    // ------------------------------------------
    // Status filter
    // ------------------------------------------

    if (
      status &&
      status !== "All" &&
      status.trim() !== ""
    ) {
      query.status = status.trim();
    }

    // ------------------------------------------
    // Get blogs
    // ------------------------------------------

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 });

    // ------------------------------------------
    // Response
    // ------------------------------------------

    return res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    console.error(
      "GET BLOGS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch blogs.",
      error: error.message,
    });
  }
};

// =========================================================
// GET BLOG BY ID
// GET /api/blogs/:id
// =========================================================

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    // ------------------------------------------
    // Find blog
    // ------------------------------------------

    const blog = await Blog.findById(id);

    // ------------------------------------------
    // Not found
    // ------------------------------------------

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found.",
      });
    }

    // ------------------------------------------
    // Response
    // ------------------------------------------

    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error(
      "GET BLOG BY ID ERROR:",
      error
    );

    // ------------------------------------------
    // Invalid MongoDB ObjectId
    // ------------------------------------------

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to fetch blog.",
      error: error.message,
    });
  }
};

// =========================================================
// CREATE BLOG
// POST /api/blogs
//
// Route should be:
//
// upload.single("image"),
// convertBlogImageToWebp,
// createBlog
//
// =========================================================

const createBlog = async (req, res) => {
  try {
    console.log(
      "=========================================="
    );

    console.log(
      "CREATE BLOG REQUEST"
    );

    console.log(
      "BODY:",
      req.body
    );

    console.log(
      "FILE:",
      req.file
        ? {
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
          }
        : "NO FILE"
    );

    console.log(
      "PROCESSED FILE:",
      req.processedFile || "NO PROCESSED FILE"
    );

    console.log(
      "=========================================="
    );

    const {
      title,
      slug,
      excerpt,
      content,
      category,
      publishDate,
      status,
      author,
    } = req.body;

    // =====================================================
    // REQUIRED FIELD VALIDATION
    // =====================================================

    if (!title || title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Post title is required.",
      });
    }

    if (!slug || slug.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Slug is required.",
      });
    }

    if (!category || category.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Category is required.",
      });
    }

    if (!content || content.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Blog content is required.",
      });
    }

    // =====================================================
    // IMAGE
    //
    // IMPORTANT:
    // Multer stores uploaded file in req.file.
    // Sharp middleware stores final WebP information
    // inside req.processedFile.
    // =====================================================

    if (
      !req.processedFile ||
      !req.processedFile.path
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Featured image is required. Please upload an image.",
      });
    }

    const imagePath =
      req.processedFile.path;

    // =====================================================
    // CREATE BLOG
    // =====================================================

    const newBlog = await Blog.create({
      title: title.trim(),

      slug: slug.trim().toLowerCase(),

      image: imagePath,

      excerpt:
        excerpt && excerpt.trim() !== ""
          ? excerpt.trim()
          : "",

      content,

      category: category.trim(),

      author:
        author && author.trim() !== ""
          ? author.trim()
          : "Admin",

      publishDate:
        publishDate && publishDate !== ""
          ? publishDate
          : Date.now(),

      status:
        status === "Draft"
          ? "Draft"
          : "Published",
    });

    console.log(
      "BLOG CREATED:",
      newBlog._id
    );

    // =====================================================
    // SUCCESS
    // =====================================================

    return res.status(201).json({
      success: true,
      message: "Blog published successfully.",
      data: newBlog,
    });
  } catch (error) {
    console.error(
      "CREATE BLOG ERROR:",
      error
    );

    // =====================================================
    // DUPLICATE SLUG
    // =====================================================

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message:
          "A blog with this slug already exists. Please use a different slug.",
      });
    }

    // =====================================================
    // MONGOOSE VALIDATION ERROR
    // =====================================================

    if (
      error.name ===
      "ValidationError"
    ) {
      const messages = Object.values(
        error.errors
      ).map(
        (err) => err.message
      );

      return res.status(400).json({
        success: false,
        message:
          messages.join(", "),
      });
    }

    // =====================================================
    // GENERAL ERROR
    // =====================================================

    return res.status(500).json({
      success: false,
      message: "Failed to create blog.",
      error: error.message,
    });
  }
};

// =========================================================
// UPDATE BLOG
// PUT /api/blogs/:id
//
// New image:
// req.processedFile.path
//
// No new image:
// Existing blog image remains unchanged.
// =========================================================

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(
      "=========================================="
    );

    console.log(
      "UPDATE BLOG REQUEST:",
      id
    );

    console.log(
      "BODY:",
      req.body
    );

    console.log(
      "PROCESSED FILE:",
      req.processedFile || "NO NEW IMAGE"
    );

    console.log(
      "=========================================="
    );

    // =====================================================
    // FIND EXISTING BLOG
    // =====================================================

    const existingBlog =
      await Blog.findById(id);

    if (!existingBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found.",
      });
    }

    // =====================================================
    // GET BODY DATA
    // =====================================================

    const {
      title,
      slug,
      excerpt,
      content,
      category,
      publishDate,
      status,
      author,
    } = req.body;

    // =====================================================
    // REQUIRED VALIDATION
    // =====================================================

    if (!title || title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Post title is required.",
      });
    }

    if (!slug || slug.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Slug is required.",
      });
    }

    if (!category || category.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Category is required.",
      });
    }

    if (!content || content.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Blog content is required.",
      });
    }

    // =====================================================
    // IMAGE HANDLING
    // =====================================================

    let imagePath =
      existingBlog.image;

    // ------------------------------------------
    // If a new image was uploaded
    // ------------------------------------------

    if (
      req.processedFile &&
      req.processedFile.path
    ) {
      imagePath =
        req.processedFile.path;
    }

    // =====================================================
    // UPDATE OBJECT
    // =====================================================

    const updateData = {
      title: title.trim(),

      slug: slug.trim().toLowerCase(),

      image: imagePath,

      excerpt:
        excerpt && excerpt.trim() !== ""
          ? excerpt.trim()
          : "",

      content,

      category: category.trim(),

      author:
        author && author.trim() !== ""
          ? author.trim()
          : existingBlog.author ||
            "Admin",

      publishDate:
        publishDate &&
        publishDate !== ""
          ? publishDate
          : existingBlog.publishDate,

      status:
        status === "Draft"
          ? "Draft"
          : "Published",
    };

    // =====================================================
    // UPDATE DATABASE
    // =====================================================

    const updatedBlog =
      await Blog.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    // =====================================================
    // RESPONSE
    // =====================================================

    console.log(
      "BLOG UPDATED:",
      updatedBlog._id
    );

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully.",
      data: updatedBlog,
    });
  } catch (error) {
    console.error(
      "UPDATE BLOG ERROR:",
      error
    );

    // =====================================================
    // INVALID ID
    // =====================================================

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID.",
      });
    }

    // =====================================================
    // DUPLICATE SLUG
    // =====================================================

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message:
          "A blog with this slug already exists. Please use a different slug.",
      });
    }

    // =====================================================
    // VALIDATION ERROR
    // =====================================================

    if (
      error.name ===
      "ValidationError"
    ) {
      const messages = Object.values(
        error.errors
      ).map(
        (err) => err.message
      );

      return res.status(400).json({
        success: false,
        message:
          messages.join(", "),
      });
    }

    // =====================================================
    // GENERAL ERROR
    // =====================================================

    return res.status(500).json({
      success: false,
      message: "Failed to update blog.",
      error: error.message,
    });
  }
};

// =========================================================
// DELETE BLOG
// DELETE /api/blogs/:id
// =========================================================

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // =====================================================
    // FIND BLOG
    // =====================================================

    const blog =
      await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found.",
      });
    }

    // =====================================================
    // DELETE BLOG
    // =====================================================

    await blog.deleteOne();

    console.log(
      "BLOG DELETED:",
      id
    );

    // =====================================================
    // RESPONSE
    // =====================================================

    return res.status(200).json({
      success: true,
      message:
        "Blog post deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE BLOG ERROR:",
      error
    );

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to delete blog.",
      error: error.message,
    });
  }
};

// =========================================================
// EXPORT
// =========================================================

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
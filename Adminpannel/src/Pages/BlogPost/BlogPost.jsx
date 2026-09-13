import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaImage,
  FaCalendarAlt,
  FaUndo,
  FaPaperPlane,
  FaTimes,
} from "react-icons/fa";
import "./BlogPost.css";

const BlogPost = () => {
  const initialForm = {
    title: "",
    slug: "",
    image: "",
    excerpt: "",
    content: "",
    category: "",
    publishDate: "",
    status: "Published",
  };

  const [formData, setFormData] = useState(initialForm);
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Determining The True Goal of Good Education is Difficult.",
      slug: "determining-the-true-goal-of-good-education",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=500&q=80",
      category: "Education",
      author: "John Anderson",
      date: "2026-09-10",
      status: "Published",
    },
    {
      id: 2,
      title: "The Data Surrounding Higher Education",
      slug: "the-data-surrounding-higher-education",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=500&q=80",
      category: "Education",
      author: "Sarah Wilson",
      date: "2026-06-10",
      status: "Published",
    },
    {
      id: 3,
      title: "Conversion Rate the Sales Funnel Optimization",
      slug: "conversion-rate-sales-funnel-optimization",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=500&q=80",
      category: "Business",
      author: "Michael Thomas",
      date: "2026-06-21",
      status: "Draft",
    },
    {
      id: 4,
      title: "Business Data is changing the world's Energy",
      slug: "business-data-is-changing-the-world-energy",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=500&q=80",
      category: "Technology",
      author: "Emily Davis",
      date: "2026-06-30",
      status: "Published",
    },
    {
      id: 5,
      title: "The Billionaire Guide On Design That Will Get You Rich",
      slug: "the-billionaire-guide-on-design",
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=500&q=80",
      category: "Design",
      author: "David Miller",
      date: "2026-05-10",
      status: "Published",
    },
    {
      id: 6,
      title: "The Data-Driven Approach To Understanding Your Users",
      slug: "data-driven-approach-understanding-users",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80",
      category: "Analytics",
      author: "Jessica Brown",
      date: "2026-05-21",
      status: "Published",
    },
  ]);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "title"
        ? {
            slug: value
              .toLowerCase()
              .trim()
              .replace(/[^\w\s-]/g, "")
              .replace(/\s+/g, "-"),
          }
        : {}),
    }));
  };

  const handleEditorChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
      }));
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.content) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingId) {
      setBlogs((prev) =>
        prev.map((blog) =>
          blog.id === editingId
            ? {
                ...blog,
                ...formData,
                author: blog.author,
                date: formData.publishDate || blog.date,
              }
            : blog
        )
      );

      alert("Blog updated successfully.");
    } else {
      const newBlog = {
        id: Date.now(),
        ...formData,
        author: "Admin",
        date: formData.publishDate || new Date().toISOString().split("T")[0],
      };

      setBlogs((prev) => [newBlog, ...prev]);

      alert("Blog published successfully.");
    }

    handleReset();
  };

  const handleReset = () => {
    setFormData(initialForm);
    setEditingId(null);
  };

  const handleEdit = (blog) => {
    setEditingId(blog.id);

    setFormData({
      title: blog.title,
      slug: blog.slug,
      image: blog.image,
      excerpt: blog.excerpt || "",
      content:
        blog.content ||
        "<p>Write your blog content here...</p>",
      category: blog.category,
      publishDate: blog.date,
      status: blog.status,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog post?"
    );

    if (confirmDelete) {
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));

      if (editingId === id) {
        handleReset();
      }
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.author.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" || blog.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All" || blog.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [
    "Education",
    "Business",
    "Technology",
    "Design",
    "Analytics",
    "Research",
  ];

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="BlogPost">
      {/* Header */}
      <div className="BlogPost-header">
       

        
      </div>

      {/* Main Content */}
      <div className="BlogPost-layout">
        {/* ================= FORM ================= */}
        <section className="BlogPost-form-card">
          <div className="BlogPost-card-header">
            <div className="BlogPost-card-title-wrapper">
              <div className="BlogPost-card-icon">
                <FaEdit />
              </div>

              <div>
                <h2>
                  {editingId ? "Edit Blog Post" : "Create Blog Post"}
                </h2>
                <p>
                  {editingId
                    ? "Update your existing blog post"
                    : "Fill in the details to publish a new blog post"}
                </p>
              </div>
            </div>
          </div>

          <form
            className="BlogPost-form"
            onSubmit={handleSubmit}
          >
            {/* Title */}
            <div className="BlogPost-field">
              <label>
                Post Title <span>*</span>
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter blog title here..."
              />
            </div>

            {/* Slug */}
            <div className="BlogPost-field">
              <label>
                Slug <span>*</span>
              </label>

              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="enter-blog-title"
              />

              <small>
                URL friendly version of the title
              </small>
            </div>

            {/* Image */}
            <div className="BlogPost-field">
              <label>
                Featured Image <span>*</span>
              </label>

              {!formData.image ? (
                <label className="BlogPost-image-upload">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageChange}
                  />

                  <FaImage className="BlogPost-upload-icon" />

                  <strong>Drag & drop or click to select</strong>

                  <span>
                    Supported formats: JPG, PNG, WEBP
                  </span>
                </label>
              ) : (
                <div className="BlogPost-image-preview">
                  <img
                    src={formData.image}
                    alt="Featured"
                  />

                  <button
                    type="button"
                    onClick={removeImage}
                    className="BlogPost-remove-image"
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>

            {/* Excerpt */}
            <div className="BlogPost-field">
              <div className="BlogPost-label-row">
                <label>
                  Short Description <span>*</span>
                </label>

                <small>
                  {formData.excerpt.length}/200
                </small>
              </div>

              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                maxLength={200}
                rows="4"
                placeholder="Write a short description about the blog..."
              />
            </div>

            {/* TinyMCE */}
            <div className="BlogPost-field">
              <label>
                Blog Description / Content <span>*</span>
              </label>

              <div className="BlogPost-editor">
                <Editor
                  apiKey="no-api-key"
                  value={formData.content}
                  onEditorChange={handleEditorChange}
                  init={{
                    height: 330,
                    menubar: true,
                    branding: false,
                    plugins:
                      "advlist autolink lists link image charmap preview anchor " +
                      "searchreplace visualblocks code fullscreen insertdatetime media table " +
                      "help wordcount",
                    toolbar:
                      "undo redo | blocks | " +
                      "bold italic underline | " +
                      "alignleft aligncenter alignright alignjustify | " +
                      "bullist numlist outdent indent | " +
                      "link image media | code fullscreen",
                    content_style:
                      "body { font-family: Arial, sans-serif; font-size:16px; line-height:1.7; color:#4b5563; padding:10px; }",
                  }}
                />
              </div>
            </div>

            {/* Category */}
            <div className="BlogPost-field">
              <label>
                Category <span>*</span>
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Select Category</option>

                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Date + Status */}
            <div className="BlogPost-form-row">
              <div className="BlogPost-field">
                <label>
                  <FaCalendarAlt />
                  Publish Date <span>*</span>
                </label>

                <input
                  type="date"
                  name="publishDate"
                  value={formData.publishDate}
                  onChange={handleInputChange}
                />
              </div>

              <div className="BlogPost-field">
                <label>
                  Status <span>*</span>
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="Published">
                    Published
                  </option>

                  <option value="Draft">
                    Draft
                  </option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="BlogPost-form-actions">
              <button
                type="button"
                className="BlogPost-reset-button"
                onClick={handleReset}
              >
                <FaUndo />
                Reset
              </button>

              <button
                type="submit"
                className="BlogPost-submit-button"
              >
                <FaPaperPlane />

                {editingId
                  ? "Update Blog Post"
                  : "Publish Blog Post"}
              </button>
            </div>
          </form>
        </section>

        {/* ================= TABLE ================= */}
        <section className="BlogPost-table-card">
          <div className="BlogPost-table-header">
            <div className="BlogPost-table-title-wrapper">
              <div className="BlogPost-table-icon">
                <FaEdit />
              </div>

              <div>
                <h2>Blog Posts</h2>
                <p>Manage all your published blog posts</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="BlogPost-filters">
            <div className="BlogPost-search">
              <FaSearch />

              <input
                type="text"
                placeholder="Search blogs..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value)
              }
            >
              <option value="All">
                All Categories
              </option>

              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >
              <option value="All">
                All Status
              </option>

              <option value="Published">
                Published
              </option>

              <option value="Draft">
                Draft
              </option>
            </select>
          </div>

          {/* Desktop Table */}
          <div className="BlogPost-table-wrapper">
            <table className="BlogPost-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredBlogs.length > 0 ? (
                  filteredBlogs.map((blog, index) => (
                    <tr key={blog.id}>
                      <td>{index + 1}</td>

                      <td>
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="BlogPost-blog-image"
                        />
                      </td>

                      <td>
                        <div className="BlogPost-blog-title">
                          {blog.title}
                        </div>

                        <div className="BlogPost-blog-slug">
                          /{blog.slug}
                        </div>
                      </td>

                      <td>
                        <span
                          className={`BlogPost-category BlogPost-category-${blog.category.toLowerCase()}`}
                        >
                          {blog.category}
                        </span>
                      </td>

                      <td>
                        <span className="BlogPost-author">
                          {blog.author}
                        </span>
                      </td>

                      <td>
                        <div className="BlogPost-date">
                          <FaCalendarAlt />
                          {formatDate(blog.date)}
                        </div>
                      </td>

                      <td>
                        <span
                          className={`BlogPost-status ${
                            blog.status === "Published"
                              ? "BlogPost-status-published"
                              : "BlogPost-status-draft"
                          }`}
                        >
                          {blog.status}
                        </span>
                      </td>

                      <td>
                        <div className="BlogPost-actions">
                          <button
                            type="button"
                            className="BlogPost-edit-button"
                            onClick={() =>
                              handleEdit(blog)
                            }
                            title="Edit"
                          >
                            <FaEdit />
                          </button>

                          <button
                            type="button"
                            className="BlogPost-delete-button"
                            onClick={() =>
                              handleDelete(blog.id)
                            }
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="8"
                      className="BlogPost-no-data"
                    >
                      No blog posts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="BlogPost-mobile-list">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog, index) => (
                <div
                  className="BlogPost-mobile-card"
                  key={blog.id}
                >
                  <div className="BlogPost-mobile-top">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="BlogPost-mobile-image"
                    />

                    <div className="BlogPost-mobile-info">
                      <span className="BlogPost-mobile-number">
                        #{index + 1}
                      </span>

                      <h3>{blog.title}</h3>

                      <span
                        className={`BlogPost-category BlogPost-category-${blog.category.toLowerCase()}`}
                      >
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  <div className="BlogPost-mobile-details">
                    <span>
                      <strong>Author:</strong>{" "}
                      {blog.author}
                    </span>

                    <span>
                      <strong>Date:</strong>{" "}
                      {formatDate(blog.date)}
                    </span>

                    <span>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`BlogPost-status ${
                          blog.status === "Published"
                            ? "BlogPost-status-published"
                            : "BlogPost-status-draft"
                        }`}
                      >
                        {blog.status}
                      </span>
                    </span>
                  </div>

                  <div className="BlogPost-mobile-actions">
                    <button
                      type="button"
                      className="BlogPost-edit-button"
                      onClick={() =>
                        handleEdit(blog)
                      }
                    >
                      <FaEdit />
                      Edit
                    </button>

                    <button
                      type="button"
                      className="BlogPost-delete-button"
                      onClick={() =>
                        handleDelete(blog.id)
                      }
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="BlogPost-mobile-no-data">
                No blog posts found.
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="BlogPost-table-footer">
            <span>
              Showing {filteredBlogs.length} of{" "}
              {blogs.length} entries
            </span>

            <div className="BlogPost-pagination">
              <button type="button">‹</button>
              <button
                type="button"
                className="BlogPost-pagination-active"
              >
                1
              </button>
              <button type="button">›</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogPost;
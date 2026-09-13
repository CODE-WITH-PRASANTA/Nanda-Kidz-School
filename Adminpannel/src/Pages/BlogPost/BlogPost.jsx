import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import API, { IMG_URL } from "../../api/axios";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialForm = {
    title: "",
    slug: "",
    image: "", // Can hold string URL or File object
    excerpt: "",
    content: "",
    category: "",
    publishDate: "",
    status: "Published",
  };

  const [formData, setFormData] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null); // Dedicated state for the raw image file
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [loadingEdit, setLoadingEdit] = useState(false);

  // Fetch blogs on load from backend
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Id-wise load: when arriving via /blog/post/:id (e.g. from the
  // BlogManagement edit button), fetch that specific post and load it
  // into the form.
  useEffect(() => {
    if (id) {
      loadPostForEditing(id);
    } else {
      // Navigated back to the plain "create" route — clear any stale edit state.
      setEditingId(null);
      setFormData(initialForm);
      setImageFile(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchBlogs = async () => {
    try {
      const response = await API.get("/blogs");
      if (response.data && response.data.success) {
        setBlogs(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const loadPostForEditing = async (blogId) => {
    setLoadingEdit(true);
    try {
      const response = await API.get(`/blogs/${blogId}`);
      if (response.data && response.data.success) {
        handleEdit(response.data.data);
      } else {
        alert("Blog post not found.");
        navigate("/blog/management");
      }
    } catch (error) {
      console.error("Error loading blog for editing:", error);
      alert("Failed to load blog post for editing.");
      navigate("/blog/management");
    } finally {
      setLoadingEdit(false);
    }
  };

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
      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
      }));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.content) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("slug", formData.slug);
      data.append("excerpt", formData.excerpt);
      data.append("content", formData.content);
      data.append("category", formData.category);
      data.append("publishDate", formData.publishDate || new Date().toISOString().split("T")[0]);
      data.append("status", formData.status);

      if (imageFile) {
        data.append("image", imageFile);
      } else if (typeof formData.image === "string" && formData.image) {
        // If editing without changing the image, send existing path/URL string
        data.append("image", formData.image);
      }

      let response;
      if (editingId) {
        response = await API.put(`/blogs/${editingId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert(response.data.message || "Blog updated successfully.");
      } else {
        response = await API.post("/blogs", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert(response.data.message || "Blog published successfully.");
      }

      await fetchBlogs();
      handleReset();

      // If we arrived here id-wise for editing, go back to the management list.
      if (id) {
        navigate("/blog/management");
      }
    } catch (error) {
      console.error("Error saving blog post:", error);
      alert(error.response?.data?.message || "Failed to save blog post.");
    }
  };

  const handleReset = () => {
    setFormData(initialForm);
    setImageFile(null);
    setEditingId(null);

    // Drop the :id from the URL so the form goes back to "create" mode.
    if (id) {
      navigate("/blog/post");
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setImageFile(null);

    setFormData({
      title: blog.title,
      slug: blog.slug,
      image: blog.image,
      excerpt: blog.excerpt || "",
      content: blog.content || "<p>Write your blog content here...</p>",
      category: blog.category,
      publishDate: blog.publishDate ? blog.publishDate.split("T")[0] : "",
      status: blog.status,
    });

    // Id-wise redirect when clicked from the table/mobile card below.
    if (blog._id && blog._id !== id) {
      navigate(`/blog/post/${blog._id}`);
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (blogId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog post?");

    if (confirmDelete) {
      try {
        await API.delete(`/blogs/${blogId}`);
        setBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
        if (editingId === blogId) {
          handleReset();
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete blog post.");
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

  // Helper to handle image paths properly (if uploaded via backend vs external URL)
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("blob:") || imagePath.startsWith("http")) {
      return imagePath;
    }
    return `${IMG_URL || "http://localhost:5000"}${imagePath}`;
  };

  return (
    <div className="BlogPost">
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
                  {loadingEdit
                    ? "Loading blog post..."
                    : editingId
                    ? "Update your existing blog post"
                    : "Fill in the details to publish a new blog post"}
                </p>
              </div>
            </div>
          </div>

          <form className="BlogPost-form" onSubmit={handleSubmit}>
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
              <small>URL friendly version of the title</small>
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
                  <span>Supported formats: JPG, PNG, WEBP</span>
                </label>
              ) : (
                <div className="BlogPost-image-preview">
                  <img
                    src={getImageUrl(formData.image)}
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
                <small>{formData.excerpt.length}/200</small>
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
                  apiKey="jeq7g2k84sqpi9364o8x9ptqf09aoesaq8jxmp49dl4sh57z"
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
                  <option key={category} value={category}>
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
                  <option value="Published">Published</option>
                  <option value="Draft">Draft</option>
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

              <button type="submit" className="BlogPost-submit-button">
                <FaPaperPlane />
                {editingId ? "Update Blog Post" : "Publish Blog Post"}
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
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
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
                    <tr
                      key={blog._id}
                      className={blog._id === editingId ? "BlogPost-row-active" : ""}
                    >
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={getImageUrl(blog.image)}
                          alt={blog.title}
                          className="BlogPost-blog-image"
                        />
                      </td>
                      <td>
                        <div className="BlogPost-blog-title">{blog.title}</div>
                        <div className="BlogPost-blog-slug">/{blog.slug}</div>
                      </td>
                      <td>
                        <span className={`BlogPost-category BlogPost-category-${blog.category?.toLowerCase()}`}>
                          {blog.category}
                        </span>
                      </td>
                      <td>
                        <span className="BlogPost-author">{blog.author}</span>
                      </td>
                      <td>
                        <div className="BlogPost-date">
                          <FaCalendarAlt />
                          {formatDate(blog.publishDate || blog.date)}
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
                            onClick={() => handleEdit(blog)}
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            type="button"
                            className="BlogPost-delete-button"
                            onClick={() => handleDelete(blog._id)}
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
                    <td colSpan="8" className="BlogPost-no-data">
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
                  className={`BlogPost-mobile-card ${blog._id === editingId ? "BlogPost-row-active" : ""}`}
                  key={blog._id}
                >
                  <div className="BlogPost-mobile-top">
                    <img
                      src={getImageUrl(blog.image)}
                      alt={blog.title}
                      className="BlogPost-mobile-image"
                    />
                    <div className="BlogPost-mobile-info">
                      <span className="BlogPost-mobile-number">#{index + 1}</span>
                      <h3>{blog.title}</h3>
                      <span className={`BlogPost-category BlogPost-category-${blog.category?.toLowerCase()}`}>
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  <div className="BlogPost-mobile-details">
                    <span>
                      <strong>Author:</strong> {blog.author}
                    </span>
                    <span>
                      <strong>Date:</strong> {formatDate(blog.publishDate || blog.date)}
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
                      onClick={() => handleEdit(blog)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      type="button"
                      className="BlogPost-delete-button"
                      onClick={() => handleDelete(blog._id)}
                    >
                      <FaTrash /> Delete
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
              Showing {filteredBlogs.length} of {blogs.length} entries
            </span>
            <div className="BlogPost-pagination">
              <button type="button">‹</button>
              <button type="button" className="BlogPost-pagination-active">1</button>
              <button type="button">›</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogPost;
import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ChevronDown,
  LayoutGrid,
  List,
  Pencil,
  Trash2,
  User,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  Send,
  FileText,
  Copy,
} from "lucide-react";
import "./BlogManagement.css";
import API, { IMG_URL } from "../../api/axios";

// NOTE: adjust this if your admin routes are nested under a prefix,
// e.g. "/admin/blog/post" instead of "/blog/post".
const BLOG_POST_PATH = "/blog/post";

const CATEGORY_STYLES = {
  Education: "blog-management__tag--education",
  Technology: "blog-management__tag--technology",
  Wellness: "blog-management__tag--wellness",
  Design: "blog-management__tag--design",
  Research: "blog-management__tag--research",
  Analytics: "blog-management__tag--analytics",
  Resources: "blog-management__tag--resources",
};

const CATEGORIES = ["All Categories", "Education", "Technology", "Wellness", "Design", "Research", "Analytics", "Resources"];
const STATUSES = ["All Status", "Published", "Draft"];
const PAGE_SIZE = 8;

const BlogManagement = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [status, setStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [postToDelete, setPostToDelete] = useState(null);

  // Fetch blogs on load
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await API.get("/blogs");
      if (response.data && response.data.success) {
        setPosts(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const filteredPosts = useMemo(() => {
    const term = search.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesSearch =
        !term ||
        post.title.toLowerCase().includes(term) ||
        (post.author && post.author.toLowerCase().includes(term));
      const matchesCategory = category === "All Categories" || post.category === category;
      const matchesStatus = status === "All Status" || post.status === status;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [posts, search, category, status]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pagePosts = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredPosts.slice(start, start + PAGE_SIZE);
  }, [filteredPosts, safePage]);

  const updateFilter = (setter) => (e) => {
    setter(e.target.value);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;
    try {
      await API.delete(`/blogs/${postToDelete._id}`);
      setPosts((prev) => prev.filter((post) => post._id !== postToDelete._id));
      setPostToDelete(null);
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post.");
    }
  };

  // Id-wise redirect to the BlogPost form, pre-loaded for editing.
  const goToEdit = (post) => {
    navigate(`${BLOG_POST_PATH}/${post._id}`);
  };

  const toggleStatus = async (post) => {
    try {
      const newStatus = post.status === "Published" ? "Draft" : "Published";
      const response = await API.put(`/blogs/${post._id}`, { ...post, status: newStatus });
      if (response.data && response.data.success) {
        setPosts((prev) =>
          prev.map((p) => (p._id === post._id ? response.data.data : p))
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to change post status.");
    }
  };

  const duplicatePost = async (post) => {
    try {
      const duplicatedData = {
        title: `${post.title} (Copy)`,
        slug: `${post.slug}-copy-${Date.now()}`,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        image: post.image,
        status: "Draft",
        publishDate: new Date().toISOString().split("T")[0],
      };
      const response = await API.post("/blogs", duplicatedData);
      if (response.data && response.data.success) {
        setPosts((prev) => [response.data.data, ...prev]);
      }
    } catch (error) {
      console.error("Error duplicating post:", error);
      alert("Failed to duplicate post.");
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("blob:") || imagePath.startsWith("http")) {
      return imagePath;
    }
    return `${IMG_URL || "http://localhost:5000"}${imagePath}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const rangeStart = filteredPosts.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(safePage * PAGE_SIZE, filteredPosts.length);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const renderCardMeta = (post) => (
    <>
      <span className={`blog-management__tag ${CATEGORY_STYLES[post.category] || ""}`}>
        {post.category}
      </span>
      <h3 className="blog-management__title">{post.title}</h3>
      <p className="blog-management__excerpt">{post.excerpt}</p>
      <div className="blog-management__byline">
        <span>
          <User size={13} /> {post.author || "Admin"}
        </span>
        <span>
          <Calendar size={13} /> {formatDate(post.publishDate || post.date)}
        </span>
      </div>
    </>
  );

  const renderActions = (post) => (
    <div className="blog-management__actions">
      <span
        className={`blog-management__status blog-management__status--${post.status.toLowerCase()}`}
      >
        {post.status}
      </span>

      <div className="blog-management__action-buttons">
        {/* Publish / Draft Toggle Button */}
        <button
          type="button"
          className={`blog-management__icon-btn ${
            post.status === "Published" ? "blog-management__icon-btn--draft" : "blog-management__icon-btn--publish"
          }`}
          onClick={() => toggleStatus(post)}
          title={post.status === "Published" ? "Move to Draft" : "Publish Now"}
        >
          {post.status === "Published" ? <FileText size={15} /> : <Send size={15} />}
        </button>

        {/* Duplicate Button */}
        <button
          type="button"
          className="blog-management__icon-btn blog-management__icon-btn--duplicate"
          onClick={() => duplicatePost(post)}
          title="Duplicate Post"
        >
          <Copy size={15} />
        </button>

        {/* Edit Button — redirects id-wise to the BlogPost form */}
        <button
          type="button"
          className="blog-management__icon-btn blog-management__icon-btn--edit"
          onClick={() => goToEdit(post)}
          title="Edit Post"
        >
          <Pencil size={15} />
        </button>

        {/* Delete Button */}
        <button
          type="button"
          className="blog-management__icon-btn blog-management__icon-btn--delete"
          onClick={() => setPostToDelete(post)}
          title="Delete Post"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="blog-management">
      <div className="blog-management__toolbar">
        <div className="blog-management__search">
          <Search className="blog-management__search-icon" size={16} aria-hidden="true" />
          <input
            type="text"
            value={search}
            onChange={updateFilter(setSearch)}
            placeholder="Search blogs by title, author..."
            aria-label="Search blogs"
          />
        </div>

        <div className="blog-management__filter-group">
          <div className="blog-management__select-wrap">
            <select value={category} onChange={updateFilter(setCategory)} aria-label="Filter by category">
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown className="blog-management__select-caret" size={14} aria-hidden="true" />
          </div>

          <div className="blog-management__select-wrap">
            <select value={status} onChange={updateFilter(setStatus)} aria-label="Filter by status">
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown className="blog-management__select-caret" size={14} aria-hidden="true" />
          </div>
        </div>

        <div className="blog-management__view-toggle">
          <button
            type="button"
            className={`blog-management__view-btn ${view === "list" ? "blog-management__view-btn--active" : ""}`}
            onClick={() => setView("list")}
            aria-pressed={view === "list"}
          >
            <List size={15} /> List View
          </button>
          <button
            type="button"
            className={`blog-management__view-btn ${view === "grid" ? "blog-management__view-btn--active" : ""}`}
            onClick={() => setView("grid")}
            aria-pressed={view === "grid"}
          >
            <LayoutGrid size={15} /> Grid View
          </button>
        </div>
      </div>

      {pagePosts.length === 0 ? (
        <div className="blog-management__empty">No blog posts match your filters.</div>
      ) : view === "grid" ? (
        <div className="blog-management__grid">
          {pagePosts.map((post) => (
            <article key={post._id} className="blog-management__card">
              <div className="blog-management__thumb">
                <img
                  src={getImageUrl(post.image)}
                  alt={post.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="blog-management__card-body">
                {renderCardMeta(post)}
                {renderActions(post)}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="blog-management__list">
          {pagePosts.map((post) => (
            <article key={post._id} className="blog-management__row">
              <div className="blog-management__thumb blog-management__thumb--row">
                <img
                  src={getImageUrl(post.image)}
                  alt={post.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "12px" }}
                />
              </div>
              <div className="blog-management__row-body">
                {renderCardMeta(post)}
              </div>
              {renderActions(post)}
            </article>
          ))}
        </div>
      )}

      <div className="blog-management__footer">
        <p className="blog-management__count">
          {filteredPosts.length === 0
            ? "No entries found"
            : `Showing ${rangeStart} to ${rangeEnd} of ${filteredPosts.length} entries`}
        </p>
        <div className="blog-management__pagination">
          <button
            type="button"
            className="blog-management__page-btn"
            onClick={() => goToPage(safePage - 1)}
            disabled={safePage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft size={15} />
          </button>
          {pageNumbers.map((page) => (
            <button
              key={page}
              type="button"
              className={`blog-management__page-btn ${
                page === safePage ? "blog-management__page-btn--active" : ""
              }`}
              onClick={() => goToPage(page)}
              aria-current={page === safePage ? "page" : undefined}
            >
              {page}
            </button>
          ))}
          <button
            type="button"
            className="blog-management__page-btn"
            onClick={() => goToPage(safePage + 1)}
            disabled={safePage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {postToDelete && (
        <div className="blog-management__overlay" onClick={() => setPostToDelete(null)} role="presentation">
          <div
            className="blog-management__modal blog-management__modal--sm"
            onClick={(e) => e.stopPropagation()}
            role="alertdialog"
            aria-modal="true"
            aria-label="Confirm delete"
          >
            <div className="blog-management__modal-header">
              <h2>Delete Post</h2>
              <button
                type="button"
                className="blog-management__modal-close"
                onClick={() => setPostToDelete(null)}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            <div className="blog-management__modal-body">
              <p className="blog-management__confirm-text">
                Are you sure you want to delete <strong>{postToDelete.title}</strong>? This
                cannot be undone.
              </p>
            </div>
            <div className="blog-management__modal-footer">
              <button
                type="button"
                className="blog-management__btn blog-management__btn--ghost"
                onClick={() => setPostToDelete(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="blog-management__btn blog-management__btn--danger"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManagement;
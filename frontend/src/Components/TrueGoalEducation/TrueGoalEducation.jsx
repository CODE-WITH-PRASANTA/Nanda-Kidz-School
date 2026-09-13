import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaSearch,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaUser,
  FaArrowRight,
} from "react-icons/fa";

import API, { IMG_URL } from "../../api/axios";
import "./TrueGoalEducation.css";

const TrueGoalEducation = ({ postId }) => {
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [popularPosts, setPopularPosts] = useState([]);
  const [allPublishedBlogs, setAllPublishedBlogs] = useState([]); // Store all published for category counts
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // =========================================================
  // FETCH INITIAL DATA (SINGLE POST & ALL PUBLISHED FOR COUNTS)
  // =========================================================

  useEffect(() => {
    if (postId) {
      fetchSinglePost(postId);
      fetchPublishedBlogs();
      setActiveFilter(null);
    }
  }, [postId]);

  const fetchSinglePost = async (id) => {
    try {
      setLoading(true);
      const response = await API.get(`/blogs/${id}`);
      if (response.data?.success) {
        setBlog(response.data.data);
      } else {
        setBlog(null);
      }
    } catch (error) {
      console.error("Error fetching blog post:", error);
      setBlog(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchPublishedBlogs = async () => {
    try {
      const response = await API.get("/blogs?status=Published");
      if (response.data?.success) {
        const posts = response.data.data;
        setAllPublishedBlogs(posts);
        setPopularPosts(posts.slice(0, 5));
      }
    } catch (error) {
      console.error("Error fetching published posts:", error);
    }
  };

  // Helper to get dynamic count for each category
  const getCategoryCount = (categoryName) => {
    return allPublishedBlogs.filter(
      (item) => item.category?.toLowerCase() === categoryName.toLowerCase()
    ).length;
  };

  // =========================================================
  // SEARCH / CATEGORY FILTERING
  // =========================================================

  const fetchBlogsByCategoryOrSearch = async (
    filterValue,
    isSearch = false
  ) => {
    try {
      setLoading(true);

      const matches = allPublishedBlogs.filter((item) => {
        if (isSearch) {
          const search = filterValue.toLowerCase().trim();
          return (
            item.title?.toLowerCase().includes(search) ||
            item.author?.toLowerCase().includes(search) ||
            item.category?.toLowerCase().includes(search) ||
            item.excerpt?.toLowerCase().includes(search)
          );
        }

        return (
          item.category?.toLowerCase() === filterValue.toLowerCase()
        );
      });

      setFilteredBlogs(matches);
    } catch (error) {
      console.error("Error filtering blogs:", error);
      setFilteredBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // IMAGE URL
  // =========================================================

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (
      imagePath.startsWith("blob:") ||
      imagePath.startsWith("http://") ||
      imagePath.startsWith("https://")
    ) {
      return imagePath;
    }
    return `${IMG_URL || "http://localhost:5000"}${imagePath}`;
  };

  // =========================================================
  // DATE FORMAT
  // =========================================================

  const formatDate = (dateString) => {
    if (!dateString) return "September 13, 2026";
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
      return "September 13, 2026";
    }
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // =========================================================
  // BACK TO BLOGS
  // =========================================================

  const handleBackToBlogs = () => {
    setActiveFilter(null);
    navigate("/blogs");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setActiveFilter(`Search: "${searchQuery}"`);
    fetchBlogsByCategoryOrSearch(searchQuery, true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // CATEGORY CLICK
  // =========================================================

  const handleSidebarClick = (categoryName) => {
    setActiveFilter(categoryName);
    fetchBlogsByCategoryOrSearch(categoryName, false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading && !blog) {
    return (
      <div className="tge-loading-screen">
        <div className="tge-loader"></div>
        <p>Loading article...</p>
      </div>
    );
  }

  // =========================================================
  // FILTERED BLOG VIEW (GRID)
  // =========================================================

  if (activeFilter) {
    return (
      <div className="tge-page-container">
        {/* BREADCRUMB */}
        <div className="tge-breadcrumb-bar">
          <div className="tge-container">
            <p className="tge-breadcrumb-text">
              <span>Home</span>
              <span>/</span>
              <span>Blogs</span>
              <span>/</span>
              <strong>{activeFilter}</strong>
            </p>
          </div>
        </div>

        <div className="tge-container tge-filter-wrapper">
          {/* BACK TO ARTICLE */}
          <button
            type="button"
            className="tge-back-article"
            onClick={() => setActiveFilter(null)}
          >
            <FaChevronLeft />
            <span>Back to Article</span>
          </button>

          {/* FILTER HEADER */}
          <div className="tge-filter-header">
            <span className="tge-small-label">BLOG COLLECTION</span>
            <h1>{activeFilter}</h1>
            <p>
              Explore our latest articles, insights and educational resources.
            </p>
          </div>

          {/* EMPTY */}
          {filteredBlogs.length === 0 ? (
            <div className="tge-empty-state">
              <h3>No articles found</h3>
              <p>We couldn't find any blog posts matching your selection.</p>
            </div>
          ) : (
            <div className="tge-blog-grid">
              {filteredBlogs.map((post) => (
                <article
                  key={post._id}
                  className="tge-grid-card"
                  onClick={() => navigate(`/blog/${post._id}`)}
                >
                  <div className="tge-grid-image">
                    {post.image && (
                      <img
                        src={getImageUrl(post.image)}
                        alt={post.title || "Blog article"}
                      />
                    )}
                    <span className="tge-grid-category">
                      {post.category || "Article"}
                    </span>
                  </div>

                  <div className="tge-grid-content">
                    <div className="tge-grid-meta">
                      <FaCalendarAlt />
                      <span>
                        {formatDate(post.publishDate || post.date)}
                      </span>
                    </div>

                    <h3>{post.title}</h3>

                    {post.excerpt && <p>{post.excerpt}</p>}

                    <span className="tge-read-more">
                      Read Article
                      <FaArrowRight />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // =========================================================
  // ARTICLE NOT FOUND
  // =========================================================

  if (!blog) {
    return (
      <div className="tge-not-found">
        <h2>Article Not Found</h2>
        <p>The requested article could not be found.</p>
        <button type="button" onClick={handleBackToBlogs}>
          Back to Blogs
        </button>
      </div>
    );
  }

  // =========================================================
  // MAIN BLOG DETAILS
  // =========================================================

  return (
    <div className="tge-page-container">
      {/* BREADCRUMB */}
      <div className="tge-breadcrumb-bar">
        <div className="tge-container">
          <p className="tge-breadcrumb-text">
            <span>Home</span>
            <span>/</span>
            <span>Blogs</span>
            <span>/</span>
            <strong>{blog.category || "Article"}</strong>
          </p>
        </div>
      </div>

      <div className="tge-container">
        <div className="tge-main-wrapper">
          {/* LEFT COLUMN */}
          <main className="tge-left-column">
            {/* FEATURE IMAGE */}
            {blog.image && (
              <div className="tge-main-image-wrapper">
                <img
                  src={getImageUrl(blog.image)}
                  alt={blog.title || "Blog article"}
                  className="tge-main-image"
                />
                <div className="tge-image-overlay">
                  <span>{blog.category || "Article"}</span>
                </div>
              </div>
            )}

            {/* META */}
            <div className="tge-post-meta">
              <div>
                <FaCalendarAlt />
                <span>
                  {formatDate(blog.publishDate || blog.date)}
                </span>
              </div>

              <div>
                <FaUser />
                <span>{blog.author || "Admin"}</span>
              </div>

              {blog.category && (
                <div className="tge-meta-category">{blog.category}</div>
              )}
            </div>

            {/* TITLE */}
            <h1 className="tge-post-title">{blog.title}</h1>

            {/* EXCERPT */}
            {blog.excerpt && (
              <div className="tge-post-excerpt">{blog.excerpt}</div>
            )}

            {/* DATABASE CONTENT */}
            <div
              className="tge-blog-content"
              dangerouslySetInnerHTML={{
                __html: blog.content || "",
              }}
            />
          </main>

          {/* RIGHT SIDEBAR */}
          <aside className="tge-right-column">
            {/* SEARCH */}
            <div className="tge-sidebar-card">
              <div className="tge-sidebar-heading">
                <span className="tge-sidebar-line"></span>
                <h3>Search Articles</h3>
              </div>

              <form onSubmit={handleSearchSubmit} className="tge-search-box">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="tge-search-input"
                />
                <button type="submit" className="tge-search-btn">
                  <FaSearch />
                </button>
              </form>
            </div>

            {/* POPULAR POSTS */}
            <div className="tge-sidebar-card">
              <div className="tge-sidebar-heading">
                <span className="tge-sidebar-line"></span>
                <h3>Popular Posts</h3>
              </div>

              <div className="tge-popular-list">
                {popularPosts.map((item) => (
                  <div
                    key={item._id}
                    className="tge-popular-item"
                    onClick={() => navigate(`/blog/${item._id}`)}
                  >
                    <div className="tge-popular-image">
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.title || "Popular post"}
                      />
                    </div>
                    <div className="tge-popular-info">
                      <span className="tge-popular-date">
                        {formatDate(item.publishDate || item.date)}
                      </span>
                      <h4 className="tge-popular-heading">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CATEGORIES WITH DYNAMIC NUMBER COUNTS */}
            <div className="tge-sidebar-card">
              <div className="tge-sidebar-heading">
                <span className="tge-sidebar-line"></span>
                <h3>Categories</h3>
              </div>

              <ul className="tge-categories-list">
                {[
                  "Education",
                  "Technology",
                  "Wellness",
                  "Design",
                  "Research",
                  "Analytics",
                ].map((cat) => {
                  const count = getCategoryCount(cat);
                  return (
                    <li
                      key={cat}
                      onClick={() => handleSidebarClick(cat)}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span className="tge-category-dot"></span>
                        <span>{cat}</span>
                      </div>
                      <span
                        style={{
                          background: "#f4f8ff",
                          color: "#1848c1",
                          padding: "2px 8px",
                          borderRadius: "12px",
                          fontSize: "0.78rem",
                          fontWeight: "700",
                        }}
                      >
                        ({count < 10 ? `0${count}` : count})
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default TrueGoalEducation;
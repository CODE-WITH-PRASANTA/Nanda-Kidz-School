import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaSearch, 
  FaCheck, 
  FaBookmark, 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaChevronLeft, 
  FaChevronRight,
  FaUser,
  FaCalendarAlt
} from 'react-icons/fa';
import API, { IMG_URL } from "../../api/axios";

// Static UI assets fallback
import avatarImg from '../../assets/blog-5.jpg';
import './TrueGoalEducation.css';

const TrueGoalEducation = ({ postId }) => {
  const navigate = useNavigate();
  
  // Blog Data States
  const [blog, setBlog] = useState(null);
  const [popularPosts, setPopularPosts] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [activeFilter, setActiveFilter] = useState(null); // Tracks category selection
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [breadcrumb, setBreadcrumb] = useState('Home / Blog Details');

  // Fetch the specific blog post and popular sidebar posts on load or when postId changes
  useEffect(() => {
    if (postId) {
      fetchSinglePost(postId);
      fetchPopularPosts();
      setActiveFilter(null); // Reset grid view filter when viewing single post
    }
  }, [postId]);

  const fetchSinglePost = async (id) => {
    try {
      setLoading(true);
      const response = await API.get(`/blogs/${id}`);
      if (response.data && response.data.success) {
        const postData = response.data.data;
        setBlog(postData);
        setBreadcrumb(`Home / Blog Details / ${postData.category || 'Article'}`);
      }
    } catch (error) {
      console.error("Error fetching blog post details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPopularPosts = async () => {
    try {
      const response = await API.get("/blogs?status=Published");
      if (response.data && response.data.success) {
        setPopularPosts(response.data.data.slice(0, 5)); // Grab top 5 for sidebar
      }
    } catch (error) {
      console.error("Error fetching popular sidebar posts:", error);
    }
  };

  const fetchBlogsByCategory = async (categoryValue) => {
    try {
      setLoading(true);
      const response = await API.get("/blogs?status=Published");
      if (response.data && response.data.success) {
        const allPublished = response.data.data;
        // Filter by category
        const matches = allPublished.filter(
          (item) => item.category?.toLowerCase() === categoryValue.toLowerCase()
        );
        setFilteredBlogs(matches);
      }
    } catch (error) {
      console.error("Error filtering blogs:", error);
    } finally {
      setLoading(false);
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
    if (!dateString) return "September 31, 2026";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/blogs?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSidebarClick = (categoryName) => {
    setActiveFilter(categoryName);
    setBreadcrumb(`Home / Blogs / ${categoryName}`);
    fetchBlogsByCategory(categoryName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "100px", fontSize: "1.2rem", color: "#64748b" }}>Loading content...</div>;
  }

  // If user clicked a category filter, display results in Grid View
  if (activeFilter) {
    return (
      <div className="tge-page-container">
        <div className="tge-breadcrumb-bar">
          <p className="tge-breadcrumb-text">{breadcrumb} ({filteredBlogs.length} results)</p>
        </div>

        <div className="tge-main-wrapper" style={{ display: "block", padding: "20px" }}>
          <button 
            onClick={() => setActiveFilter(null)} 
            style={{ marginBottom: "20px", padding: "8px 16px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer" }}
          >
            ← Back to Article
          </button>

          {filteredBlogs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "50px", color: "#64748b" }}>No blog posts found for "{activeFilter}".</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
              {filteredBlogs.map((post) => (
                <div 
                  key={post._id} 
                  onClick={() => navigate(`/blog/${post._id}`)}
                  style={{ background: "#fff", border: "1px solid #e3e9f5", borderRadius: "12px", overflow: "hidden", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                >
                  <div style={{ height: "180px", overflow: "hidden" }}>
                    <img src={getImageUrl(post.image)} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "16px" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: "700", color: "#2563eb", background: "#e4edff", padding: "3px 10px", borderRadius: "999px" }}>{post.category}</span>
                    <h3 style={{ fontSize: "1.1rem", margin: "10px 0", color: "#0b2f6b" }}>{post.title}</h3>
                    <p style={{ fontSize: "0.85rem", color: "#64748b", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{post.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!blog) {
    return <div style={{ textAlign: "center", padding: "100px", fontSize: "1.2rem", color: "#e0392f" }}>Requested article could not be found.</div>;
  }

  return (
    <div className="tge-page-container">
      {/* Dynamic Breadcrumb Bar */}
      <div className="tge-breadcrumb-bar">
        <p className="tge-breadcrumb-text">{breadcrumb}</p>
      </div>

      <div className="tge-main-wrapper">
        {/* LEFT COLUMN: Main Blog Content & Comments */}
        <div className="tge-left-column">
          {/* Main Feature Image */}
          {blog.image && (
            <div className="tge-main-image-wrapper">
              <img 
                src={getImageUrl(blog.image)} 
                alt={blog.title} 
                className="tge-main-image"
              />
            </div>
          )}

          {/* Meta Information */}
          <div className="tge-post-meta">
            <span>Posted On: <strong className="tge-text-dark">{formatDate(blog.publishDate || blog.date)}</strong></span>
            <span className="tge-meta-separator">–</span>
            <span>Posted By: <strong className="tge-text-dark">{blog.author || "Admin"}</strong></span>
            <span className="tge-meta-separator">–</span>
            <span>Category: <strong className="tge-text-dark">{blog.category}</strong></span>
          </div>

          {/* Post Title */}
          <h1 className="tge-post-title">
            {blog.title}
          </h1>

          {/* Excerpt / Short Summary */}
          {blog.excerpt && (
            <p className="tge-paragraph" style={{ fontWeight: "500", fontSize: "1.1rem" }}>
              {blog.excerpt}
            </p>
          )}

          {/* Render Full TinyMCE HTML Content safely */}
          <div 
            className="tge-paragraph" 
            dangerouslySetInnerHTML={{ __html: blog.content }} 
          />

          {/* Highlight Quote Box */}
          <blockquote className="tge-quote-box">
            "Education is the most powerful weapon which you can use to change the world."
          </blockquote>

          {/* Offer Checklist Section */}
          <h2 className="tge-section-title">Four Major Elements That We Offer:</h2>
          <ul className="tge-check-list">
            <li>
              <span className="tge-check-icon light"><FaCheck /></span>
              Your child’s interests, likes, and individual learning pace
            </li>
            <li>
              <span className="tge-check-icon light"><FaCheck /></span>
              Daily routines, patterns of engagement, and wellbeing
            </li>
            <li>
              <span className="tge-check-icon light"><FaCheck /></span>
              Safe classroom environment and interactive activities
            </li>
            <li>
              <span className="tge-check-icon filled"><FaCheck /></span>
              Continuous communication and progress updates for parents.
            </li>
          </ul>

          {/* Tags & Social Share Footer */}
          <div className="tge-post-footer">
            <div className="tge-footer-tags">
              <FaBookmark className="tge-bookmark-icon" />
              <span>{blog.category}, Preschool, Children</span>
            </div>
            <div className="tge-social-share">
              <span>Share:</span>
              <button className="tge-social-btn" aria-label="Share on Facebook"><FaFacebookF /></button>
              <button className="tge-social-btn" aria-label="Share on Twitter"><FaTwitter /></button>
              <button className="tge-social-btn" aria-label="Share on Instagram"><FaInstagram /></button>
            </div>
          </div>

          {/* Post Navigation Controls */}
          <div className="tge-post-nav">
            <button className="tge-nav-btn" onClick={() => navigate('/blogs')}><FaChevronLeft /> Back to Blogs</button>
            <button className="tge-nav-btn" onClick={() => navigate('/blogs')}>More Articles <FaChevronRight /></button>
          </div>

          {/* Comments Section */}
          <div className="tge-comments-section">
            <h3 className="tge-comments-title">Comments:</h3>

            <div className="tge-comment-card">
              <img src={avatarImg} alt="John Jones" className="tge-avatar" />
              <div className="tge-comment-content">
                <h4>John Jones</h4>
                <p className="tge-comment-date">April 24, 2026 at 10:59 am</p>
                <p className="tge-comment-body">This article provides wonderful insight into modern early learning frameworks!</p>
                <button className="tge-reply-btn">Reply</button>
              </div>
            </div>
          </div>

          {/* Leave a Reply Form Section */}
          <div className="tge-reply-form-wrapper">
            <h3 className="tge-form-title">Leave a Reply</h3>
            <p className="tge-form-subtitle">Your email address will not be published. Required fields are marked <span className="tge-required">*</span></p>
            
            <form onSubmit={(e) => { e.preventDefault(); alert("Comment submitted successfully!"); }}>
              <div className="tge-form-row">
                <input type="text" placeholder="Your Name*" required className="tge-input" />
                <input type="email" placeholder="Your Email*" required className="tge-input" />
              </div>
              <input type="text" placeholder="Website" className="tge-input full-width" />
              <textarea placeholder="Your Comment..." rows="5" className="tge-textarea" required></textarea>
              
              <div className="tge-checkbox-row">
                <input type="checkbox" id="save-info" />
                <label htmlFor="save-info">Save my name, email, and website in this browser for the next time I comment.</label>
              </div>

              <button type="submit" className="tge-submit-btn">Post A Comment</button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Sidebar */}
        <aside className="tge-right-column">
          {/* Search Widget */}
          <div className="tge-sidebar-card">
            <h3 className="tge-sidebar-title">Search</h3>
            <form onSubmit={handleSearchSubmit} className="tge-search-box">
              <input 
                type="text" 
                placeholder="Search..." 
                className="tge-search-input" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="tge-search-btn" aria-label="Search"><FaSearch /></button>
            </form>
          </div>

          {/* Popular Posts Widget (Dynamic from DB) */}
          <div className="tge-sidebar-card">
            <h3 className="tge-sidebar-title">Popular Posts</h3>
            <div className="tge-popular-list">
              {popularPosts.map((item) => (
                <div key={item._id} className="tge-popular-item" onClick={() => navigate(`/blog/${item._id}`)}>
                  <img src={getImageUrl(item.image)} alt={item.title} className="tge-popular-img" />
                  <div className="tge-popular-info">
                    <span className="tge-popular-date">{formatDate(item.publishDate || item.date)}</span>
                    <h4 className="tge-popular-heading">{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories Widget */}
          <div className="tge-sidebar-card">
            <h3 className="tge-sidebar-title">Categories</h3>
            <ul className="tge-categories-list">
              {['Education', 'Technology', 'Wellness', 'Design', 'Research', 'Analytics'].map((cat, idx) => (
                <li key={idx} className="tge-category-item" onClick={() => handleSidebarClick(cat)}>
                  <span className="tge-orange-dot"></span>
                  {cat}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TrueGoalEducation;
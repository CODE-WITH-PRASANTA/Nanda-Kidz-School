import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // <-- Import useNavigate
import {
  FiChevronLeft,
  FiChevronRight,
  FiArrowRight,
} from "react-icons/fi";
import "./Blogpicture.css";
import API, { IMG_URL } from "../../api/axios";

const Blogpicture = () => {
  const navigate = useNavigate(); // <-- Initialize navigate hook
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  useEffect(() => {
    fetchPublishedBlogs();
  }, []);

  const fetchPublishedBlogs = async () => {
    try {
      setLoading(true);
      const response = await API.get("/blogs?status=Published");
      if (response.data && response.data.success) {
        setBlogs(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching public blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.max(1, Math.ceil(blogs.length / postsPerPage));
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
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
    if (!dateString) return "25 Dec 2026";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <section className="Blogpicture">
      <div className="Blogpicture-container">
        <div className="Blogpicture-header">
          <span className="Blogpicture-eyebrow">From Our Founder & Teachers</span>
          <h1 className="Blogpicture-main-title">which school is best for my child?</h1>
          <div className="Blogpicture-title-line"></div>
          <p className="Blogpicture-intro">
            Choosing the right first school is an important decision for every parent. At Nanda Kidz, our founder brings an educational background, a clear vision for early learning and hands-on guidance to create a warm beginning for toddlers.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>Loading articles...</div>
        ) : blogs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>No blog posts published yet.</div>
        ) : (
          <div className="Blogpicture-grid">
            {currentPosts.map((post) => (
              <article key={post._id} className="Blogpicture-card">
                <div className="Blogpicture-image-wrapper">
                  <img
                    src={getImageUrl(post.image)}
                    alt={post.title}
                    className="Blogpicture-image"
                    loading="lazy"
                  />
                </div>

                <div className="Blogpicture-content">
                  <div className="Blogpicture-meta">
                    <span>
                      <strong className="Blogpicture-accent">By:</strong> {post.author || "Nanda Kidz"}
                    </span>
                    <span>
                      <strong className="Blogpicture-accent">Date:</strong> {formatDate(post.publishDate || post.date)}
                    </span>
                  </div>

                  <h2 className="Blogpicture-title">{post.title}</h2>

                  <p className="Blogpicture-excerpt">
                    {post.excerpt || post.content?.replace(/<[^>]*>?/gm, "").substring(0, 120) + "..."}
                  </p>

                  {/* ID-wise Redirection on Read More Click */}
                  <button
                    type="button"
                    className="Blogpicture-readmore-btn"
                    onClick={() => navigate(`/blog/${post._id}`)}
                  >
                    <span>Read More</span>
                    <FiArrowRight className="Blogpicture-readmore-icon" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {!loading && blogs.length > 0 && (
          <div className="Blogpicture-pagination" aria-label="Blog pagination">
            <button
              type="button"
              className="Blogpicture-page-btn Blogpicture-arrow-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FiChevronLeft />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                type="button"
                key={page}
                className={`Blogpicture-page-btn ${currentPage === page ? "active" : ""}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              className="Blogpicture-page-btn Blogpicture-arrow-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FiChevronRight />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogpicture;
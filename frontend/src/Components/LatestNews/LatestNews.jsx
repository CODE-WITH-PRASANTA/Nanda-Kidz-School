import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./LatestNews.css";

// Local assets
import newsImg1 from "../../assets/c-1.webp";
import newsImg2 from "../../assets/c-3.webp";
import newsImg3 from "../../assets/c-8.webp";

const blogData = [
  {
    id: 1,
    image: newsImg1,
    admin: "Nanda Kidz",
    date: "Early Learning",
    title: "A Happy Beginning to Your Child's School Journey",
    description:
      "At Nanda Kidz, children learn through play, stories, music, creative activities, and friendly classroom experiences that make their first school years enjoyable and meaningful.",
  },
  {
    id: 2,
    image: newsImg2,
    admin: "Nanda Kidz",
    date: "Parent Guide",
    title: "Choosing the Right Nursery School for Your Child",
    description:
      "Finding a nursery school is an important decision for parents. A warm environment, caring teachers, engaging activities, and a child-friendly approach can make a big difference.",
  },
  {
    id: 3,
    image: newsImg3,
    admin: "Nanda Kidz",
    date: "School Activities",
    title: "Learning, Playing and Growing Together",
    description:
      "Every activity at Nanda Kidz gives children a chance to explore something new, build confidence, make friends, and develop important skills at their own pace.",
  },
];

// Helper for admin avatar initials
const getInitials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const LatestNews = () => {
  const navigate = useNavigate();
  const [lightboxItem, setLightboxItem] = useState(null);

  const handleCardClick = (id) => {
    navigate(`/blog/${id}`);
  };

  const openLightbox = (e, item) => {
    e.stopPropagation();
    setLightboxItem(item);
  };

  const closeLightbox = useCallback(() => {
    setLightboxItem(null);
  }, []);

  // Close image preview with Escape
  useEffect(() => {
    if (!lightboxItem) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeLightbox();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Prevent page scrolling while preview is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxItem, closeLightbox]);

  return (
    <section
      className="latest-news-section"
      aria-labelledby="latest-news-heading"
    >
      <div className="latest-news-container">

        {/* Section Header */}
        <div className="latest-news-header">
          <span className="latest-news-subtitle">
            From Nanda Kidz
          </span>

          <h1
            id="latest-news-heading"
            className="latest-news-title"
          >
            Best Kids School in Bhubaneswar
          </h1>

          <div className="latest-news-underline"></div>

          <p className="latest-news-intro">
            Discover helpful ideas, school activities, and early learning
            stories from Nanda Kidz — a child-friendly place where little
            learners can play, explore, learn, and grow with confidence.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="latest-news-grid">
          {blogData.map((item) => (
            <article
              key={item.id}
              className="news-card"
              onClick={() => handleCardClick(item.id)}
            >
              {/* Image */}
              <div
                className="news-image-wrapper"
                onClick={(e) => openLightbox(e, item)}
                role="button"
                tabIndex={0}
                aria-label={`View larger image for ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openLightbox(e, item);
                  }
                }}
              >
                <img
                  src={item.image}
                  alt={`${item.title} - Nanda Kidz`}
                  className="news-image"
                  width="370"
                  height="250"
                  loading="lazy"
                />

                <div className="news-image-overlay">
                  <span className="news-image-zoom-icon">
                    ⤢
                  </span>
                </div>

                <span className="news-date-badge">
                  {item.date}
                </span>
              </div>

              {/* Card Content */}
              <div className="news-content">

                <div className="news-meta">
                  <span className="news-meta-item news-meta-admin">
                    <span className="meta-avatar">
                      {getInitials(item.admin)}
                    </span>

                    <span className="meta-value">
                      {item.admin}
                    </span>
                  </span>
                </div>

                <h2 className="news-card-title">
                  {item.title}
                </h2>

                <p className="news-description">
                  {item.description}
                </p>

                <button
                  type="button"
                  className="news-read-more-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(item.id);
                  }}
                >
                  Read More
                  <span className="news-read-more-arrow">
                    →
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* SEO Supporting Content */}
        <div className="latest-news-seo-content">
          <div className="latest-news-seo-line"></div>

          <h2>
            Choosing a Play School Near Khandagiri, Bhubaneswar
          </h2>

          <p>
            Parents looking for the <strong>best kids school in
            Bhubaneswar</strong> often want more than just a classroom.
            Children need a place where they feel comfortable, cared for,
            and encouraged to learn in their own way. Nanda Kidz focuses on
            creating a joyful early-learning experience through play,
            creativity, stories, activities, and everyday interaction.
          </p>

          <p>
            If you are comparing a <strong>top best nursery school in
            Bhubaneswar</strong>, look for an environment that supports
            your child's social, emotional, creative, and learning needs.
            Our approach is designed to help children become comfortable
            with school while gradually developing communication, curiosity,
            confidence, and independence.
          </p>

          <p>
            Parents searching for a <strong>best play school in Bhubaneswar
            with fees</strong> can also consider what is included beyond
            the basic classroom experience. A good early-learning program
            should provide meaningful activities, caring guidance, a safe
            environment, and opportunities for children to learn through
            real experiences.
          </p>

          <p>
            Located for families searching for a{" "}
            <strong>play school near Khandagiri, Bhubaneswar</strong>,
            Nanda Kidz aims to make the early years of education happy,
            comfortable, and full of discovery.
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <div
          className="news-lightbox-backdrop"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <div
            className="news-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="news-lightbox-close"
              onClick={closeLightbox}
              aria-label="Close image preview"
            >
              ×
            </button>

            <img
              src={lightboxItem.image}
              alt={`${lightboxItem.title} - Nanda Kidz`}
              className="news-lightbox-image"
            />

            <div className="news-lightbox-caption">
              <h3>{lightboxItem.title}</h3>

              <span>
                {lightboxItem.date}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LatestNews;
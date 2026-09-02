import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './LatestNews.css';

// Import your assets from your local assets folder
import newsImg1 from '../../assets/c-1.webp';
import newsImg2 from '../../assets/c-3.webp';
import newsImg3 from '../../assets/c-8.webp';

const blogData = [
  {
    id: 1,
    image: newsImg1,
    admin: 'Jack John',
    date: '25 Dec 2026',
    title: 'Red Green Color Blindness',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 2,
    image: newsImg2,
    admin: 'Glims Bond',
    date: '26 Dec 2026',
    title: '8 Ways to Learning Lesson',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 3,
    image: newsImg3,
    admin: 'Smith Broke',
    date: '27 Dec 2026',
    title: 'Full-Day Session With Activities',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

// Helper: initials for the admin avatar badge
const getInitials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
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

  // Close on Escape key
  useEffect(() => {
    if (!lightboxItem) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // lock scroll while open

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxItem, closeLightbox]);

  return (
    <section className="latest-news-section">
      <div className="latest-news-container">
        {/* Header Section */}
        <div className="latest-news-header">
          <span className="latest-news-subtitle">News and Blog</span>
          <h2 className="latest-news-title">Latest News</h2>
          <div className="latest-news-underline"></div>
        </div>

        {/* Cards Grid */}
        <div className="latest-news-grid">
          {blogData.map((item) => (
            <article
              key={item.id}
              className="news-card"
              onClick={() => handleCardClick(item.id)}
            >
              {/* Image Container with Zoom Animation + Click-to-Pop */}
              <div
                className="news-image-wrapper"
                onClick={(e) => openLightbox(e, item)}
                role="button"
                tabIndex={0}
                aria-label={`View larger image for ${item.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') openLightbox(e, item);
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="news-image"
                  width="370"
                  height="250"
                  loading="lazy"
                />
                <div className="news-image-overlay">
                  <span className="news-image-zoom-icon">⤢</span>
                </div>
                <span className="news-date-badge">{item.date}</span>
              </div>

              {/* Content Section */}
              <div className="news-content">
                <div className="news-meta">
                  <span className="news-meta-item news-meta-admin">
                    <span className="meta-avatar">{getInitials(item.admin)}</span>
                    <span className="meta-value">{item.admin}</span>
                  </span>
                </div>

                <h3 className="news-card-title">{item.title}</h3>

                <p className="news-description">{item.description}</p>

                <button
                  type="button"
                  className="news-read-more-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(item.id);
                  }}
                >
                  Read More
                  <span className="news-read-more-arrow">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox / Image Pop Modal */}
      {lightboxItem && (
        <div
          className="news-lightbox-backdrop"
          onClick={closeLightbox}
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
              alt={lightboxItem.title}
              className="news-lightbox-image"
            />

            <div className="news-lightbox-caption">
              <h4>{lightboxItem.title}</h4>
              <span>{lightboxItem.date}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LatestNews;
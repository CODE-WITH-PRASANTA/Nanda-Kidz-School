import React from 'react';
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

const LatestNews = () => {
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    <section className="latest-news-section">
      <div className="latest-news-container">
        {/* Header Section */}
        <div className="latest-news-header">
          <span className="latest-news-subtitle">News and Blog</span>
          <h2 className="latest-news-title">Latest News</h2>
        </div>

        {/* Cards Grid */}
        <div className="latest-news-grid">
          {blogData.map((item) => (
            <article
              key={item.id}
              className="news-card"
              onClick={() => handleCardClick(item.id)}
            >
              {/* Image Container with Zoom Animation */}
              <div className="news-image-wrapper">
                <img
                  src={item.image}
                  alt={item.title}
                  className="news-image"
                  width="370"
                  height="250"
                  loading="lazy"
                />
              </div>

              {/* Content Section */}
              <div className="news-content">
                <div className="news-meta">
                  <span className="news-meta-item">
                    <span className="meta-label">By Admin:</span>{' '}
                    <span className="meta-value">{item.admin}</span>
                  </span>
                  <span className="news-meta-item">
                    <span className="meta-label">Date:</span>{' '}
                    <span className="meta-value">{item.date}</span>
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
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
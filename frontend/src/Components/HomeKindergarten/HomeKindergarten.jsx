import React from 'react';
import './HomeKindergarten.css';

import boyImg from '../../assets/aboutus.webp';
import owlImg from '../../assets/who-we-are-shape1.png';
import founderSign from '../../assets/nanda image .png'; // Optional founder signature or logo asset

const HomeKindergarten = () => {
  const handleReadMoreClick = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const features = [
    { id: 1, text: 'Homelike Environment' },
    { id: 2, text: 'Quality Educators' },
    { id: 3, text: 'Safety and Security' },
    { id: 4, text: 'Play to Learn' },
  ];

  return (
    <section className="hk-section">
      <div className="hk-container">
        {/* Floating Owl Mascot */}
        <div className="hk-owl-container">
          <img src={owlImg} alt="Kindergarten Owl Mascot" className="hk-owl-image" />
        </div>

        {/* Left Side: Decorative blob + full, uncropped image */}
        <div className="hk-media-column">
          <div className="hk-blob-wrapper">
            {/* Decorative rotating morph blob (background only) */}
            <div className="hk-morph-blob"></div>

            {/* Photo Frame — rounded square, NOT a circle, so the full image always fits */}
            <div className="hk-image-frame">
              <img src={boyImg} alt="Children learning happily at Nanda Kidz" className="hk-boy-image" />
            </div>

            {/* Small accent dots for extra polish */}
            <div className="hk-accent-dot hk-accent-dot-1"></div>
            <div className="hk-accent-dot hk-accent-dot-2"></div>
          </div>
        </div>

        {/* Right Side: Information Content */}
        <div className="hk-content-column">
          <span className="hk-subtitle">Who We Are</span>
          <h2 className="hk-heading">Kindergarten and Childhood is Our Passion</h2>

          <p className="hk-text-description">
            At Nanda Kidz Play School & Kindergarten, we cultivate a loving, joyful atmosphere where every child explores their unique potential through creative play, expert guidance, and structured foundational growth.
          </p>
          <p className="hk-text-description">
            Our specialized curriculum balances intellectual curiosity with emotional well-being, ensuring a secure and inspiring second home for your little ones.
          </p>

          <div className="hk-features-grid">
            {features.map((feature) => (
              <div key={feature.id} className="hk-feature-card">
                <span className="hk-feature-badge">{feature.id}</span>
                <span className="hk-feature-label">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Enhanced Action Area: Read More Button + Founder Profile Badge Side-by-Side */}
          <div className="hk-action-row">
            <button className="hk-btn-primary" onClick={handleReadMoreClick}>
              Read More
            </button>

            <div className="hk-founder-badge-card">
              <div className="hk-founder-avatar-wrap">
                <img src={founderSign} alt="Principal Director" className="hk-founder-img" />
              </div>
              <div className="hk-founder-info">
                <h4 className="hk-founder-name">Mrs. Nanda Mishra</h4>
                <p className="hk-founder-title">Founder & Director</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeKindergarten;
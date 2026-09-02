import React from 'react';
import './HomeKindergarten.css';

import boyImg from '../../assets/aboutus.webp';
import owlImg from '../../assets/who-we-are-shape1.png';

const HomeKindergarten = () => {
  // Handles scroll-to-top when clicking 'Read More'
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

        {/* Left Side: Image with 50/50 Red & Orange Morphing Blob Animation */}
        <div className="hk-media-column">
          <div className="hk-blob-wrapper">
            {/* Morphing Organic Background Layer (50% Red, 50% Orange) */}
            <div className="hk-morph-blob"></div>
            
            {/* Main Orange Ring Accent */}
            <div className="hk-orange-ring"></div>

            {/* Boy Image Frame */}
            <div className="hk-image-frame">
              <img src={boyImg} alt="Boy playing with toy cars" className="hk-boy-image" />
            </div>
          </div>
        </div>

        {/* Right Side: Information Content */}
        <div className="hk-content-column">
          <span className="hk-subtitle">Who We Are</span>
          <h2 className="hk-heading">Kindergarten and Childhood is Our Passion</h2>

          <p className="hk-text-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
            Risus commodo viverra maecenas accumsan lacus vel facilisis.
          </p>
          <p className="hk-text-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>

          {/* Features Grid */}
          <div className="hk-features-grid">
            {features.map((feature) => (
              <div key={feature.id} className="hk-feature-card">
                <span className="hk-feature-badge">{feature.id}</span>
                <span className="hk-feature-label">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Read More Action Button */}
          <div className="hk-action-area">
            <button className="hk-btn-primary" onClick={handleReadMoreClick}>
              Read More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeKindergarten;
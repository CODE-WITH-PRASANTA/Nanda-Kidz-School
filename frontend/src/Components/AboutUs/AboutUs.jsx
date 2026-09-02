import React from 'react';
import './AboutUs.css';

// Import local assets as needed
import starImg from '../../assets/star.webp';
import rocketImg from '../../assets/rocket.webp';
import capImg from '../../assets/aboutuscap.webp';
import studentImg from '../../assets/aboutus.webp';

const AboutUs = () => {
  return (
    <section className="about-us-container">
      {/* Ambient background glow elements */}
      <div className="about-ambient about-ambient--1"></div>
      <div className="about-ambient about-ambient--2"></div>

      <div className="about-us-content">
        
        {/* Left Section: Organic Animated Blob & Image */}
        <div className="image-section">
          {/* Top Left Decorative Shooting Star */}
          <img src={starImg} alt="Star Illustration" className="decorative-star" />

          {/* Main Organic Outer Wrapper */}
          <div className="blob-wrapper">
            
            {/* Animated Top Circle Dot */}
            <span className="blob-dot top-dot"></span>

            {/* Organic Pink Border Frame with Breathing Animation */}
            <div className="blob-border">
              {/* Inner Clipped Container for Student Image */}
              <div className="blob-image-container">
                <img src={studentImg} alt="Students Studying" className="student-image" />
                <div className="blob-image-shine"></div>
              </div>
            </div>

            {/* Floating Experience Badge */}
            <div className="about-experience-badge">
              <span className="badge-icon">🌟</span>
              <div>
                <strong>10+ Years</strong>
                <small>Trusted Education</small>
              </div>
            </div>

            {/* Animated Bottom Right Circle Dot */}
            <span className="blob-dot bottom-dot"></span>
          </div>
        </div>

        {/* Right Section: Content */}
        <div className="text-section">
          {/* Decorative Rocket */}
          <img src={rocketImg} alt="Rocket Illustration" className="decorative-rocket" />

          {/* Subtitle Header */}
          <div className="subtitle-wrapper">
            <img src={capImg} alt="Graduation Cap" className="cap-icon" />
            <span className="subtitle">ABOUT NANDA KIDZ</span>
          </div>

          {/* Main Headline */}
          <h1 className="main-heading">
            Globally Recognized
            <br />
            <span className="heading-highlight">Interactive Preschool</span> Education
          </h1>

          {/* Description Paragraph */}
          <p className="description">
            We cultivate a joyful, secure environment blending advanced play-way methodologies and interactive technology, empowering young minds with lifelong curiosity and confidence.
          </p>

          {/* Action Buttons Row */}
          <div className="about-action-row">
            <button className="read-more-btn">
              <span className="btn-shine"></span>
              EXPLORE MORE <span className="arrow-icon">↗</span>
            </button>
            
            <div className="about-stats-pill">
              <div className="stat-avatars">
                <span>👶</span><span>👧</span><span>👦</span>
              </div>
              <div className="stat-text">
                <strong>500+ Happy Kids</strong>
                <span>Enrolled in Programs</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
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
            <span className="subtitle">ABOUT US</span>
          </div>

          {/* Main Headline */}
          <h1 className="main-heading">
            Globally Recognized
            <br />
            Interactive Preschool Education
          </h1>

          {/* Description Paragraph */}
          <p className="description">
            Tellus in hac habitasse platea dictumst. Eget arcu dictum varius duis at consectetur
            lorem donec massa. Eget magna fermentum iaculis eu non diam. Amet nisl purus in
            mollis nunc sed id.
          </p>

          {/* Read More Button */}
          <button className="read-more-btn">
            READ MORE <span className="arrow-icon">↗</span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
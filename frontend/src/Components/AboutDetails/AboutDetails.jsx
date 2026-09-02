import React from 'react';
import './AboutDetails.css';
import principalImg from '../../assets/woman_half_crop.webp'; // PNG/WEBP with transparent background recommended
import { 
  FaUser, 
  FaQuoteLeft, 
  FaQuoteRight, 
  FaGraduationCap, 
  FaUserFriends, 
  FaTrophy 
} from 'react-icons/fa';
import { GiOpenBook } from 'react-icons/gi';

const AboutDetails = () => {
  return (
    <div className="about-details-container">
      <div className="about-details-card">
        
        {/* Left Section - Image with Curved SVG Background */}
        <div className="about-details-left">
          {/* Top-Left Dark Dots */}
          <div className="about-details-dots-top">
            <span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span>
          </div>

          {/* SVG Background Arc Shapes */}
          <svg className="about-details-bg-svg" viewBox="0 0 400 500" preserveAspectRatio="none">
            {/* Dark Blue Base Layer */}
            <path d="M 0,0 L 280,0 C 370,120 370,380 0,500 Z" fill="#002b5b" />
            {/* Orange Curved Border Line */}
            <path d="M 280,0 C 370,120 370,380 0,500" fill="none" stroke="#f6a609" strokeWidth="12" />
          </svg>

          {/* Principal Image */}
          <div className="about-details-img-container">
            <img 
              src={principalImg} 
              alt="Mrs. Ananya Sharma" 
              className="about-details-img" 
            />
          </div>

          {/* Book Crest Badge */}
          <div className="about-details-badge">
            <div className="about-details-badge-ring">
              <div className="about-details-badge-inner">
                <GiOpenBook className="about-details-badge-icon" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Text & Stats */}
        <div className="about-details-right">
          
          {/* Top Right Floral Leaf Decorative SVG */}
          <svg className="about-details-leaf" viewBox="0 0 100 100" fill="#dce4fd">
            <path d="M50 0 Q75 25 100 50 Q75 75 50 100 Q25 75 0 50 Q25 25 50 0 Z" />
            <path d="M50 10 L50 90 M30 30 L50 50 L70 30 M30 70 L50 50 L70 70" stroke="#ffffff" strokeWidth="2" fill="none" />
          </svg>

          {/* Header Tagline */}
          <div className="about-details-header">
            <div className="about-details-user-avatar">
              <FaUser />
            </div>
            <span className="about-details-cursive">From the Desk of</span>
          </div>

          {/* Title & Role */}
          <h2 className="about-details-name">Mrs. Ananya Sharma</h2>
          <span className="about-details-role">PRINCIPAL</span>

          <div className="about-details-divider">
            <span className="about-details-diamond">◆</span>
          </div>

          {/* Quote Body */}
          <div className="about-details-quote-box">
            <FaQuoteLeft className="about-details-qicon q-left" />
            <p className="about-details-text">
              At our school, we believe every child is unique and full of potential. 
              Our mission is to nurture young minds with knowledge, values, and 
              creativity, helping them grow into confident, compassionate, and 
              responsible individuals. Together, let's build a brighter tomorrow.
            </p>
            <FaQuoteRight className="about-details-qicon q-right" />
          </div>

          {/* Bottom Dark Blue Stats Pill */}
          <div className="about-details-stats">
            <div className="about-details-stat">
              <div className="about-details-stat-icon-bg">
                <FaGraduationCap />
              </div>
              <div>
                <strong>15+</strong>
                <span>Years of<br />Experience</span>
              </div>
            </div>

            <div className="about-details-stat-sep"></div>

            <div className="about-details-stat">
              <div className="about-details-stat-icon-bg">
                <FaUserFriends />
              </div>
              <div>
                <strong>1000+</strong>
                <span>Happy Students<br />& Parents</span>
              </div>
            </div>

            <div className="about-details-stat-sep"></div>

            <div className="about-details-stat">
              <div className="about-details-stat-icon-bg">
                <FaTrophy />
              </div>
              <div>
                <strong>25+</strong>
                <span>Awards &<br />Recognitions</span>
              </div>
            </div>
          </div>

          {/* Bottom-Right Orange Dots */}
          <div className="about-details-dots-bottom">
            <span></span><span></span><span></span><span></span>
            <span></span><span></span><span></span><span></span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutDetails;
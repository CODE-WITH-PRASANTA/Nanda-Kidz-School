import React from 'react';
import './AboutDetails.css';
import principalImg from '../../assets/NandaMam.webp';
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

          {/* Soft glow behind the photo for a premium spotlight feel */}
          <div className="about-details-img-glow" aria-hidden="true"></div>

          {/* Principal/Director Image */}
          <div className="about-details-img-container">
            <img 
              src={principalImg} 
              alt="Dr. Achman Nanda" 
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
          <h2 className="about-details-name">Dr. Achman Nanda</h2>
          <span className="about-details-role">FOUNDER & DIRECTOR</span>

          <div className="about-details-divider">
            <span className="about-details-diamond">◆</span>
          </div>

          {/* Quote Body with Professional Profile Summary */}
          <div className="about-details-quote-box">
            <FaQuoteLeft className="about-details-qicon q-left" />
            <p className="about-details-text">
              Dr. Achman Nanda is a veteran child psychologist and academician with over three decades of professional experience in child psychology, autism spectrum assessment, and intervention strategies. Having led prestigious institutions like Bachpan Group of Schools, New Delhi, and currently directing Nanda Kidz The Little Kingdom Play School, her mission is to foster early childhood development, inclusive education, and dedicated social welfare initiatives for women and children.
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
                <strong>30+</strong>
                <span>Years of<br />Experience</span>
              </div>
            </div>

            <div className="about-details-stat-sep"></div>

            <div className="about-details-stat">
              <div className="about-details-stat-icon-bg">
                <FaUserFriends />
              </div>
              <div>
                <strong>20+</strong>
                <span>Years in Social<br />Work & Welfare</span>
              </div>
            </div>

            <div className="about-details-stat-sep"></div>

            <div className="about-details-stat">
              <div className="about-details-stat-icon-bg">
                <FaTrophy />
              </div>
              <div>
                <strong>Auth.</strong>
                <span>Autism & Child<br />Specialist</span>
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
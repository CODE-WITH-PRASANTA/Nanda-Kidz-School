import React from 'react';
import { 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaFacebookF, 
  FaPinterestP, 
  FaInstagram 
} from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri'; // For the updated X logo
import './Topbar.css';

const Topbar = () => {
  return (
    <div className="topbar-container">
      {/* Left Section: Dark Slate Blue */}
      <div className="topbar-left-section">
        <div className="topbar-info-wrapper">
          <div className="topbar-info-item">
            <FaMapMarkerAlt className="topbar-icon" />
            <span className="topbar-text">East Madison Street, Baltimore</span>
          </div>
          <div className="topbar-info-item">
            <FaEnvelope className="topbar-icon" />
            <span className="topbar-text">contact@example.com</span>
          </div>
        </div>
      </div>

      {/* Right Section: Mustard Gold */}
      <div className="topbar-right-section">
        <div className="topbar-contact-wrapper">
          <div className="topbar-phone-item">
            <FaPhoneAlt className="topbar-phone-icon" />
            <span className="topbar-phone-text">+000 123 456789</span>
          </div>
          
          <div className="topbar-social-icons">
            <a href="#" className="topbar-social-link" aria-label="X (formerly Twitter)">
              <RiTwitterXFill />
            </a>
            <a href="#" className="topbar-social-link" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" className="topbar-social-link" aria-label="Pinterest">
              <FaPinterestP />
            </a>
            <a href="#" className="topbar-social-link" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
import React from 'react';
import { 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaFacebookF, 
  FaInstagram, 
  FaWhatsapp,
  FaPhone
} from 'react-icons/fa';
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
            <span className="topbar-text">nandakidzzz@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Right Section: Mustard Gold */}
      <div className="topbar-right-section">
        <div className="topbar-contact-wrapper">
          <div className="topbar-phone-item">
            <FaPhoneAlt className="topbar-phone-icon" />
            <span className="topbar-phone-text">+91 90407 86050</span>
          </div>
          
          <div className="topbar-social-icons">
            <a 
              href="https://www.facebook.com/share/v/1GqXQdyJML/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="topbar-social-link" 
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a 
              href="tel:9040786050" 
              className="topbar-social-link" 
              aria-label="Phone Call"
            >
              <FaPhone />
            </a>
            <a 
              href="https://wa.me/919040786050" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="topbar-social-link" 
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a 
              href="https://www.instagram.com/reel/DcvR2h6PWwk/?igsi=Z3Vwd2xwc2Q4cHMx" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="topbar-social-link" 
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
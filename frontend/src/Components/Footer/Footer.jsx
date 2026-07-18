import React from 'react';
import { FaFacebookF, FaPinterestP, FaInstagram } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';
import { ArrowUpRight } from 'lucide-react';

// Swap with your actual logo image path
import logoImg from '../../assets/demo-logo.avif';

import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Stable, Custom Vector Wave Structure on Top */}
      <div className="footer-wave-top">
        <svg 
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,64C1200,75,1320,85,1380,90.7L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" 
            fill="#e972ac"
          ></path>
        </svg>
      </div>

      {/* Main Footer Content Grid Area */}
      <div className="footer-main-container">
        <div className="footer-grid">
          
          {/* Column 1: About & Socials */}
          <div className="footer-column footer-about-col">
            <div className="footer-logo-wrapper">
              <img src={logoImg} alt="For Apple Logo" className="footer-logo" />
            </div>
            <p className="footer-description">
              Donec sit amet nibh vestibulum ipsum cursus rhoncus. Duis ac tortor gravida ligula eleifend finibus sed vel tellus.
            </p>
            <div className="footer-social-icons">
              <a href="#" className="footer-social-link" aria-label="X"><RiTwitterXFill /></a>
              <a href="#" className="footer-social-link" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" className="footer-social-link" aria-label="Pinterest"><FaPinterestP /></a>
              <a href="#" className="footer-social-link" aria-label="Instagram"><FaInstagram /></a>
            </div>
          </div>

          {/* Column 2: Get In Touch */}
          <div className="footer-column">
            <h3 className="footer-heading">Get In Touch</h3>
            <p className="footer-text">No: 58 A, East Madison Street,</p>
            <p className="footer-text">Baltimore, MD, USA 4508</p>
            <p className="footer-text footer-email">contact@example.com</p>
            <p className="footer-text footer-phone">Call Us: +01 123 456789</p>
          </div>

          {/* Column 3: Useful Links */}
          <div className="footer-column">
            <h3 className="footer-heading">Useful Links</h3>
            <ul className="footer-links-list">
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">History</a></li>
              <li><a href="#">Shipping & Returns</a></li>
              <li><a href="#">Refund Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Column 4: Customer Services */}
          <div className="footer-column">
            <h3 className="footer-heading">Customer Services</h3>
            <ul className="footer-links-list">
              <li><a href="#">Communication App</a></li>
              <li><a href="#">Tour A School</a></li>
              <li><a href="#">Health & Safety</a></li>
              <li><a href="#">Our Curriculum</a></li>
              <li><a href="#">Our Educators</a></li>
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div className="footer-column footer-newsletter-col">
            <h3 className="footer-heading">Subscribe to Our Newsletter</h3>
            <p className="footer-description">
              Join over 25,000 People Getting Our EmailsConversation, confidence, creativity.
            </p>
            <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter Your Email" 
                className="footer-input-field"
                required 
              />
              <button type="submit" className="footer-submit-btn">
                SEND REQUEST <ArrowUpRight className="footer-btn-icon" size={18} />
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Bottom Bar Section */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p className="footer-copyright">
            All Right Reserved © {currentYear} <span className="footer-author">PR WEBSTOCK</span>
          </p>
          
          <div className="footer-payment-gateways">
            <div className="footer-card-box visa"><span>VISA</span></div>
            <div className="footer-card-box mastercard"><div className="mc-circles"></div></div>
            <div className="footer-card-box amex"><span>AMEX</span></div>
            <div className="footer-card-box paypal"><span>PayPal</span></div>
            <div className="footer-card-box maestro"><span>maestro</span></div>
            <div className="footer-card-box discover"><span>DISCOVER</span></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaYoutube, 
  FaWhatsapp, 
  FaMapMarkerAlt, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaClock,
  FaShieldAlt,
  FaUserGraduate,
  FaLightbulb,
  FaHeart,
  FaChevronRight
} from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';
import { IoPaperPlane } from 'react-icons/io5';
import { ArrowUp } from 'lucide-react';
 
// Replace with your actual assets paths
import logoImg from '../../assets/nanda image .png';
import boyOnPencil from '../../assets/pen.png';
import girlReading from '../../assets/pencile.png';

import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="kids-footer">
      {/* Top Soft Cream Wave Border */}
      <div className="footer-wave-top">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,64C1200,75,1320,85,1380,90.7L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" fill="#ffffff"></path>
        </svg>
      </div>

      {/* Floating Decorative Elements */}
      <div className="floating-elements">
        <span className="star s1">⭐</span>
        <span className="star s2">✨</span>
        <span className="star s3">⭐</span>
        <div className="paper-plane">✈️</div>
      </div>

      {/* Main Footer Container */}
      <div className="footer-container">
        
        {/* Left Character Illustration */}
        <div className="cartoon-character left-character">
          <img src={boyOnPencil} alt="Boy on pencil" />
        </div>

        {/* Right Character Illustration */}
        <div className="cartoon-character right-character">
          <img src={girlReading} alt="Girl reading book" />
        </div>

        <div className="footer-grid">
          
          {/* Column 1: School Info */}
          <div className="footer-col school-info-col">
            <div className="footer-logo-wrapper">
              <img src={logoImg} alt="Kidz School Logo" className="footer-logo" />
            </div>
            <p className="footer-desc">
              We nurture young minds with love, creativity and fun-filled learning experiences to help every child shine bright!
            </p>
            <div className="footer-socials">
              <a href="#" className="social-icon facebook" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" className="social-icon instagram" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" className="social-icon youtube" aria-label="Youtube"><FaYoutube /></a>
              <a href="#" className="social-icon whatsapp" aria-label="Whatsapp"><FaWhatsapp /></a>
            </div>
          </div>

          {/* Column 2: Get In Touch */}
          <div className="footer-col">
            <h3 className="footer-heading purple-heading">
              <span className="heading-icon"><FaPhoneAlt /></span> Get In Touch
            </h3>
            <ul className="contact-list">
              <li>
                <FaMapMarkerAlt className="contact-ico" />
                <span>123 Happy Kids Street, Dreamland, CA 90210, USA</span>
              </li>
              <li>
                <FaEnvelope className="contact-ico" />
                <span>info@kidzschool.com</span>
              </li>
              <li>
                <FaPhoneAlt className="contact-ico" />
                <span>+1 234 567 890</span>
              </li>
              <li>
                <FaClock className="contact-ico" />
                <span>Mon - Fri: 8:00 AM - 5:00 PM<br/>Sat - Sun: Closed</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div className="footer-col">
            <h3 className="footer-heading orange-heading">
              <span className="heading-icon">🔗</span> Useful Links
            </h3>
            <ul className="footer-links">
              <li><a href="#"><FaChevronRight className="arrow-ico" /> About Us</a></li>
              <li><a href="#"><FaChevronRight className="arrow-ico" /> Our Programs</a></li>
              <li><a href="#"><FaChevronRight className="arrow-ico" /> Admissions</a></li>
              <li><a href="#"><FaChevronRight className="arrow-ico" /> Gallery</a></li>
              <li><a href="#"><FaChevronRight className="arrow-ico" /> Events</a></li>
              <li><a href="#"><FaChevronRight className="arrow-ico" /> Blog</a></li>
              <li><a href="#"><FaChevronRight className="arrow-ico" /> Terms & Conditions</a></li>
              <li><a href="#"><FaChevronRight className="arrow-ico" /> Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div className="footer-col">
            <h3 className="footer-heading pink-heading">
              <span className="heading-icon"><FaUserGraduate /></span> Quick Links
            </h3>
            <ul className="footer-links">
              <li><a href="#"><FaChevronRight className="arrow-ico" /> Parent Login</a></li>
              <li><a href="#"><FaChevronRight className="arrow-ico" /> Student Login</a></li>
              <li><a href="#"><FaChevronRight className="arrow-ico" /> Online Fee Payment</a></li>
              <li><a href="#"><FaChevronRight className="arrow-ico" /> Transport</a></li>
              <li><a href="#"><FaChevronRight className="arrow-ico" /> Careers</a></li>
              <li><a href="#"><FaChevronRight className="arrow-ico" /> FAQs</a></li>
              <li><a href="#"><FaChevronRight className="arrow-ico" /> Sitemap</a></li>
            </ul>
          </div>

          {/* Column 5: Newsletter */}
          <div className="footer-col newsletter-col">
            <h3 className="footer-heading green-heading">
              <span className="heading-icon"><IoPaperPlane /></span> Newsletter
            </h3>
            <p className="footer-desc">
              Subscribe to our newsletter for updates & news!
            </p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="newsletter-input"
                required 
              />
              <button type="submit" className="newsletter-btn">
                SUBSCRIBE <IoPaperPlane className="btn-plane-ico" />
              </button>
            </form>
          </div>

        </div>

        {/* Feature Highlights Row */}
        <div className="footer-features-row">
          <div className="feature-card">
            <div className="feature-icon purple-bg"><FaShieldAlt /></div>
            <div className="feature-text">
              <h4>Safe & Secure</h4>
              <p>A safe environment for your little ones.</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon pink-bg"><FaUserGraduate /></div>
            <div className="feature-text">
              <h4>Expert Teachers</h4>
              <p>Experienced teachers who care & inspire.</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon orange-bg"><FaLightbulb /></div>
            <div className="feature-text">
              <h4>Creative Learning</h4>
              <p>Fun activities that build future skills.</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon green-bg"><FaHeart /></div>
            <div className="feature-text">
              <h4>Happy Environment</h4>
              <p>Where every child feels at home.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Dark Blue Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-content">
          <p className="copyright-text">
            © {currentYear} <span className="brand-name">Kidz School</span>. All Rights Reserved.
          </p>

          <div className="footer-slogan">
            <span>✨ Play, Learn & Grow Together! ✨</span>
          </div>

          <div className="payment-and-scroll">
            <div className="payment-methods">
              <span className="accept-text">We Accept</span>
              <span className="pay-badge visa">VISA</span>
              <span className="pay-badge mastercard">mastercard</span>
              <span className="pay-badge amex">AMEX</span>
              <span className="pay-badge paypal">PayPal</span>
              <span className="pay-badge stripe">stripe</span>
            </div>
            
            
          </div>
        </div>
      </div>

      {/* Bottom Multicolor Wave Border */}
      <div className="footer-wave-bottom"></div>
    </footer>
  );
};

export default Footer;
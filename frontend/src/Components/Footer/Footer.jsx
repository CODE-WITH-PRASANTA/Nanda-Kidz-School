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
  FaChevronRight,
  FaCompass,
  FaLink
} from 'react-icons/fa';
import { IoPaperPlane } from 'react-icons/io5';
import { ArrowUp } from 'lucide-react';

// Replace with your actual assets paths
import logoImg from '../../assets/nanda image .png';
import boyOnPencil from '../../assets/pen.png';
import girlReading from '../../assets/pencile.png';

import './Footer.css';

// Custom feature icons (inline SVG, matches the site's icon convention)
const featureIconPaths = {
  shield: (
    <>
      <path d="M12 3.5 5 6v5.2c0 4.8 3 8.1 7 9.3 4-1.2 7-4.5 7-9.3V6l-7-2.5Z" />
      <path d="M9 12.2l2 2 4-4.4" />
    </>
  ),
  cap: (
    <>
      <path d="M12 4 3 8.6 12 13l9-4.4L12 4Z" />
      <path d="M6.5 10.6v4c0 1.7 2.5 3 5.5 3s5.5-1.3 5.5-3v-4" />
      <path d="M20 8.6v5.6" />
    </>
  ),
  bulb: (
    <>
      <path d="M9.2 17.5h5.6M10 20.3h4" />
      <path d="M12 2.7v1.3M4.8 5.5l.9.9M19.2 5.5l-.9.9" />
      <path d="M12 4.7a5.6 5.6 0 0 0-3.2 10.2c.5.35.75.9.75 1.5v.4h4.9v-.4c0-.6.25-1.15.75-1.5A5.6 5.6 0 0 0 12 4.7Z" />
    </>
  ),
  heart: (
    <>
      <path d="M12 20 4.9 12.9a4.6 4.6 0 0 1 6.5-6.5l.6.6.6-.6a4.6 4.6 0 0 1 6.5 6.5L12 20Z" />
      <path d="M9.3 11.2l1.7 1.7 3.4-3.4" />
    </>
  ),
};

const FeatureIcon = ({ name }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {featureIconPaths[name]}
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const exploreLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Shop', path: '/shop' },
    { label: 'Blog', path: '/blog' },
    { label: 'Gallery', path: '/gallery' },
  ];

  const quickLinks = [
    { label: 'Pricing', path: '/pricing' },
    { label: 'Time Table', path: '/time-table' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Teacher', path: '/teacher' },
    { label: 'Contact Us', path: '/contact' },
  ];

  return (
    <footer className="kids-footer">

      <div className="footer-body">

        {/* Top Soft Cream Wave Border */}
        <div className="footer-wave-top">
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,64C1200,75,1320,85,1380,90.7L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" fill="#ffffff"></path>
          </svg>
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
                <img src={logoImg} alt="Nanda Kidz – The Little Kingdom" className="footer-logo" />
              </div>
              <p className="footer-desc">
                Nanda Kidz – The Little Kingdom is a child-friendly learning space where children explore, play, create and grow with confidence.
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
                  <span>K-5, HIG-424, Kalinga Vihar LIG, Kalinganagar, Bhubaneswar, Odisha - 751028</span>
                </li>
                <li>
                  <FaEnvelope className="contact-ico" />
                  <span>nandakidzzz@gmail.com</span>
                </li>
                <li>
                  <FaPhoneAlt className="contact-ico" />
                  <span>+91 90407 86050</span>
                </li>
                <li>
                  <FaClock className="contact-ico" />
                  <span>Mon - Sat: 8:00 AM - 6:00 PM<br/>Sunday: Closed</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Explore */}
            <div className="footer-col">
              <h3 className="footer-heading orange-heading">
                <span className="heading-icon"><FaCompass /></span> Explore
              </h3>
              <ul className="footer-links">
                {exploreLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.path}><FaChevronRight className="arrow-ico" /> {link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Quick Links */}
            <div className="footer-col">
              <h3 className="footer-heading pink-heading">
                <span className="heading-icon"><FaLink /></span> Quick Links
              </h3>
              <ul className="footer-links">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.path}><FaChevronRight className="arrow-ico" /> {link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: Newsletter */}
            <div className="footer-col newsletter-col">
              <h3 className="footer-heading green-heading">
                <span className="heading-icon"><IoPaperPlane /></span> Newsletter
              </h3>
              <p className="footer-desc">
                Subscribe to receive updates on admissions, events and school news.
              </p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <div className="newsletter-input-wrapper">
                  <FaEnvelope className="newsletter-input-icon" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="newsletter-input"
                    required
                  />
                </div>
                <button type="submit" className="newsletter-btn">
                  SUBSCRIBE <IoPaperPlane className="btn-plane-ico" />
                </button>
              </form>
            </div>

          </div>

          {/* Feature Highlights Row */}
          <div className="footer-features-row">
            <div className="feature-card">
              <div className="feature-icon purple-bg"><FeatureIcon name="shield" /></div>
              <div className="feature-text">
                <h4>Safe & Secure</h4>
                <p>A safe environment for your little ones.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon pink-bg"><FeatureIcon name="cap" /></div>
              <div className="feature-text">
                <h4>Expert Teachers</h4>
                <p>Experienced teachers who care & inspire.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon orange-bg"><FeatureIcon name="bulb" /></div>
              <div className="feature-text">
                <h4>Creative Learning</h4>
                <p>Fun activities that build future skills.</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-icon green-bg"><FeatureIcon name="heart" /></div>
              <div className="feature-text">
                <h4>Happy Environment</h4>
                <p>Where every child feels at home.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Navy Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-content">
          <p className="copyright-text">
            © {currentYear} <span className="brand-name">Nanda Kidz</span> – The Little Kingdom. PR WEBSTOCK.
          </p>

          <div className="footer-slogan">
            <span>Play, Learn & Grow Together</span>
          </div>

          <div className="payment-and-scroll">
            <button
              type="button"
              className="footer-scroll-top"
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Accent Wave */}
      <div className="footer-wave-bottom"></div>
    </footer>
  );
};

export default Footer;
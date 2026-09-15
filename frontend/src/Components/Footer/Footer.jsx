import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
  FaChevronRight,
  FaCompass,
  FaLink,
} from "react-icons/fa";
import { IoPaperPlane } from "react-icons/io5";
import { ArrowUp } from "lucide-react";

import logoImg from "../../assets/nanda image .png";
import boyOnPencil from "../../assets/pen.png";
import girlReading from "../../assets/pencile.png";

import "./Footer.css";

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
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {featureIconPaths[name]}
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const PR_WEBSITE = "https://prwebstock.com/";

  /* ================================================================
     SOCIAL MEDIA LINKS
  ================================================================= */

  const socialLinks = {
    facebook: "https://www.facebook.com/share/v/1GqXQdyJML/",
    instagram:
      "https://www.instagram.com/reel/DcvR2h6PWwk/?igsi=Z3Vwd2xwc2Q4cHMx",
    youtube: "https://www.youtube.com/@PriyaNihar-g1u",
    whatsapp:
      "https://wa.me/919040786050?text=Hello%20Nanda%20Kidz%20%E2%80%93%20The%20Little%20Kingdom%2C%20I%20would%20like%20to%20know%20more%20about%20your%20school%2C%20admissions%20and%20activities%20for%20kids.",
  };

  /* ================================================================
     SMOOTH SCROLL TO TOP
  ================================================================= */

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ================================================================
     NAVIGATION LINKS
  ================================================================= */

  const exploreLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Shop", path: "/shop" },
    { label: "Blog", path: "/blog" },
    { label: "Gallery", path: "/gallery" },
  ];

  const quickLinks = [
    { label: "Pricing", path: "/pricing" },
    { label: "Time Table", path: "/time-table" },
    { label: "FAQ", path: "/faq" },
    { label: "Teacher", path: "/teacher" },
    { label: "Contact Us", path: "/contact" },
  ];

  return (
    <footer className="kids-footer">
      {/* ============================================================
          FOOTER BODY
      ============================================================ */}

      <div className="footer-body">

        {/* Top Wave */}
        <div className="footer-wave-top">
          <svg
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,64C1200,75,1320,85,1380,90.7L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
              fill="#ffffff"
            />
          </svg>
        </div>

        {/* Main Container */}
        <div className="footer-container">

          {/* Left Character */}
          <div className="cartoon-character left-character">
            <img
              src={boyOnPencil}
              alt="Boy sitting on pencil"
              loading="lazy"
            />
          </div>

          {/* Right Character */}
          <div className="cartoon-character right-character">
            <img
              src={girlReading}
              alt="Girl reading a book"
              loading="lazy"
            />
          </div>

          {/* ======================================================
              MAIN GRID
          ====================================================== */}

          <div className="footer-grid">

            {/* ====================================================
                COLUMN 1 - SCHOOL INFO
            ==================================================== */}

            <div className="footer-col school-info-col">

              <div className="footer-logo-wrapper">
                <img
                  src={logoImg}
                  alt="Nanda Kidz – The Little Kingdom"
                  className="footer-logo"
                />
              </div>

              <p className="footer-desc school-description">
                Nanda Kidz – The Little Kingdom is a child-friendly
                learning space where children explore, play, create
                and grow with confidence.
              </p>

              {/* SOCIAL MEDIA */}
              <div className="footer-socials">

                {/* Facebook */}
                <a
                  href={socialLinks.facebook}
                  className="social-icon facebook"
                  aria-label="Visit Nanda Kidz Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF />
                </a>

                {/* Instagram */}
                <a
                  href={socialLinks.instagram}
                  className="social-icon instagram"
                  aria-label="Visit Nanda Kidz Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>

                {/* YouTube */}
                <a
                  href={socialLinks.youtube}
                  className="social-icon youtube"
                  aria-label="Visit Nanda Kidz YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube />
                </a>

                {/* WhatsApp */}
                <a
                  href={socialLinks.whatsapp}
                  className="social-icon whatsapp"
                  aria-label="Chat with Nanda Kidz on WhatsApp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp />
                </a>

              </div>
            </div>

            {/* ====================================================
                COLUMN 2 - GET IN TOUCH
            ==================================================== */}

            <div className="footer-col">

              <h3 className="footer-heading purple-heading">
                <span className="heading-icon">
                  <FaPhoneAlt />
                </span>
                <span>Get In Touch</span>
              </h3>

              <ul className="contact-list">

                <li>
                  <FaMapMarkerAlt className="contact-ico" />

                  <span>
                    K-5, HIG-424, Kalinga Vihar LIG,
                    Kalinganagar, Bhubaneswar,
                    Odisha - 751028
                  </span>
                </li>

                <li>
                  <FaEnvelope className="contact-ico" />

                  <a
                    href="mailto:nandakidzzz@gmail.com"
                    className="contact-link"
                  >
                    nandakidzzz@gmail.com
                  </a>
                </li>

                <li>
                  <FaPhoneAlt className="contact-ico" />

                  <a
                    href="tel:+919040786050"
                    className="contact-link"
                  >
                    +91 90407 86050
                  </a>
                </li>

                <li>
                  <FaClock className="contact-ico" />

                  <span>
                    Mon - Sat: 8:00 AM - 6:00 PM
                    <br />
                    Sunday: Closed
                  </span>
                </li>

              </ul>
            </div>

            {/* ====================================================
                COLUMN 3 - EXPLORE
            ==================================================== */}

            <div className="footer-col">

              <h3 className="footer-heading orange-heading">
                <span className="heading-icon">
                  <FaCompass />
                </span>

                <span>Explore</span>
              </h3>

              <ul className="footer-links">

                {exploreLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.path}>
                      <FaChevronRight className="arrow-ico" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}

              </ul>
            </div>

            {/* ====================================================
                COLUMN 4 - QUICK LINKS
            ==================================================== */}

            <div className="footer-col">

              <h3 className="footer-heading pink-heading">
                <span className="heading-icon">
                  <FaLink />
                </span>

                <span>Quick Links</span>
              </h3>

              <ul className="footer-links">

                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.path}>
                      <FaChevronRight className="arrow-ico" />
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}

              </ul>
            </div>

            {/* ====================================================
                COLUMN 5 - NEWSLETTER
            ==================================================== */}

            <div className="footer-col newsletter-col">

              <h3 className="footer-heading green-heading">
                <span className="heading-icon">
                  <IoPaperPlane />
                </span>

                <span>Newsletter</span>
              </h3>

              <p className="footer-desc">
                Subscribe to receive updates on admissions,
                events and school news.
              </p>

              <form
                className="newsletter-form"
                onSubmit={(e) => e.preventDefault()}
              >

                <div className="newsletter-input-wrapper">

                  <FaEnvelope className="newsletter-input-icon" />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="newsletter-input"
                    aria-label="Email address"
                    required
                  />

                </div>

                <button
                  type="submit"
                  className="newsletter-btn"
                >
                  <span>SUBSCRIBE</span>
                  <IoPaperPlane className="btn-plane-ico" />
                </button>

              </form>
            </div>
          </div>

          {/* ======================================================
              FEATURE HIGHLIGHTS
          ====================================================== */}

          <div className="footer-features-row">

            {/* Safe */}
            <div className="feature-card">

              <div className="feature-icon purple-bg">
                <FeatureIcon name="shield" />
              </div>

              <div className="feature-text">
                <h4>Safe &amp; Secure</h4>
                <p>
                  A safe environment for your little ones.
                </p>
              </div>

            </div>

            {/* Teachers */}
            <div className="feature-card">

              <div className="feature-icon pink-bg">
                <FeatureIcon name="cap" />
              </div>

              <div className="feature-text">
                <h4>Expert Teachers</h4>
                <p>
                  Experienced teachers who care &amp; inspire.
                </p>
              </div>

            </div>

            {/* Creative */}
            <div className="feature-card">

              <div className="feature-icon orange-bg">
                <FeatureIcon name="bulb" />
              </div>

              <div className="feature-text">
                <h4>Creative Learning</h4>
                <p>
                  Fun activities that build future skills.
                </p>
              </div>

            </div>

            {/* Environment */}
            <div className="feature-card">

              <div className="feature-icon green-bg">
                <FeatureIcon name="heart" />
              </div>

              <div className="feature-text">
                <h4>Happy Environment</h4>
                <p>
                  Where every child feels at home.
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* ============================================================
          BOTTOM BAR
      ============================================================ */}

      <div className="footer-bottom-bar">

        <div className="footer-bottom-content">

          {/* Copyright */}
          <p className="copyright-text">
            © {currentYear}{" "}

            <span className="brand-name">
              Developed By
            </span>

            {" - "}

            <a
              href={PR_WEBSITE}
              target="_blank"
              rel="noopener noreferrer"
              className="pr-webstock-link"
              aria-label="Visit PR Webstock website"
            >
              PR WEBSTOCK
            </a>
            .
          </p>

          {/* Slogan */}
          <div className="footer-slogan">
            <span>Play, Learn &amp; Grow Together</span>
          </div>

        </div>
      </div>

      {/* Bottom Accent */}
      <div className="footer-wave-bottom" />

    </footer>
  );
};

export default Footer;
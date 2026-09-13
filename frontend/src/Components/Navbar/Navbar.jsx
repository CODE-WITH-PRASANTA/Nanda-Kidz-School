import React, { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

// =====================================================
// LOGO IMAGES
// =====================================================

import logoImg from "../../assets/nanda image .png";
import sidebarLogoImg from "../../assets/demo-logo.avif";

// =====================================================
// SIDEBAR GALLERY IMAGES
// =====================================================

import galleryImg1 from "../../assets/c-5.webp";
import galleryImg2 from "../../assets/c-6.webp";
import galleryImg3 from "../../assets/c-4.webp";
import galleryImg4 from "../../assets/c-3.webp";
import galleryImg5 from "../../assets/c-2.webp";
import galleryImg6 from "../../assets/c-1.webp";

import "./Navbar.css";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // =====================================================
  // NAVIGATION LINKS
  // =====================================================

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Shop", path: "/shop" },
    { title: "Blog", path: "/blog" },
    { title: "Gallery", path: "/gallery" },
    { title: "Pricing", path: "/pricing" },
    { title: "Time Table", path: "/time-table" },
    { title: "FAQ", path: "/faq" },
    { title: "Teacher", path: "/teacher" },
    { title: "Contact Us", path: "/contact" },
  ];

  // =====================================================
  // LOCAL GALLERY IMAGES
  // =====================================================

  const galleryImages = [
    galleryImg1,
    galleryImg2,
    galleryImg3,
    galleryImg4,
    galleryImg5,
    galleryImg6,
  ];

  // =====================================================
  // SIDEBAR CONTROLS
  // =====================================================

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // =====================================================
  // MOBILE MENU
  // =====================================================

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
    setIsSidebarOpen(false);
  };

  // =====================================================
  // ESCAPE KEY
  // =====================================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsSidebarOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // =====================================================
  // LOCK PAGE SCROLL WHEN SIDEBAR IS OPEN
  // =====================================================

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <>
      {/* =================================================
          NAVBAR
      ================================================== */}

      <nav className="navbar">
        <div className="navbar-container">

          {/* =================================================
              BRAND LOGO
          ================================================== */}

          <div className="navbar-logo-wrapper">
            <a
              href="/"
              aria-label="Nanda Kidz – The Little Kingdom Home"
              onClick={handleNavClick}
            >
              <img
                src={logoImg}
                alt="Nanda Kidz – The Little Kingdom"
                className="navbar-logo-image"
              />
            </a>
          </div>

          {/* =================================================
              NAVIGATION
          ================================================== */}

          <ul
            className={`navbar-links-list ${
              isMobileMenuOpen ? "mobile-active" : ""
            }`}
          >
            {navLinks.map((link) => (
              <li
                key={link.title}
                className="navbar-link-item"
              >
                <a
                  href={link.path}
                  className={`navbar-anchor ${
                    link.title === "Home" ? "active" : ""
                  }`}
                  onClick={handleNavClick}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>

          {/* =================================================
              ACTION BUTTONS
          ================================================== */}

          <div className="navbar-actions-group">

            {/* Sidebar / Three Dot Menu */}
            <button
              type="button"
              className="navbar-toggle-btn sidebar-trigger"
              onClick={toggleSidebar}
              aria-label="Open Nanda Kidz information menu"
              aria-expanded={isSidebarOpen}
            >
              <FiMenu />
            </button>

            {/* Mobile Menu */}
            <button
              type="button"
              className="navbar-toggle-btn mobile-menu-trigger"
              onClick={toggleMobileMenu}
              aria-label={
                isMobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <IoClose /> : <FiMenu />}
            </button>

          </div>
        </div>
      </nav>

      {/* =====================================================
          SIDEBAR BACKDROP
      ====================================================== */}

      <div
        className={`navbar-sidebar-backdrop ${
          isSidebarOpen ? "visible" : ""
        }`}
        onClick={closeSidebar}
        aria-hidden="true"
      />

      {/* =====================================================
          SIDEBAR DRAWER
      ====================================================== */}

      <aside
        className={`navbar-sidebar-drawer ${
          isSidebarOpen ? "open" : ""
        }`}
        aria-label="Nanda Kidz information"
      >

        {/* =================================================
            CLOSE BUTTON
        ================================================== */}

        <button
          type="button"
          className="navbar-sidebar-close-btn"
          onClick={closeSidebar}
          aria-label="Close information menu"
        >
          <IoClose />
        </button>

        <div className="navbar-sidebar-content">

          {/* =================================================
              BRAND LOGO
          ================================================== */}

          <div className="navbar-sidebar-brand">

            <div className="navbar-sidebar-logo-container">
              <img
                src={logoImg}
                alt="Nanda Kidz – The Little Kingdom"
                className="navbar-sidebar-logo-main"
              />
            </div>

            <div className="navbar-sidebar-brand-text">
              <span>NANDA KIDZ</span>
              <strong>The Little Kingdom</strong>
            </div>

          </div>

          {/* =================================================
              SECONDARY LOGO
          ================================================== */}

          <div className="navbar-sidebar-secondary-logo">
            <img
              src={sidebarLogoImg}
              alt=""
              aria-hidden="true"
            />
          </div>

          {/* =================================================
              INTRODUCTION
          ================================================== */}

          <div className="navbar-sidebar-intro">

            <span className="sidebar-eyebrow">
              Welcome to Nanda Kidz
            </span>

            <h2>
              A happy beginning for little learners
            </h2>

            <p>
              Nanda Kidz The Little Kingdom A Play School is a
              child-friendly learning space where children can
              explore, play, create and grow with confidence.
            </p>

          </div>

          {/* =================================================
              GALLERY HEADING
          ================================================== */}

          <div className="navbar-sidebar-gallery-heading">
            <span>School Moments</span>
          </div>

          {/* =================================================
              LOCAL IMAGE GALLERY
          ================================================== */}

          <div className="navbar-sidebar-gallery">
            {galleryImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Nanda Kidz school activity ${index + 1}`}
              />
            ))}
          </div>

          {/* =================================================
              SCHOOL LOCATION
          ================================================== */}

          <div className="navbar-sidebar-section school-location-section">

            <div className="sidebar-section-icon">
              <FaMapMarkerAlt />
            </div>

            <div>
              <h3>School Location</h3>

              <p>
                K-5, HIG-424, Kalinga Vihar LIG,
                Kalinganagar, Bhubaneswar,
                Odisha 751028
              </p>
            </div>

          </div>

          {/* =================================================
              PHONE
          ================================================== */}

          <div className="navbar-sidebar-section school-phone-section">

            <div className="sidebar-section-icon">
              <FaPhoneAlt />
            </div>

            <div>
              <h3>Call Nanda Kidz</h3>

              <a href="tel:+919438013349">
                +91 9438013349
              </a>
            </div>

          </div>

          {/* =================================================
              SEO CONTENT
          ================================================== */}

          <div className="navbar-sidebar-seo">

            <h3>
              Nanda Kidz Best play school in Bhubaneswar
            </h3>

            <p>
              Families searching for the
              <strong>
                {" "}best kids school in bhubaneswar
              </strong>
              {" "}or a
              <strong>
                {" "}best play school for kids in bhubaneswar
              </strong>
              {" "}can learn more about our school, programs,
              activities and early-learning environment.
            </p>

          </div>

          {/* =================================================
              QUICK LINKS
          ================================================== */}

          <div className="navbar-sidebar-quick-links">

            <a
              href="/about"
              onClick={handleNavClick}
            >
              About Nanda Kidz
            </a>

            <a
              href="/gallery"
              onClick={handleNavClick}
            >
              View Gallery
            </a>

            <a
              href="/pricing"
              onClick={handleNavClick}
            >
              View Fees
            </a>

            <a
              href="/contact"
              onClick={handleNavClick}
            >
              Contact Us
            </a>

          </div>

          {/* =================================================
              SOCIAL LINKS
          ================================================== */}

          <div className="navbar-sidebar-social-wrapper">

            <span>Stay Connected</span>

            <div className="navbar-sidebar-socials">

              <a
                href="#"
                className="facebook-link"
                aria-label="Nanda Kidz Facebook"
                onClick={(e) => e.preventDefault()}
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="instagram-link"
                aria-label="Nanda Kidz Instagram"
                onClick={(e) => e.preventDefault()}
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="youtube-link"
                aria-label="Nanda Kidz YouTube"
                onClick={(e) => e.preventDefault()}
              >
                <FaYoutube />
              </a>

            </div>
          </div>

          {/* =================================================
              FOOTER
          ================================================== */}

          <div className="navbar-sidebar-footer">

            <span>
              Nanda Kidz – The Little Kingdom
            </span>

            <p>
              Learn · Play · Explore · Grow
            </p>

          </div>

        </div>
      </aside>
    </>
  );
};

export default Navbar;
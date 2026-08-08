import React, { useState, useEffect } from 'react';
import { FiMenu, FiChevronDown } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';

// --- LOGO IMAGES ---
import logoImg from '../../assets/nanda image .png'; 
import sidebarLogoImg from '../../assets/demo-logo.avif';

import './Navbar.css';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Shop', path: '/shop' },
    { title: 'Blog', path: '/blog' },
    { 
      title: 'Pages', 
      path: '#', 
      dropdown: [
        { title: 'Gallery', path: '/gallery' },
        { title: 'Pricing', path: '/pricing' },
        { title: 'Time Table', path: '/time-table' },
        
        { title: 'FAQ', path: '/faq' },
        { title: 'Teacher', path: '/teacher' },
      ]
    },
    { title: 'Contact Us', path: '/contact' },
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1567057404535-de6a04297312?q=80&w=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587554801471-37976a256db0?q=80&w=300&auto=format&fit=crop"
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.has-dropdown')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          
          {/* Left Side: Brand Logo */}
          <div className="navbar-logo-wrapper">
            <a href="/">
              <img src={logoImg} alt="For Apple Logo" className="navbar-logo-image" />
            </a>
          </div>

          {/* Center: Desktop Navigation Titles */}
          <ul className={`navbar-links-list ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
            {navLinks.map((link, index) => (
              <li 
                key={index} 
                className={`navbar-link-item ${link.dropdown ? 'has-dropdown' : ''}`}
              >
                {link.dropdown ? (
                  <>
                    <div 
                      className="navbar-anchor dropdown-toggle-trigger"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      {link.title} <FiChevronDown className={`chevron-icon ${isDropdownOpen ? 'rotate' : ''}`} />
                    </div>
                    <ul className={`navbar-dropdown-menu ${isDropdownOpen ? 'show-dropdown' : ''}`}>
                      {link.dropdown.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <a href={subItem.path} className="navbar-dropdown-anchor">
                            {subItem.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <a 
                    href={link.path} 
                    className={`navbar-anchor ${link.title === 'Home' ? 'active' : ''}`}
                  >
                    {link.title}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Right Side: Toggle Icons */}
          <div className="navbar-actions-group">
            <button className="navbar-toggle-btn sidebar-trigger" onClick={toggleSidebar} aria-label="Open Sidebar">
              <FiMenu />
            </button>
            <button className="navbar-toggle-btn mobile-menu-trigger" onClick={toggleMobileMenu} aria-label="Toggle Mobile Menu">
              {isMobileMenuOpen ? <IoClose /> : <FiMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop overlay layer */}
      <div 
        className={`navbar-sidebar-backdrop ${isSidebarOpen ? 'visible' : ''}`} 
        onClick={toggleSidebar} 
      />

      {/* Right Drawer Sliding Side Component Window */}
      <aside className={`navbar-sidebar-drawer ${isSidebarOpen ? 'open' : ''}`}>
        <button className="navbar-sidebar-close-btn" onClick={toggleSidebar}>
          <IoClose />
        </button>

        <div className="navbar-sidebar-content">
          <div className="navbar-sidebar-logo-container">
            <img src={sidebarLogoImg} alt="Side Menu Logo" className="navbar-sidebar-logo" />
          </div>

          <p className="navbar-sidebar-description">
            Our team delivers reliable solutions tailored to your specific needs. We prioritize quality and customer satisfaction in every project.
          </p>

          {/* 3x2 Square Photo Gallery Grid */}
          <div className="navbar-sidebar-gallery">
            {galleryImages.map((src, idx) => (
              <img key={idx} src={src} alt={`Gallery item ${idx + 1}`} />
            ))}
          </div>

          {/* Address Block */}
          <div className="navbar-sidebar-section">
            <h3>Address :</h3>
            <p>Address : 1080 Brickell Ave</p>
            <p>City : Miami ( Florida )</p>
            <p>Country : United States</p>
          </div>

          {/* Contact Block */}
          <div className="navbar-sidebar-section">
            <h3>Info :</h3>
            <p>Support : info@help.com</p>
            <p>Info : info@contact.com</p>
            <p>Phone : + 1 473 389 209</p>
          </div>

          {/* Social Links */}
          <div className="navbar-sidebar-socials">
            <a href="#" className="facebook-link"><FaFacebookF /></a>
            <a href="#" className="twitter-link"><FaTwitter /></a>
            <a href="#" className="youtube-link"><FaYoutube /></a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
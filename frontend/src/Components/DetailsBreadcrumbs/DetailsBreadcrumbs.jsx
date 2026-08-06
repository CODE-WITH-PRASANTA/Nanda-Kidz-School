import React from 'react';
import { Link } from 'react-router-dom';
import './DetailsBreadcrumbs.css';

// Import your hero image from your local assets folder
import bannerBg from '../../assets/page-banner-4.jpg';

const DetailsBreadcrumbs = () => {
  return (
    <div 
      className="details-breadcrumbs-hero"
      style={{ backgroundImage: `url(${bannerBg})` }}
    >
      {/* Dark Overlay for Text Readability */}
      <div className="details-breadcrumbs-overlay"></div>

      {/* Centered Content */}
      <div className="details-breadcrumbs-content">
        <h1 className="details-breadcrumbs-title">Blog Details</h1>
        
        <nav className="details-breadcrumbs-nav" aria-label="breadcrumb">
          <Link to="/" className="breadcrumb-link home-link">
            Home
          </Link>
          <span className="breadcrumb-separator">|</span>
          <span className="breadcrumb-active">Blog Details</span>
        </nav>
      </div>
    </div>
  );
};

export default DetailsBreadcrumbs;
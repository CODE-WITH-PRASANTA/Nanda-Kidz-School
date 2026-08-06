import React from 'react';
import './ClassBreadcrumbs.css';

// Import the provided background banner image
import bannerBg from '../../assets/page-banner-5.jpg';

const ClassBreadcrumbs = () => {
  return (
    <div 
      className="cb-banner-section" 
      style={{ backgroundImage: `url(${bannerBg})` }}
    >
      {/* Dark overlay mask to darken the background image */}
      <div className="cb-banner-overlay"></div>

      {/* Centered Content */}
      <div className="cb-container">
        <h1 className="cb-title">Class Details</h1>

        {/* Breadcrumbs Navigation */}
        <nav className="cb-breadcrumb" aria-label="breadcrumb">
          <a href="/" className="cb-breadcrumb-link">
            Home
          </a>
          <span className="cb-breadcrumb-separator">|</span>
          <span className="cb-breadcrumb-current">Class Details</span>
        </nav>
      </div>
    </div>
  );
};

export default ClassBreadcrumbs;
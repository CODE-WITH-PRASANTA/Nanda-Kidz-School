import React from 'react';
import './BlogBreadCrumb.css';

// Replace this path with your local background image file path
import bgImage from "../../assets/c-2.webp";

const BlogBreadCrumb = () => {
  return (
    <div 
      className="BlogBreadCrumb" 
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay for contrast */}
      <div className="BlogBreadCrumb-overlay"></div>

      <div className="BlogBreadCrumb-container">
        {/* Main Title */}
        <h1 className="BlogBreadCrumb-title">Blog</h1>

        {/* Breadcrumb Navigation */}
        <nav className="BlogBreadCrumb-nav">
          <span className="BlogBreadCrumb-link">Home</span>
          <span className="BlogBreadCrumb-separator">|</span>
          <span className="BlogBreadCrumb-active">Blog</span>
        </nav>
      </div>
    </div>
  );
};

export default BlogBreadCrumb;
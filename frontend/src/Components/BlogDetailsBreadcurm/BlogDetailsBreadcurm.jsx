import React from 'react';
import './BlogDetailsBreadcurm.css';

// Import your background image (Adjust path according to your project structure)
import bgImage from '../../assets/c-2.webp';

const BlogDetailsBreadcurm = () => {
  return (
    <div 
      className="BlogDetailsBreadcurm"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark overlay for text contrast matching reference image */}
      <div className="BlogDetailsBreadcurm-overlay"></div>

      <div className="BlogDetailsBreadcurm-container">
        {/* Main Title */}
        <h1 className="BlogDetailsBreadcurm-title">Blog Details</h1>

        {/* Breadcrumb Navigation */}
        <nav className="BlogDetailsBreadcurm-nav">
          <span className="BlogDetailsBreadcurm-link">Home</span>
          <span className="BlogDetailsBreadcurm-separator">|</span>
          <span className="BlogDetailsBreadcurm-active">Blog Details</span>
        </nav>
      </div>
    </div>
  );
};

export default BlogDetailsBreadcurm;
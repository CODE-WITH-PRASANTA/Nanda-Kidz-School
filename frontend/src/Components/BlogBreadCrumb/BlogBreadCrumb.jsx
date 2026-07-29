import React from 'react';
import './BlogBreadCrumb.css';
import bgImage from '../../assets/image6.webp'; // Adjust path according to your src/assets structure

const BlogBreadCrumb = () => {
  return (
    <div 
      className="BlogBreadCrumb" 
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${bgImage})` }}
    >
      <div className="BlogBreadCrumb-container">
        <h1 className="BlogBreadCrumb-title">Blog</h1>
        <p className="BlogBreadCrumb-subtitle">KINDERGARTEN WORDPRESS THEME</p>
      </div>
    </div>
  );
};

export default BlogBreadCrumb;
import React from 'react';
import './BlogBreadCrumb.css';

// Replace with your local relative path to the cloud image asset
import cloudImg from '../../assets/cloudimage.webp'; 

const BlogBreadCrumb = () => {
  return (
    <div className="about-breadcrumb-wrapper">
      {/* Centered Text Content */}
      <div className="breadcrumb-content">
        <h1 className="breadcrumb-title">Blog</h1>
        <div className="breadcrumb-nav">
          <span className="nav-item">Kindergarten WordPress Theme</span>
        </div>
      </div>

      {/* Infinite Moving Cloud Track */}
      <div className="cloud-animated-track">
        <img src={cloudImg} alt="Cloud Layer 1" className="cloud-image" />
        <img src={cloudImg} alt="Cloud Layer 2" className="cloud-image" />
      </div>
    </div>
  );
};

export default BlogBreadCrumb;
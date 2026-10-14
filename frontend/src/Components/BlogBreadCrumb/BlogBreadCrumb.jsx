import React from 'react';
import './BlogBreadCrumb.css';
import bgImage from '../../assets/contact.webp'; // Adjust path according to your src/assets structure

const BlogBreadCrumb = () => {
  return (
    <div 
      className="BlogBreadCrumb" 
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${bgImage})` }}
    >
      <div className="BlogBreadCrumb-container">
        <h1 className="BlogBreadCrumb-title">Blog </h1>
        <p className="BlogBreadCrumb-subtitle">Nanda kidz's The Little KingDom</p>
      </div>
    </div>
  );
};

export default BlogBreadCrumb;
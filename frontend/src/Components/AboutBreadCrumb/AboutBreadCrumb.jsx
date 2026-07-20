import React from 'react';
import './AboutBreadCrumb.css';

// Replace with your local relative path to the cloud image asset
import cloudImg from '../../assets/cloudimage.webp'; 

const AboutBreadCrumb = () => {
  return (
    <div className="about-breadcrumb-wrapper">
      {/* Centered Text Content */}
      <div className="breadcrumb-content">
        <h1 className="breadcrumb-title">About</h1>
        <div className="breadcrumb-nav">
          <span className="nav-item">Home</span>
          <span className="nav-separator">›</span>
          <span className="nav-item active">About</span>
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

export default AboutBreadCrumb;
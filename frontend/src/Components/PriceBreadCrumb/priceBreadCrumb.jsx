import React from 'react';
import './PriceBreadCrumb.css';

// Replace with your local relative path to the cloud image asset
import cloudImg from '../../assets/cloudimage.webp'; 

const PriceBreadCrumb = () => {
  return (
    <div className="price-breadcrumb-wrapper">
      {/* Centered Text Content */}
      <div className="breadcrumb-content">
        <h1 className="breadcrumb-title">Prices</h1>
        <p className="breadcrumb-subtitle">Kindergarten WordPress Theme</p>
        <div className="breadcrumb-nav">
          <span className="nav-item">Home</span>
          <span className="nav-separator">›</span>
          <span className="nav-item active">Prices</span>
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

export default PriceBreadCrumb;
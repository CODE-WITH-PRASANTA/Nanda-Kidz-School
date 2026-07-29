import React from 'react';
import './ShopBreadcrumb.css';
import bgImage from '../../assets/shoop.jpg'; // Adjust path according to your src/assets structure

const ShopBreadcrumb = () => {
  return (
    <div 
      className="ShopBreadcrumb" 
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${bgImage})` }}
    >
      <div className="ShopBreadcrumb-container">
        <h1 className="ShopBreadcrumb-title">Shop</h1>
        <p className="ShopBreadcrumb-subtitle">KINDERGARTEN WORDPRESS THEME</p>
      </div>
    </div>
  );
};

export default ShopBreadcrumb;
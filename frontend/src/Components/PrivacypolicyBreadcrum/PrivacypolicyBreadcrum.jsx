import React from 'react';
import './PrivacypolicyBreadcrum.css';
import bgImage from '../../assets/shoop.jpg'; // ज़रूरत के अनुसार इमेज पाथ बदलें

const PrivacypolicyBreadcrum = () => {
  return (
    <div 
      className="PrivacypolicyBreadcrum" 
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${bgImage})` }}
    >
      <div className="PrivacypolicyBreadcrum-container">
        <h1 className="PrivacypolicyBreadcrum-title">Privacy Policy</h1>
        <p className="PrivacypolicyBreadcrum-subtitle">KINDERGARTEN WORDPRESS THEME</p>
      </div>
    </div>
  );
};

export default PrivacypolicyBreadcrum;
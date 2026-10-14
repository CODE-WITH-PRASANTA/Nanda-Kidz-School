import React from 'react';
import './AboutBreadCrumb.css';
import bgImage from '../../assets/contact.webp'; // Adjust path according to your src/assets structure

const AboutBreadCrumb = () => {
  return (
    <div 
      className="AboutBreadCrumb" 
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${bgImage})` }}
    >
      <div className="AboutBreadCrumb-container">
        <h1 className="AboutBreadCrumb-title">About </h1>
        <p className="AboutBreadCrumb-subtitle">Nanda kidz's The Little KingDom</p>
      </div>
    </div>
  );
};

export default AboutBreadCrumb;
import React from 'react';
import './ContactBreadcrumb.css';
import bgImage from '../../assets/contact.webp'; // Adjust path according to your src/assets structure

const ContactBreadcrumb = () => {
  return (
    <div 
      className="ContactBreadcrumb" 
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${bgImage})` }}
    >
      <div className="ContactBreadcrumb-container">
        <h1 className="ContactBreadcrumb-title">Contact </h1>
        <p className="ContactBreadcrumb-subtitle">Nanda kidz's The Little KingDom</p>
      </div>
    </div>
  );
};

export default ContactBreadcrumb;
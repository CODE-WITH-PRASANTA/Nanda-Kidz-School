import React from 'react';
import './ContactBreadcrumb.css';
import bgImage from '../../assets/contact.jpg'; // Adjust path according to your src/assets structure

const ContactBreadcrumb = () => {
  return (
    <div 
      className="ContactBreadcrumb" 
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${bgImage})` }}
    >
      <div className="ContactBreadcrumb-container">
        <h1 className="ContactBreadcrumb-title">Contact 1</h1>
        <p className="ContactBreadcrumb-subtitle">KINDERGARTEN WORDPRESS THEME</p>
      </div>
    </div>
  );
};

export default ContactBreadcrumb;
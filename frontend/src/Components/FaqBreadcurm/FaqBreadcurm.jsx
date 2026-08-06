import React from 'react';
import './FaqBreadcurm.css';
import bgImage from "../../assets/bcurm.png"; // Import your hero image here

const FaqBanner = () => {
  return (
    <section 
      className="faq-banner" 
      style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${bgImage})` }}
    >
      <div className="faq-banner-container">
        <h1 className="faq-banner-title">FAQ</h1>
        <nav className="faq-banner-breadcrumb" aria-label="breadcrumb">
          <a href="/" className="faq-banner-link">Home</a>
          <span className="faq-banner-separator">|</span>
          <span className="faq-banner-active">FAQ</span>
        </nav>
      </div>
    </section>
  );
};

export default FaqBanner;
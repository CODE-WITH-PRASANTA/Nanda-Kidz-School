import React, { useState } from 'react';
import './CoursesBreadCrumb.css';

// Replace with your local relative path to the cloud image asset
import cloudImg from '../../assets/cloudimage.webp'; 

const CoursesBreadCrumb = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      console.log('Searching for:', searchTerm);
      // यहाँ अपनी सर्च लॉजिक जोड़ें
    }
  };

  return (
    <div className="courses-breadcrumb-wrapper">
      {/* Centered Text Content & Search */}
      <div className="breadcrumb-content">
        <h1 className="breadcrumb-title">Courses</h1>
        <p className="breadcrumb-subtitle">Kindergarten WordPress Theme</p>
        
        <div className="breadcrumb-nav">
          <span className="nav-item">Home</span>
          <span className="nav-separator">›</span>
          <span className="nav-item active">Courses</span>
        </div>

        {/* Search Bar */}
        <form className="breadcrumb-search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="breadcrumb-search-input"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="breadcrumb-search-btn">
            Search
          </button>
        </form>
      </div>

      {/* Infinite Moving Cloud Track */}
      <div className="cloud-animated-track">
        <img src={cloudImg} alt="Cloud Layer 1" className="cloud-image" />
        <img src={cloudImg} alt="Cloud Layer 2" className="cloud-image" />
      </div>
    </div>
  );
};

export default CoursesBreadCrumb;
import React from 'react';
import { Link } from 'react-router-dom';
import './VideoBreadcrumb.css'; 
import video_banner from '../../assets/gallery-banner.webp'; // Update with your actual asset filename

const VideoBreadcrumb = () => {
  return (
    <section 
      className="VideoBreadcrumb-container"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${video_banner})` 
      }}
    >
      <div className="VideoBreadcrumb-content">
        <h1 className="VideoBreadcrumb-title">Videos</h1>
        <div className="VideoBreadcrumb-breadcrumbs">
          <Link to="/" className="VideoBreadcrumb-breadcrumb-home">Home</Link>
          <span className="VideoBreadcrumb-breadcrumb-separator">|</span>
          <span className="VideoBreadcrumb-breadcrumb-current">Videos</span>
        </div>
      </div>
    </section>
  );
};

export default VideoBreadcrumb;
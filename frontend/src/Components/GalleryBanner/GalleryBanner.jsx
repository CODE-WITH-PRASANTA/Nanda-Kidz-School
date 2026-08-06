import React from 'react';
import { Link } from 'react-router-dom'; // Imported Link for routing
import './GalleryBanner.css'; 
import gallery_banner from '../../assets/gallery-banner.webp';

const GalleryBanner = () => {
  return (
    <>
      <section 
        className="GalleryBanner-container"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${gallery_banner})` 
        }}
      >
        <div className="GalleryBanner-content">
          <h1 className="GalleryBanner-title">Gallery</h1>
          <div className="GalleryBanner-breadcrumbs">
            {/* Replaced span with Link to make it functional. Pointing to "/" (Home) */}
            <Link to="/" className="GalleryBanner-breadcrumb-home">Home</Link>
            <span className="GalleryBanner-breadcrumb-separator">|</span>
            <span className="GalleryBanner-breadcrumb-current">Gallery</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default GalleryBanner;
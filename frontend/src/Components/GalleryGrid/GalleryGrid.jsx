import React, { useState } from 'react';
import './GalleryGrid.css';

// Import your local images here
import g1 from '../../assets/g1.webp';
import g2 from '../../assets/g2.webp';
import g3 from '../../assets/g3.webp';
import g4 from '../../assets/g4.webp';
import g5 from '../../assets/g5.webp';
import g6 from '../../assets/g6.webp';

const GalleryGrid = () => {
  // Array of your imported local images
  const images = [g1, g2, g3, g4, g5, g6];

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const goToPrevious = (e) => {
    e.stopPropagation(); // Prevents click from bubbling to the background overlay
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = (e) => {
    e.stopPropagation(); // Prevents click from bubbling to the background overlay
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="GalleryGrid-wrapper">
      {/* Grid Section */}
      <div className="GalleryGrid-container">
        {images.map((img, index) => (
          <div 
            key={index} 
            className="GalleryGrid-item" 
            onClick={() => openLightbox(index)}
          >
            <img src={img} alt={`Gallery ${index + 1}`} className="GalleryGrid-image" />
            
            {/* Hover Overlay with Search Icon */}
            <div className="GalleryGrid-overlay">
              <div className="GalleryGrid-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal Section */}
      {isOpen && (
        <div className="GalleryGrid-modal" onClick={closeLightbox}>
          {/* Close Button */}
          <button className="GalleryGrid-modal-close" onClick={closeLightbox}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Previous Button */}
          <button className="GalleryGrid-modal-prev" onClick={goToPrevious}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          {/* Current Image */}
          <div className="GalleryGrid-modal-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={images[currentIndex]} 
              alt={`Expanded ${currentIndex + 1}`} 
              className="GalleryGrid-modal-img" 
            />
          </div>

          {/* Next Button */}
          <button className="GalleryGrid-modal-next" onClick={goToNext}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryGrid;
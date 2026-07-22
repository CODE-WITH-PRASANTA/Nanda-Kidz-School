import React, { useState } from 'react';
import './Homecoursecategory.css';

// Import local image assets
import artImg from '../../assets/Art.avif';
import musicImg from '../../assets/Music.avif';
import languageImg from '../../assets/Language.avif';
import indoorImg from '../../assets/Indoor.avif';
import danceImg from '../../assets/Dance.avif';
import cookingImg from '../../assets/Cooking.avif';

const Homecoursecategory = () => {
  const allCategories = [
    { id: 1, name: 'Art Classes', image: artImg, frameType: 'shape-1' },
    { id: 2, name: 'Music Classes', image: musicImg, frameType: 'shape-2' },
    { id: 3, name: 'Language', image: languageImg, frameType: 'shape-3' },
    { id: 4, name: 'Indoor', image: indoorImg, frameType: 'shape-4' },
    { id: 5, name: 'Dance', image: danceImg, frameType: 'shape-1' },
    { id: 6, name: 'Cooking', image: cookingImg, frameType: 'shape-2' }
  ];

  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % (allCategories.length - 3));
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? allCategories.length - 4 : prev - 1));
  };

  const visibleCategories = allCategories.slice(startIndex, startIndex + 4);

  return (
    <section className="course-cat-section">
      {/* Background Decorative Outline Stars */}
      <svg className="decor-star star-left" viewBox="0 0 24 24">
        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z" />
      </svg>
      <svg className="decor-star star-right" viewBox="0 0 24 24">
        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z" />
      </svg>

      <span className="subtitle">Course Category</span>
      <h2 className="title">Building community by honoring all traditions</h2>

      <div className="carousel-wrapper">
        {/* Left Arrow */}
        <button className="slider-arrow arrow-left" onClick={handlePrev} aria-label="Slide Left">
          <svg viewBox="0 0 24 24">
            <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
          </svg>
        </button>

        {/* Dynamic Categories Grid */}
        <div className="categories-container">
          {visibleCategories.map((item) => (
            <div key={item.id} className={`card-column theme-${item.frameType}`}>
              <div className={`shape-frame ${item.frameType}`}>
                <div className="inner-img-wrapper">
                  <img src={item.image} alt={item.name} className="counter-rotating-img" />
                </div>
              </div>
              <h3 className="label-text">{item.name}</h3>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button className="slider-arrow arrow-right" onClick={handleNext} aria-label="Slide Right">
          <svg viewBox="0 0 24 24">
            <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Homecoursecategory;
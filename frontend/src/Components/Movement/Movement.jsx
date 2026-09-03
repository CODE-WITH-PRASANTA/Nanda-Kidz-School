import React, { useState, useEffect } from 'react';
import './Movement.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


import slide1 from '../../assets/indoor.webp'; 
import slide2 from '../../assets/c-7.webp'; 
import teacherAvatar from '../../assets/teacher-1.jpg'; 

const Movement = () => {
  
  const slides = [
    {
      id: 1,
      image: slide1,
      title: 'Reading Time',
      description: "Our Reading Time is tailored to your child's specific needs"
    },
    {
      id: 2,
      image: slide2,
      title: 'Movement & Play',
      description: 'Active sessions for physical and creative development'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="movement-section">

      <div className="movement-container">
        {/* Left Column: Image Carousel / Auto Slider */}
        <div className="slider-wrapper">
          <div
            className="slider-track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="slide-item">
                <img src={slide.image} alt={slide.title} className="slide-image" />
                {/* Image Overlay Text */}
                <div className="slide-overlay-text">
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button className="slider-arrow left" onClick={handlePrev} aria-label="Previous">
            <FaChevronLeft />
          </button>
          <button className="slider-arrow right" onClick={handleNext} aria-label="Next">
            <FaChevronRight />
          </button>

          {/* Carousel Dots Indicator */}
          <div className="slider-dots">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Content Area */}
        <div className="content-wrapper">
          <p className="subtitle">SIGNATURE TREATMENTS</p>

          <h2 className="title">
            Movement and <br />
            <span className="highlight-text">Play Time</span>
            <span className="underline-doodle"></span>
          </h2>

          {/* Indian Rupees Price */}
          <p className="price">
            <span className="rupee-symbol">₹</span> 120
          </p>

          <p className="description">
            Join our movement sessions that help children release energy and develop
            coordination. Through gentle exercises and playful activities, we support healthy
            growth and joyful learning. Our caring teachers guide every child to feel happy,
            balanced, and confident.
          </p>

          {/* Hashtags */}
          <div className="tags-container">
            <span className="tag"><span className="hash">#</span> Skill-building</span>
            <span className="tag"><span className="hash">#</span> Joyful Growth</span>
            <span className="tag"><span className="hash">#</span> Calmness</span>
          </div>

          {/* Teacher Profile / Logo Section */}
          <div className="teacher-card">
            <img src={teacherAvatar} alt="Ms. Emily" className="teacher-avatar" />
            <div className="teacher-info">
              <h4 className="teacher-name">Ms. Emily, Preschool Teacher</h4>
              <p className="teacher-quote">I see children blossom with confidence and joy every day.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons (Right Bottom Corner as in Image) */}
      <div className="bottom-action-buttons">
        <button className="btn-demos">DEMOS</button>
        <button className="btn-purchase">PURCHASE</button>
      </div>
    </section>
  );
};

export default Movement;
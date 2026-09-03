import React, { useState } from 'react';
import './Testimonial.css';

// Import Icons
import { FaQuoteRight, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';

// Import bird illustration assets (Replace these paths with your local files)
import birdPair1 from '../../assets/testimonials-1.png';
import birdPair2 from '../../assets/testimonials-2.png';
import birdPair3 from '../../assets/testimonials-3.png';

const testimonialData = [
  {
    id: 1,
    name: 'Glims Bond',
    role: 'Music Teacher',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.',
    birdImage: birdPair1,
  },
  {
    id: 2,
    name: 'Sherlock Bin',
    role: 'Art Teacher',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.',
    birdImage: birdPair2,
  },
  {
    id: 3,
    name: 'Priestly Herbart',
    role: 'Math Teacher',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.',
    birdImage: birdPair3,
  },
  {
    id: 4,
    name: 'Sherlock Bin',
    role: 'Art Teacher',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.',
    birdImage: birdPair2,
  },
  {
    id: 5,
    name: 'Priestly Herbart',
    role: 'Math Teacher',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.',
    birdImage: birdPair3,
  },
  {
    id: 6,
    name: 'Glims Bond',
    role: 'Music Teacher',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.',
    birdImage: birdPair1,
  },
  {
    id: 7,
    name: 'Priestly Herbart',
    role: 'Math Teacher',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.',
    birdImage: birdPair3,
  },
  {
    id: 8,
    name: 'Glims Bond',
    role: 'Music Teacher',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.',
    birdImage: birdPair1,
  },
  {
    id: 9,
    name: 'Sherlock Bin',
    role: 'Art Teacher',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.',
    birdImage: birdPair2,
  },
];

// Helper: turn a full name into initials for the avatar badge
const getInitials = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();

const Testimonial = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(testimonialData.length / 3);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  return (
    <section className="testimonial-section">
      {/* Ambient decorative blobs */}
      <div className="testimonial-section__ambient testimonial-section__ambient--1"></div>
      <div className="testimonial-section__ambient testimonial-section__ambient--2"></div>

      <div className="testimonial-section__container">
        {/* Header Title */}
        <div className="testimonial-section__header">
          <span className="testimonial-section__subtitle">Testimonials</span>
          <h2 className="testimonial-section__title">
            What Parents Say About Us
          </h2>
          <div className="testimonial-section__title-underline"></div>
        </div>

        {/* Carousel Wrapper */}
        <div className="testimonial-section__carousel">
          <button
            className="testimonial-section__nav-btn testimonial-section__nav-btn--prev"
            onClick={handlePrev}
            aria-label="Previous Slide"
          >
            <FaChevronLeft />
          </button>

          <button
            className="testimonial-section__nav-btn testimonial-section__nav-btn--next"
            onClick={handleNext}
            aria-label="Next Slide"
          >
            <FaChevronRight />
          </button>

          <div
            className="testimonial-section__track"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {testimonialData.map((item) => (
              <div key={item.id} className="testimonial-section__card-wrapper">
                <div className="testimonial-section__card">
                  {/* Large translucent background quote mark */}
                  <FaQuoteRight className="testimonial-section__quote-watermark" />

                  {/* Star Rating */}
                  <div className="testimonial-section__stars">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>

                  <p className="testimonial-section__quote">{item.quote}</p>

                  <div className="testimonial-section__footer">
                    <div className="testimonial-section__avatar">
                      {getInitials(item.name)}
                    </div>
                    <div className="testimonial-section__author">
                      <h3 className="testimonial-section__name">{item.name}</h3>
                      <span className="testimonial-section__role">
                        {item.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Bird Pair Image */}
                <div className="testimonial-section__birds-wrapper">
                  <img
                    src={item.birdImage}
                    alt="Decorative Birds"
                    className="testimonial-section__birds-image"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Indicator Dots */}
        <div className="testimonial-section__dots">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`testimonial-section__dot ${
                currentPage === index ? 'testimonial-section__dot--active' : ''
              }`}
              onClick={() => setCurrentPage(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
import React, { useState } from 'react';
import './Testimonial.css';

// Import Icons
import { FaQuoteRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Import bird illustration assets (Replace these paths with your local files)
import birdPair1 from '../../assets/testimonials-1.png'; // Pink/Red & Blue bird pair
import birdPair2 from '../../assets/testimonials-2.png'; // Yellow/Patterned & Purple bird pair
import birdPair3 from '../../assets/testimonials-3.png'; // Green & Teal bird pair

const testimonialData = [
  // Page 1 (Cards 1, 2, 3)
  {
    id: 1,
    name: 'Glims Bond',
    role: 'Music Teacher',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
    birdImage: birdPair1,
  },
  {
    id: 2,
    name: 'Sherlock Bin',
    role: 'Art Teacher',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
    birdImage: birdPair2,
  },
  {
    id: 3,
    name: 'Priestly Herbart',
    role: 'Math Teacher',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
    birdImage: birdPair3,
  },
  // Page 2 (Cards 4, 5, 6)
  {
    id: 4,
    name: 'Sherlock Bin',
    role: 'Art Teacher',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
    birdImage: birdPair2,
  },
  {
    id: 5,
    name: 'Priestly Herbart',
    role: 'Math Teacher',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
    birdImage: birdPair3,
  },
  {
    id: 6,
    name: 'Glims Bond',
    role: 'Music Teacher',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
    birdImage: birdPair1,
  },
  // Page 3 (Cards 7, 8, 9)
  {
    id: 7,
    name: 'Priestly Herbart',
    role: 'Math Teacher',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
    birdImage: birdPair3,
  },
  {
    id: 8,
    name: 'Glims Bond',
    role: 'Music Teacher',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
    birdImage: birdPair1,
  },
  {
    id: 9,
    name: 'Sherlock Bin',
    role: 'Art Teacher',
    quote:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.',
    birdImage: birdPair2,
  },
];

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
      <div className="testimonial-section__container">
        {/* Header Title */}
        <div className="testimonial-section__header">
          <span className="testimonial-section__subtitle">Testimonials</span>
          <h2 className="testimonial-section__title">
            What Parents Say About Us
          </h2>
        </div>

        {/* Carousel Wrapper */}
        <div className="testimonial-section__carousel">
          {/* Navigation Controls in Middle */}
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

          {/* Sliding Track */}
          <div
            className="testimonial-section__track"
            style={{ transform: `translateX(-${currentPage * 100}%)` }}
          >
            {testimonialData.map((item) => (
              <div key={item.id} className="testimonial-section__card-wrapper">
                {/* Circular Orange Card */}
                <div className="testimonial-section__card">
                  {/* Hoverable Quote Icon Badge */}
                  <div className="testimonial-section__quote-badge">
                    <FaQuoteRight />
                  </div>

                  <p className="testimonial-section__quote">{item.quote}</p>

                  <div className="testimonial-section__author">
                    <h3 className="testimonial-section__name">{item.name}</h3>
                    <span className="testimonial-section__role">
                      {item.role}
                    </span>
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
import React from 'react';
import './CoreValues.css';

// Import images
import mainImg from '../../assets/value-1.png';
import shapeRight from '../../assets/value-shape-3 (3).png';
import shapeSun from '../../assets/value-shape-1.png';
import shapePencil from '../../assets/value-shape-2.png';

const CoreValues = () => {
  const valuesData = [
    {
      id: '01',
      title: 'Active Learning',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      colorClass: 'core-values__number--blue',
    },
    {
      id: '02',
      title: 'Safe Environment',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      colorClass: 'core-values__number--yellow',
    },
    {
      id: '03',
      title: 'Fully Equipment',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      colorClass: 'core-values__number--pink',
    },
  ];

  return (
    <section className="core-values">
      {/* Top Left Decorative Image (Sun) */}
      <img
        src={shapeSun}
        alt="Sun element"
        className="core-values__shape core-values__shape--top-left"
      />

      {/* Bottom Left Decorative Image (Pencil) */}
      <img
        src={shapePencil}
        alt="Pencil element"
        className="core-values__shape core-values__shape--bottom-left"
      />

      {/* Right Side Decorative Overlay Image */}
      <img
        src={shapeRight}
        alt="Right decorative element"
        className="core-values__shape core-values__shape--right"
      />

      <div className="core-values__container">
        {/* Left Column: Main Illustration */}
        <div className="core-values__image-wrapper">
          <img
            src={mainImg}
            alt="Childcare Education Teacher"
            className="core-values__main-image"
          />
        </div>

        {/* Right Column: Content Section */}
        <div className="core-values__content">
          <span className="core-values__subtitle">Our Core Values</span>
          <h2 className="core-values__title">
            We are Refunding Early Childcare Education
          </h2>

          {/* List Items */}
          <div className="core-values__list">
            {valuesData.map((item) => (
              <div key={item.id} className="core-values__item">
                <div className={`core-values__number ${item.colorClass}`}>
                  {item.id}
                </div>
                <div className="core-values__item-text">
                  <h3 className="core-values__item-title">{item.title}</h3>
                  <p className="core-values__item-description">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
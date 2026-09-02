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
      title: 'Active Experiential Learning',
      description:
        'At Nanda Kidz, children learn through sensory exploration, fun STEM activities, interactive storytelling, and curiosity-driven play that builds lifelong foundations.',
      colorClass: 'core-values__number--blue',
      tag: 'Brain Development',
    },
    {
      id: '02',
      title: 'Safe, Nurturing & Caring Environment',
      description:
        'A secure, hygienic, and CCTV-monitored campus where certified early childhood educators care for every child with warmth, empathy, and homelike love.',
      colorClass: 'core-values__number--yellow',
      tag: '100% Child Safety',
    },
    {
      id: '03',
      title: 'Modern Child-Friendly Infrastructure',
      description:
        'Specially designed child-safe play zones, Montessori learning kits, audio-visual smart classrooms, and engaging indoor-outdoor activity arenas.',
      colorClass: 'core-values__number--pink',
      tag: 'World-Class Setup',
    },
  ];

  return (
    <section className="core-values">
      {/* Decorative Floating Vectors */}
      <img
        src={shapeSun}
        alt="Nanda Kidz Sunshine Vector"
        className="core-values__shape core-values__shape--top-left"
      />
      <img
        src={shapePencil}
        alt="Creative Learning Pencil Vector"
        className="core-values__shape core-values__shape--bottom-left"
      />
      <img
        src={shapeRight}
        alt="Play School Abstract Graphic"
        className="core-values__shape core-values__shape--right"
      />

      <div className="core-values__container">
        {/* Left Column: Premium Framed Illustration */}
        <div className="core-values__image-wrapper">
          <div className="core-values__image-backdrop"></div>
          <img
            src={mainImg}
            alt="Best Pre-School and Kindergarten Education at Nanda Kidz"
            className="core-values__main-image"
          />
          <div className="core-values__experience-card">
            <span className="exp-star">⭐</span>
            <div>
              <strong>#1 Rated Pre-School</strong>
              <small>Play School • LKG • UKG</small>
            </div>
          </div>
        </div>

        {/* Right Column: SEO Optimized Value Proposition */}
        <div className="core-values__content">
          <div className="core-values__badge">
            <span className="core-values__subtitle">Why Choose Nanda Kidz</span>
          </div>

          <h2 className="core-values__title">
            Redefining Early Childhood Education for <span className="text-highlight">Tomorrow’s Leaders</span>
          </h2>

          <p className="core-values__intro-text">
            Nanda Kidz Play School & Kindergarten provides a stimulating blend of Montessori and play-way methodologies, empowering little minds with confidence, creativity, and foundational academic brilliance.
          </p>

          {/* List Items */}
          <div className="core-values__list">
            {valuesData.map((item) => (
              <div key={item.id} className="core-values__item">
                <div className={`core-values__number ${item.colorClass}`}>
                  {item.id}
                </div>
                <div className="core-values__item-text">
                  <div className="core-values__header-row">
                    <h3 className="core-values__item-title">{item.title}</h3>
                    <span className="core-values__pill-tag">{item.tag}</span>
                  </div>
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
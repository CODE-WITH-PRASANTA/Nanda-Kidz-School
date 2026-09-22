import React from 'react';
import './AboutBackbone.css';

// Decorative illustrations
import planetImg from '../../assets/planate.avif';
import rocketImg from '../../assets/rocketmeet.webp';

// Partner logo images
import meet1 from '../../assets/meet1.avif';
import meet2 from '../../assets/meet2.avif';
import meet3 from '../../assets/meet3.avif';
import meet4 from '../../assets/meet4.avif';
import meet5 from '../../assets/meet5.webp';
import meet6 from '../../assets/meet6.avif';
import meet7 from '../../assets/meet7.avif';
import meet8 from '../../assets/meet8.webp';

const AboutBackbone = () => {
  const partnerLogos = [
    {
      id: 1,
      name: 'Reaching Stars',
      src: meet1,
    },
    {
      id: 2,
      name: 'Heroes',
      src: meet2,
    },
    {
      id: 3,
      name: 'Company Kids Camp',
      src: meet3,
    },
    {
      id: 4,
      name: 'Eye Out',
      src: meet4,
    },
    {
      id: 5,
      name: 'Kids Land',
      src: meet5,
    },
    {
      id: 6,
      name: 'The Carnival',
      src: meet6,
    },
    {
      id: 7,
      name: 'Colors',
      src: meet7,
    },
    {
      id: 8,
      name: 'Take Stars',
      src: meet8,
    },
  ];

  return (
    <section className="about-backbone-container">
      {/* Decorative Planet */}
      <div className="decorative-element planet-icon">
        <img
          src={planetImg}
          alt=""
          aria-hidden="true"
        />
      </div>

      {/* Decorative Rocket */}
      <div className="decorative-element rocket-icon">
        <img
          src={rocketImg}
          alt=""
          aria-hidden="true"
        />
      </div>

      <div className="about-backbone-content">
        {/* Section Header */}
        <div className="about-backbone-header">
          <div className="badge-icon" aria-hidden="true">
            <span className="cap-icon">🎓</span>
          </div>

          <span className="subtitle">
            A HAPPY START FOR EVERY CHILD
          </span>

          <h1 className="title">
            best play school in bhubaneswar
          </h1>

          <p className="description">
            Choosing the right play school is an important first step
            in your child&apos;s learning journey. At Nanda Kidz, we
            focus on creating a safe, friendly and joyful environment
            where children can learn through play, activities and
            everyday experiences.
          </p>

          <p className="description secondary-description">
            Parents looking for information about <strong>play school
            fees in bhubaneswar</strong> can connect with our team to
            understand our programs, activities and the learning
            support provided for children.
          </p>
        </div>

        {/* Partner Logos */}
        <div className="partners-grid">
          {partnerLogos.map((logo) => (
            <div
              key={logo.id}
              className="logo-card"
              title={logo.name}
            >
              <img
                src={logo.src}
                alt={`${logo.name} partner logo`}
                className="partner-logo"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutBackbone;
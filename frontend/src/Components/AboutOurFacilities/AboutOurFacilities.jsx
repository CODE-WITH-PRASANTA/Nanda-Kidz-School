import React from 'react';
import './AboutOurFacilities.css';

import cloudImg from '../../assets/cloude.webp';
import rainbowImg from '../../assets/rainbow.webp';

import facility1 from '../../assets/ourfacilities1.webp';
import facility2 from '../../assets/ourfacilities2.webp';
import facility3 from '../../assets/ourfacilities3.webp';
import facility4 from '../../assets/ourfacilities4.webp';

/* =========================================================
   FACILITY ICONS
========================================================= */

const BookIcon = () => (
  <svg
    className="about-facilities-action-svg-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const BusIcon = () => (
  <svg
    className="about-facilities-action-svg-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M19 17h2l.64-2.54a6 6 0 0 0 .36-2.04V8c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v4.42c0 .69.12 1.38.36 2.04L3 17h2" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
    <path d="M5 11h14" />
  </svg>
);

const SlideIcon = () => (
  <svg
    className="about-facilities-action-svg-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 22V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v18" />
    <path d="M10 6l10 10v6" />
    <path d="M4 10h6" />
    <path d="M4 16h6" />
  </svg>
);

/* =========================================================
   FACILITIES DATA
========================================================= */

const facilitiesData = [
  {
    id: 1,
    title: 'Nanda Kidz The Little Kingdom',
    description:
      'A warm and welcoming play school where children feel comfortable, cared for and free to explore. We create everyday learning experiences that make the first steps of education enjoyable.',
    image: facility1,
    icon: <BookIcon />,
  },
  {
    id: 2,
    title: 'Fruit Day',
    description:
      'Simple celebrations become meaningful learning moments. Children enjoy sharing, identifying different fruits and learning the importance of healthy habits through fun activities.',
    image: facility2,
    icon: <BusIcon />,
  },
  {
    id: 3,
    title: 'Kids Playing Club',
    description:
      'Play gives children room to move, communicate and make friends. Our activities encourage teamwork, confidence, coordination and social skills in a joyful setting.',
    image: facility3,
    icon: <SlideIcon />,
  },
  {
    id: 4,
    title: 'Friendship Day',
    description:
      'Children learn some of life’s most important lessons through friendship. Sharing, caring, listening and helping others are encouraged through cheerful group activities.',
    image: facility4,
    icon: <BookIcon />,
  },
];

/* =========================================================
   COMPONENT
========================================================= */

const AboutOurFacilities = () => {
  const whatsappNumber = '919438013349';

  return (
    <section className="about-facilities-section">
      {/* Decorative Cloud */}
      <img
        src={cloudImg}
        alt=""
        className="about-facilities-decoration-cloud"
        aria-hidden="true"
      />

      {/* Decorative Rainbow */}
      <img
        src={rainbowImg}
        alt=""
        className="about-facilities-decoration-rainbow"
        aria-hidden="true"
      />

      {/* =====================================================
          SECTION HEADER
      ===================================================== */}
      <div className="about-facilities-header">
        <div className="about-facilities-sub-title">
          <span
            className="about-facilities-icon-grad-cap"
            aria-hidden="true"
          >
            🎓
          </span>
          <span>Our Facilities</span>
        </div>

        {/* Exact SEO Keyword in H1 */}
        <h1 className="about-facilities-main-title">
          best play school for kids in bhubaneswar
        </h1>

        <p className="about-facilities-header-description">
          Choosing the right early-learning environment is an important
          decision for every parent. At Nanda Kidz, we focus on creating
          a place where children can play, learn, make friends and grow
          with confidence.
        </p>

        <p className="about-facilities-header-highlight">
          Nanda Kidz The Little Kingdom A Play School in Kalinganagar,
          Bhubaneswar, where learning begins with care, curiosity and play.
        </p>
      </div>

      {/* =====================================================
          FACILITY CARDS
      ===================================================== */}
      <div className="about-facilities-grid">
        {facilitiesData.map((facility) => {
          const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            `Hi! I would like to explore more about ${facility.title} at Nanda Kidz.`
          )}`;

          return (
            <article key={facility.id} className="about-facilities-card">
              {/* Image */}
              <div className="about-facilities-image-frame">
                <img
                  src={facility.image}
                  alt={facility.title}
                  className="about-facilities-image"
                  loading="lazy"
                />
                <div
                  className="about-facilities-image-shine"
                  aria-hidden="true"
                ></div>
              </div>

              {/* Content */}
              <div className="about-facilities-card-content">
                <h2 className="about-facilities-card-title">
                  {facility.title}
                </h2>
                <div
                  className="about-facilities-wavy-underline"
                  aria-hidden="true"
                ></div>
                <p className="about-facilities-card-description">
                  {facility.description}
                </p>
              </div>

              {/* Action */}
              <div className="about-facilities-card-action">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-facilities-action-pill"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="about-facilities-icon-wrapper">
                    {facility.icon}
                  </div>
                  <span className="about-facilities-action-text">
                    EXPLORE
                    <span className="about-facilities-action-arrow">↗</span>
                  </span>
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {/* =====================================================
          BOTTOM SEO / PARENT MESSAGE
      ===================================================== */}
      <div className="about-facilities-bottom-content">
        <span className="about-facilities-bottom-label">
          A happy beginning matters
        </span>
        <h2>Which school is best for my child?</h2>
        <p>
          There is no single answer for every child. The right school is one
          where your little one feels safe, welcomed and encouraged to discover
          something new each day. If you are looking for the{' '}
          <strong>Best play school in Kalinganagar</strong>, Nanda Kidz offers
          a child-friendly environment built around play, interaction and early
          development.
        </p>
      </div>
    </section>
  );
};

export default AboutOurFacilities;
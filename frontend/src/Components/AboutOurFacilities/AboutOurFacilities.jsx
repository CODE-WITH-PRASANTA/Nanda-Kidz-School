import React from 'react';
import './AboutOurFacilities.css';

// Fixed decorative images from your project structure
import cloudImg from '../../assets/cloude.webp';
import rainbowImg from '../../assets/rainbow.webp';

// Facility card main images
import facility1 from '../../assets/ourfacilities1.webp';
import facility2 from '../../assets/ourfacilities2.webp';
import facility3 from '../../assets/ourfacilities3.webp';
import facility4 from '../../assets/ourfacilities4.webp';

// Inline Vector Icons matching the reference style
const BookIcon = () => (
  <svg className="about-facilities-action-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const BusIcon = () => (
  <svg className="about-facilities-action-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 17h2l.64-2.54a6 6 0 0 0 .36-2.04V8c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v4.42c0 .69.12 1.38.36 2.04L3 17h2" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
    <path d="M5 11h14" />
  </svg>
);

const SlideIcon = () => (
  <svg className="about-facilities-action-svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 22V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v18" />
    <path d="M10 6l10 10v6" />
    <path d="M4 10h6" />
    <path d="M4 16h6" />
  </svg>
);

const facilitiesData = [
  {
    id: 1,
    title: 'Nanda Kidz Play School',
    description:
      'A cheerful home away from home where every child feels welcomed, safe, and encouraged to explore, learn, and grow at their own happy pace.',
    image: facility1,
    icon: <BookIcon />,
  },
  {
    id: 2,
    title: 'Fruite Day',
    description:
      'A special day where little ones celebrate bonding, sharing, and kindness together, building friendships that make school feel like family.',
    image: facility2,
    icon: <BusIcon />,
  },
  {
    id: 3,
    title: 'Kids Playing Club',
    description:
      'Fun-filled group play sessions that build teamwork, physical activity, and social skills, helping children learn through movement and laughter.',
    image: facility3,
    icon: <SlideIcon />,
  },
  {
    id: 4,
    title: 'Frendship Day',
    description:
      'A special day where little ones celebrate bonding, sharing, and kindness together, building friendships that make school feel like family..',
    image: facility4,
    icon: <BookIcon />,
  },
];

const AboutOurFacilities = () => {
  return (
    <section className="about-facilities-section">
      {/* Fixed Header Decorative Images */}
      <img src={cloudImg} alt="Sun and Cloud" className="about-facilities-decoration-cloud" />
      <img src={rainbowImg} alt="Rainbow and Sun" className="about-facilities-decoration-rainbow" />

      {/* Header Text Block */}
      <div className="about-facilities-header">
        <div className="about-facilities-sub-title">
          <span className="about-facilities-icon-grad-cap">🎓</span> OUR FACILITIES
        </div>
        <h2 className="about-facilities-main-title">Know What Facilities We Provide</h2>
        <p className="about-facilities-header-description">
          Faucibus Scelerisque Eleifend Donec Pretium Vulputate Sapien Nec Sagittis.
          Sit Amet Porttitor Eget Dolor Morbi Non. In Hendrerit Gravida Rutrum Quisque.
          Egestas Pretium Aenean Pharetra Magna.
        </p>
      </div>

      {/* 4 Facility Boxes */}
      <div className="about-facilities-grid">
        {facilitiesData.map((facility) => (
          <div key={facility.id} className="about-facilities-card">
            {/* Arched Photo Frame with Flower Zoom effect */}
            <div className="about-facilities-image-frame">
              <img
                src={facility.image}
                alt={facility.title}
                className="about-facilities-image"
              />
            </div>

            {/* Text Content */}
            <div className="about-facilities-card-content">
              <h3 className="about-facilities-card-title">{facility.title}</h3>
              <div className="about-facilities-wavy-underline"></div>
              <p className="about-facilities-card-description">{facility.description}</p>
            </div>

            {/* View More & Icon Action Button */}
            <div className="about-facilities-card-action">
              <div className="about-facilities-action-pill">
                <div className="about-facilities-icon-wrapper">{facility.icon}</div>
                <span className="about-facilities-action-text">VIEW MORE &#x2197;</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutOurFacilities;
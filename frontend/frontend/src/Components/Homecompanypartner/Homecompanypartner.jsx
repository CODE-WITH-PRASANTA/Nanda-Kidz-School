import React, { useState, useEffect } from 'react';
import './Homecompanypartner.css';

// Import local image assets
import reachingStarsImg from '../../assets/Logo_1.avif';
import heroesImg from '../../assets/Logo_4.avif';
import companyKidsCampImg from '../../assets/Logo_2.avif';
import eyecotImg from '../../assets/Logo_3.avif';
import kidsLandImg from '../../assets/Logo_5.webp';

// Array of partner logos using imported image modules
const initialPartners = [
  { id: 1, name: 'Reaching Stars', src: reachingStarsImg },
  { id: 2, name: 'Heroes', src: heroesImg },
  { id: 3, name: 'Company Kids Camp', src: companyKidsCampImg },
  { id: 4, name: 'Eyecot', src: eyecotImg },
  { id: 5, name: 'Kids Land', src: kidsLandImg },
];

// Utility function to shuffle array elements on reload
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Homecompanypartner = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    // Shuffle the logos every time the component mounts
    setPartners(shuffleArray(initialPartners));
  }, []);

  return (
    <section className="Homecompanypartner">
      <div className="container">
        {/* Header Section */}
        <div className="header-wrapper">
          <span className="subtitle">COMPANY PARTNER</span>
          <h2 className="title">Our Education Sponsors</h2>
        </div>

        {/* Partners Grid */}
        <div className="partners-grid">
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className="partner-card"
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              <img
                src={partner.src}
                alt={partner.name}
                className="partner-logo"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Homecompanypartner;
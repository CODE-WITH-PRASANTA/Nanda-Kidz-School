import React from 'react';
import './AboutBackbone.css';

// Imported illustrations
import planetImg from '../../assets/planate.avif';
import rocketImg from '../../assets/rocketmeet.webp';

// Imported partner logo images from your directory
import meet1 from '../../assets/meet1.avif';
import meet2 from '../../assets/meet2.avif';
import meet3 from '../../assets/meet3.avif';
import meet4 from '../../assets/meet4.avif';
import meet5 from '../../assets/meet5.webp';
import meet6 from '../../assets/meet6.avif';
import meet7 from '../../assets/meet7.avif';
import meet8 from '../../assets/meet8.webp';

const AboutBackbone = () => {
  // Array holding logo items with exact imports attached
  const partnerLogos = [
    { id: 1, name: 'Reaching Stars', src: meet1 },
    { id: 2, name: 'Heroes', src: meet2 },
    { id: 3, name: 'Company Kids Camp', src: meet3 },
    { id: 4, name: 'Eye Out', src: meet4 },
    { id: 5, name: 'Kids Land', src: meet5 },
    { id: 6, name: 'The Carnival', src: meet6 },
    { id: 7, name: 'Colors', src: meet7 },
    { id: 8, name: 'Take Stars', src: meet8 },
  ];

  return (
    <section className="about-backbone-container">
      {/* Decorative Floating/Background Elements */}
      <div className="decorative-element planet-icon">
        <img src={planetImg} alt="Planet Illustration" />
      </div>

      <div className="decorative-element rocket-icon">
        <img src={rocketImg} alt="Rocket Illustration" />
      </div>

      {/* Main Content Area */}
      <div className="about-backbone-content">
        <div className="about-backbone-header">
          <div className="badge-icon">
            <span className="cap-icon">🎓</span>
          </div>
          <span className="subtitle">MEET THE BACKBONES</span>
          <h2 className="title">Our Associate Partners</h2>
          <p className="description">
            Amet Mattis Vulputate Enim Nulla Aliquet Porttitor Lacus.
            <br />
            Sed Sed Risus Pretium Quam Vulputate. Augue Lacus
            <br />
            Viverra Vitae Congue Eu Consequat Ac.
          </p>
        </div>

        {/* Partners Logo Grid */}
        <div className="partners-grid">
          {partnerLogos.map((logo) => (
            <div key={logo.id} className="logo-card">
              <img src={logo.src} alt={logo.name} className="partner-logo" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutBackbone;
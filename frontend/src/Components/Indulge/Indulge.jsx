import React from 'react';
import './Indulge.css';

import blueCreatureImage from '../../assets/an-01.png'; 
import grassImage from '../../assets/grass.png';                 

// Optional background doodles if you have them as separate images
// import doodleWaves from './assets/doodle-waves.png';
// import doodleDots from './assets/doodle-dots.png';

const Indulge = () => {
  const treatments = [
    { label: 'sale', tagClass: 'tag-sale', name: 'Hot Stone Massage', price: '$ 250' },
    { label: 'promo', tagClass: 'tag-promo', name: 'Reflexology', price: '$ 650' },
    { label: 'new', tagClass: 'tag-new', name: 'Hydrating Facial', price: '$ 580' },
    { label: 'promo', tagClass: 'tag-promo', name: 'Slimming Body Wrap', price: '$ 450' },
    { label: 'sale', tagClass: 'tag-sale', name: 'Relaxation Massage', price: '$ 45' },
  ];

  return (
    <section className="indulge-section">
      {/* Background Doodles (Optional) */}
      {/* <img src={doodleWaves} alt="" className="doodle doodle-waves" />
      <img src={doodleDots} alt="" className="doodle doodle-dots" /> */}

      <div className="indulge-container">
        
        {/* --- Left Column: Text and Character --- */}
        <div className="indulge-left">
          <p className="good-impact">GOOD IMPACT</p>
          <h2 className="main-heading">
            Indulge in Pure <br />
            <span className="highlight-text">Relaxation</span>
            <span className="underline-doodle"></span>
          </h2>
          <p className="description-text">
            Take a moment to reconnect with yourself. We offer a range of treatments designed
            to calm your mind, soothe your body, and refresh your spirit. Whether you’re
            enjoying a peaceful massage or a rejuvenating facial, every experience is tailored to
            help you escape.
          </p>
          
          {/* Alignment 100% SAME: Character placement */}
          <div className="character-area">
            <img src={grassImage} alt="Grass" className="grass-img" />
            <img src={blueCreatureImage} alt="Blue Creature" className="creature-img" />
          </div>
        </div>

        {/* --- Right Column: Treatment List --- */}
        <div className="indulge-right">
          <ul className="treatment-list">
            {treatments.map((treatment, index) => (
              <li key={index} className="treatment-item">
                <span className={`treatment-tag ${treatment.tagClass}`}>{treatment.label}</span>
                <span className="treatment-name">{treatment.name}</span>
                <span className="treatment-price">{treatment.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Indulge;
import React from 'react';
import './Contacts.css';

import crayonIcon from '../../assets/ico-01.png';
import paperPlaneIcon from '../../assets/ico-02.png';
import rockingHorseIcon from '../../assets/ico-03.png';
import beeImg from '../../assets/Animal-11.png';
import grassImg from '../../assets/grass.png';

const contactCards = [
  {
    id: 1,
    icon: crayonIcon,
    title: 'General Inquiries',
    description: 'Have questions? Our team is here to help with any information you need.',
    email: 'info@babykids.com',
    phone: '+1 583 454 846',
  },
  {
    id: 2,
    icon: paperPlaneIcon,
    title: 'Support Requests',
    description: 'Need assistance or technical support? Reach out to our dedicated helpdesk.',
    email: 'edu@babykids.com',
    phone: '+1 693 584 468',
  },
  {
    id: 3,
    icon: rockingHorseIcon,
    title: 'Partnership',
    description: 'Interested in collaborating? Let’s build something meaningful together.',
    email: 'book@babykids.com',
    phone: '+1 648 457 468',
  },
];

const Contacts = () => {
  return (
    <section className="contacts-wrapper">
      {/* साइड और डेकोरेटिव इलस्ट्रेशन्स */}
      <img src={beeImg} alt="Bee Illustration" className="decor-bee" />
      <img src={grassImg} alt="Grass Illustration" className="decor-grass" />

      {/* 3-कॉलम कंटेंट ग्रिड */}
      <div className="contacts-container">
        <div className="contacts-grid">
          {contactCards.map((card) => (
            <div key={card.id} className="contact-card">
              <div className="contact-icon-wrapper">
                <img src={card.icon} alt={card.title} className="contact-icon" />
              </div>
              <h3 className="contact-title">{card.title}</h3>
              <p className="contact-description">{card.description}</p>
              <a href={`mailto:${card.email}`} className="contact-email">
                {card.email}
              </a>
              <p className="contact-phone">{card.phone}</p>
            </div>
          ))}
        </div>
      </div>

      {/* बॉटम वेवी (Wavy) शेप डिवाइडर */}
      <div className="wave-divider">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="wave-svg"
        >
          <path
            d="M0,0 C150,90 350,-40 500,50 C650,140 900,-20 1200,40 L1200,120 L0,120 Z"
            fill="#ffffff"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Contacts;
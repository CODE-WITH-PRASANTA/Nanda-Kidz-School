import React from 'react';
import './Focused.css';
import { FaCheck } from 'react-icons/fa'; // Requires: npm install react-icons

// --- IMPORTANT: Replace these with your actual local image paths ---
// Main Card Images
import gentleImage from '../../assets/c-3.jpg'; 
import storyImage from '../../assets/c-9.jpg';    
import outdoorImage from '../../assets/c-8.jpg'; 

const Focused = () => {
  const cards = [
    {
      id: 1,
      image: gentleImage,
      title: 'Gentle Care Time',
      price: '50',
      description: 'A nurturing moment to help children feel happy, calm, and cared for.',
      features: [
        'Refreshes little smiles',
        'Encourages curious minds',
        'For every child\'s unique needs'
      ],
      buttonText: 'MORE INFO',
      type: 'standard' // standard white card
    },
    {
      id: 2,
      image: storyImage,
      title: 'Storytime Session',
      price: '65',
      description: 'Help children relax and enjoy. Calm and joyful & free play time',
      features: [
        'Sparks imagination',
        'Encourages creativity',
        'Supports social skills'
      ],
      buttonText: 'REQUEST NOW',
      type: 'featured' // orange card
    },
    {
      id: 3,
      image: outdoorImage,
      title: 'Outdoor Play Time',
      price: '73',
      description: 'Active and joyful time outside with friends. Fresh Air Fun',
      features: [
        'Builds strong bodies',
        'Safe and happy space',
        'Fun for everyone'
      ],
      buttonText: 'READ MORE',
      type: 'standard' // standard white card
    }
  ];

  return (
    <section className="focused-section">

      <div className="focused-container">
        {/* Header Area */}
        <div className="focused-header">
          <p className="header-subtitle">OUR PATH OF LEARNING</p>
          <h2 className="header-title">
            Focused on <span className="highlight-text">Growth</span>
          </h2>
          <p className="header-description">
            Our program is designed to support each child's unique way of learning. Through caring teachers and engaging activities, we nurture curiosity, kindness, and confidence, helping every child thrive and grow.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="focused-cards-grid">
          {cards.map((card) => (
            <div key={card.id} className={`focused-card ${card.type}`}>
              {/* Card Image */}
              <div className="card-image-wrapper">
                <img src={card.image} alt={card.title} className="card-image" />
              </div>

              {/* Card Content (White or Orange area) */}
              <div className="card-content">
                <p className="card-title">{card.title}</p>
                
                {/* Price with Indian Rupees Sign */}
                <p className="card-price">
                  <span className="rupee-sign">₹</span>
                  {card.price}
                </p>
                
                <p className="card-description">{card.description}</p>
                
                {/* Features List */}
                <ul className="card-features">
                  {card.features.map((feature, index) => (
                    <li key={index}>
                      <FaCheck className="check-icon" /> {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button className="card-button">{card.buttonText}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Focused;
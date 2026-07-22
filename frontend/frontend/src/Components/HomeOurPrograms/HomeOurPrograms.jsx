import React from 'react';
import './HomeOurPrograms.css';

const HomeOurPrograms = () => {
  const programsData = [
    {
      id: 1,
      title: 'BASIC COURSES PACKAGE',
      price: '$120.00',
      duration: '/ 3 Months Once',
      features: [
        'Habitasse platea dictumst.',
        'Eleifend mi in nulla posuere.',
        'Vel pharetra vel turpis nunc.',
        'Urna duis convallis convallis tellus.'
      ],
      buttonText: 'GET PLAN',
      buttonColor: 'purple'
    },
    {
      id: 2,
      title: 'ADVANCE COURSES PACKAGE',
      price: '$160.00',
      duration: '/ 3 Months Once',
      features: [
        'Cursus vitae congue mauris.',
        'Netus et malesuada fames ac.',
        'Vitae congue eu consequat.',
        'Nascetur ridiculus mus mauris.'
      ],
      buttonText: 'GET PLAN',
      buttonColor: 'purple'
    },
    {
      id: 3,
      title: 'PRO COURSES PACKAGE',
      price: '$199.00',
      duration: '/ 3 Months Once',
      features: [
        'Ultricies mi quis hendrerit dolor.',
        'Morbi tincidunt augue interdum.',
        'Pretium lectus quam id leo.',
        'Interdum posuere lorem ipsum.'
      ],
      buttonText: 'GET PLAN',
      buttonColor: 'green'
    }
  ];

  return (
    <section className="HomeOurPrograms">
      <div className="HomeOurPrograms-container">
        
        {/* Header Section */}
        <div className="HomeOurPrograms-header">
          <span className="HomeOurPrograms-subtitle">OUR PROGRAMS</span>
          <h2 className="HomeOurPrograms-title">Standard Fee Structure</h2>
          
          {/* Decorative Pencil Icon */}
          <div className="HomeOurPrograms-pencil-wrapper">
            <svg className="HomeOurPrograms-pencil-scribble" viewBox="0 0 100 40" fill="none">
              <path d="M5,35 Q20,10 40,30 T80,15" stroke="#666" strokeWidth="1.5" fill="none" />
            </svg>
            <span className="HomeOurPrograms-pencil-emoji">✏️</span>
          </div>
        </div>

        {/* Cards List */}
        <div className="HomeOurPrograms-list">
          {programsData.map((program) => (
            <div 
              key={program.id} 
              className={`HomeOurPrograms-card ${program.id === 1 ? 'initial-active' : ''}`}
            >
              {/* Overlay Background for the Hover State */}
              <div className="HomeOurPrograms-card-overlay"></div>

              {/* Package Title */}
              <div className="HomeOurPrograms-card-section HomeOurPrograms-title-col">
                <h3>{program.title}</h3>
              </div>

              {/* Price Details */}
              <div className="HomeOurPrograms-card-section HomeOurPrograms-price-col">
                <span className="HomeOurPrograms-price-amount">{program.price}</span>
                <span className="HomeOurPrograms-price-duration">{program.duration}</span>
              </div>

              {/* Features List */}
              <div className="HomeOurPrograms-card-section HomeOurPrograms-features-col">
                <ul>
                  {program.features.map((feature, idx) => (
                    <li key={idx}>
                      <span className="HomeOurPrograms-check-icon">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="HomeOurPrograms-card-section HomeOurPrograms-btn-col">
                <button className={`HomeOurPrograms-btn ${program.buttonColor}`}>
                  {program.buttonText} 
                  <span className="HomeOurPrograms-arrow">↗</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HomeOurPrograms;
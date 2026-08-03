import React, { useState } from 'react';
import './FindUs.css';

const FindUs = () => {
  // अकोर्डियन (Dropdowns) के स्टेट मैनेजमेंट के लिए
  const [openIndex, setOpenIndex] = useState(null);

  const accordionData = [
    {
      title: 'Central Location',
      content:
        'We are conveniently located in the center of the city with easy access to public transport and parking facilities.',
    },
    {
      title: 'Comprehensive Services',
      content:
        'Our program offers a wide range of learning activities, emotional support, and interactive development care for all ages.',
    },
    {
      title: 'Community Focused',
      content:
        'We foster a strong community environment where parents and children collaborate and connect seamlessly.',
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="findus-wrapper">
      <div className="findus-container">
        
        {/* Left Content Area */}
        <div className="findus-content">
          <p className="findus-subtitle">FIND US HERE</p>
          
          <h1 className="findus-title">
            Reach Out and <br />
            <span className="highlight-connect">
              Connect
              <svg className="squiggle-line" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10 Q 15 2, 30 10 T 60 10 T 90 10" stroke="#f0b832" strokeWidth="4" strokeLinecap="round" fill="none" />
              </svg>
            </span>
          </h1>

          {/* Accordion / Dropdowns */}
          <div className="accordion-section">
            {accordionData.map((item, index) => (
              <div key={index} className="accordion-item">
                <button
                  className={`accordion-header ${openIndex === index ? 'active' : ''}`}
                  onClick={() => toggleAccordion(index)}
                >
                  <span className={`accordion-icon ${openIndex === index ? 'open' : ''}`}>
                    ❮
                  </span>
                  <span className="accordion-title-text">{item.title}</span>
                </button>
                
                {openIndex === index && (
                  <div className="accordion-body">
                    <p>{item.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* View Prices Button */}
          <button className="view-prices-btn">VIEW PRICES</button>

          {/* Stat Cards */}
          <div className="stats-container">
            <div className="stat-card yellow-card">
              <span className="stat-number">96</span>
              <span className="stat-label">Learning Time</span>
            </div>
            <div className="stat-card red-card">
              <span className="stat-number">87</span>
              <span className="stat-label">Self-Care</span>
            </div>
          </div>
        </div>

        {/* Right Map Area */}
        <div className="findus-map-container">
          <iframe
            title="London Eye Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.54060803407!2d-0.12202612338010485!3d51.50332407181467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900d26973%3A0x4291f3172409ea92!2slondon%20eye!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="google-map-iframe"
          ></iframe>
        </div>

      </div>
    </div>
  );
};

export default FindUs;
import React, { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import './FaqSection.css';

// Import image from your assets folder or use a placeholder URL
import faqImage from "../../assets/faq.jpg"; 

const faqData = [
  {
    id: 1,
    question: 'Explore Your Option',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 2,
    question: 'Submit Application in Online',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 3,
    question: 'Receive Assign Task',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 4,
    question: 'Register at Your Assign Class',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 5,
    question: 'Go Online Live Class',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  }
];

const FaqSection = () => {
  // Set default open item to 1 (matching reference UI)
  const [openIndex, setOpenIndex] = useState(1);

  const toggleAccordion = (id) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <section className="FaqSection">
      <div className="FaqSection-container">
        
        {/* Subtitle & Title */}
        <div className="FaqSection-header">
          <span className="FaqSection-subtitle">FAQ</span>
          <h2 className="FaqSection-title">Frequently Asked Questions</h2>
        </div>

        {/* Content Wrapper */}
        <div className="FaqSection-content">
          
          {/* Left Column: Image */}
          <div className="FaqSection-image-wrapper">
            <img 
              src={faqImage} 
              alt="Woman standing near whiteboard" 
              className="FaqSection-image" 
            />
          </div>

          {/* Right Column: Accordion Card */}
          <div className="FaqSection-card">
            <div className="FaqSection-accordion">
              {faqData.map((item) => {
                const isOpen = openIndex === item.id;
                return (
                  <div 
                    key={item.id} 
                    className={`FaqSection-item ${isOpen ? 'active' : ''}`}
                  >
                    <button 
                      className="FaqSection-question-btn" 
                      onClick={() => toggleAccordion(item.id)}
                    >
                      <span className="FaqSection-question">{item.question}</span>
                      <span className="FaqSection-icon">
                        {isOpen ? <FiMinus /> : <FiPlus />}
                      </span>
                    </button>
                    
                    {isOpen && (
                      <div className="FaqSection-answer">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FaqSection;
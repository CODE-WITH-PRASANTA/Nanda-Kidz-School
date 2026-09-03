import React from 'react';
import './LearningAdventuers.css';


import kids1Img from '../../assets/c-1.webp'; // Left card image
import bubbleGirlImg from '../../assets/c-5.webp'; // Center card image
import musicGirlImg from '../../assets/c-3.webp'; // Right card image
import giraffeImg from '../../assets/jeeraf.png'; // Giraffe illustration

const LearningAdventuers = () => {
  // पेज के टॉप पर स्क्रॉल करने के लिए फंक्शन
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="adventures-wrapper">
      <div className="adventures-container">
        {/* Left Card - Peaceful Learning Time */}
        <div className="adventure-card side-card">
          <div className="image-blob-wrapper blue-blob">
            <img src={kids1Img} alt="Peaceful Learning Time" className="blob-image" />
          </div>
          <div className="card-content">
            <span className="decorative-icon spiral-icon">🌀</span>
            <h3 className="card-title">Peaceful Learning Time</h3>
            <p className="card-description">
              Enjoy our Special Calm Time, created to help children feel safe, focused, and ready to learn.
              Through gentle activities and quiet moments, we support their emotional growth and happiness.
            </p>
            <button className="card-btn green-btn" onClick={scrollToTop}>
              CONTACT US
            </button>
          </div>
        </div>

        {/* Center Card - Learning Adventures */}
        <div className="adventure-card center-card">
          <div className="center-image-container">
            <img src={bubbleGirlImg} alt="Learning Adventures" className="center-bg-image" />
            <div className="image-overlay">
              <h2 className="center-card-title">Learning Adventures</h2>
            </div>
          </div>
          <img src={giraffeImg} alt="Giraffe" className="giraffe-illustration" />
        </div>

        {/* Right Card - Path to Growth */}
        <div className="adventure-card side-card">
          <div className="image-blob-wrapper yellow-blob">
            <img src={musicGirlImg} alt="Path to Growth" className="blob-image" />
          </div>
          <div className="card-content">
            <span className="decorative-icon flower-icon">🌼</span>
            <h3 className="card-title">Path to Growth</h3>
            <p className="card-description">
              We believe learning is a journey full of discovery and care. Whether children need a quiet break,
              new challenges, or joyful play, we're here to guide and encourage every step of their learning path.
            </p>
            <button className="card-btn red-btn" onClick={scrollToTop}>
              ASK US
            </button>
          </div>
        </div>
      </div>

      {/* Floating Bottom Action Buttons */}
      <div className="floating-actions">
        <button className="action-btn demo-btn">DEMOS</button>
        <button className="action-btn purchase-btn">PURCHASE</button>
      </div>
    </div>
  );
};

export default LearningAdventuers;
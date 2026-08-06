import React from 'react';
import './PopularClasses.css';

// Import class card images
import classImg1 from '../../assets/class-1.jpg';
import classImg2 from '../../assets/class-2.jpg';
import classImg3 from '../../assets/class-3.jpg';

// Import decorative corner dinosaur images
import dinoLeftImg from '../../assets/class-shape-1.png';
import dinoRightImg from '../../assets/class-shape-2.png';

const PopularClasses = () => {
  // Card data array
  const classesData = [
    {
      id: 1,
      title: 'Color Matching',
      price: '$880',
      image: classImg1,
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      age: '3-5 Year',
      time: '8-10 AM',
      seat: '25',
    },
    {
      id: 2,
      title: 'Learning Disciplines',
      price: '$790',
      image: classImg2,
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      age: '3-5 Year',
      time: '8-10 AM',
      seat: '25',
    },
    {
      id: 3,
      title: 'Drawing',
      price: '$590',
      image: classImg3,
      description:
        'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      age: '3-5 Year',
      time: '8-10 AM',
      seat: '25',
    },
  ];

  // Handles click to navigate directly to class details
  const handleJoinClass = (classId) => {
    window.location.href = `/class-details/${classId}`;
  };

  return (
    <section className="pc-section">
      {/* Decorative Dinosaur Image - Bottom Left Corner */}
      <img
        src={dinoLeftImg}
        alt="Dinosaur Decorative Left"
        className="pc-dino-bg pc-dino-left"
      />

      {/* Decorative Dinosaur Image - Bottom Right Corner */}
      <img
        src={dinoRightImg}
        alt="Dinosaur Decorative Right"
        className="pc-dino-bg pc-dino-right"
      />

      <div className="pc-container">
        {/* Header Section */}
        <div className="pc-header">
          <span className="pc-subtitle">Classes</span>
          <h2 className="pc-title">Popular Classes</h2>
        </div>

        {/* Classes Card Grid */}
        <div className="pc-grid">
          {classesData.map((item) => (
            <div key={item.id} className="pc-card">
              {/* Image & Price Tag Container */}
              <div className="pc-image-wrapper">
                <img src={item.image} alt={item.title} className="pc-card-image" />
                <span className="pc-price-badge">{item.price}</span>
              </div>

              {/* Content Body */}
              <div className="pc-card-content">
                <h3 className="pc-card-title">{item.title}</h3>
                <p className="pc-card-description">{item.description}</p>

                {/* Metadata Row */}
                <div className="pc-card-info">
                  <div className="pc-info-item">
                    <span className="pc-info-label">Age: </span>
                    <span className="pc-info-value">{item.age}</span>
                  </div>
                  <div className="pc-info-item">
                    <span className="pc-info-label">Time: </span>
                    <span className="pc-info-value">{item.time}</span>
                  </div>
                  <div className="pc-info-item">
                    <span className="pc-info-label">Seat: </span>
                    <span className="pc-info-value">{item.seat}</span>
                  </div>
                </div>

                {/* Join Class Button */}
                <div className="pc-action-wrapper">
                  <button
                    className="pc-btn-join"
                    onClick={() => handleJoinClass(item.id)}
                  >
                    Join Class
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularClasses;
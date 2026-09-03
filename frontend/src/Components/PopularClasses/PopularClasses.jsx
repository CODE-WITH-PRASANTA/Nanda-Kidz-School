import React from 'react';
import './PopularClasses.css';

// Import class card images
import classImg1 from '../../assets/image4.webp';
import classImg2 from '../../assets/image5.webp';
import classImg3 from '../../assets/image6.webp';

// Import decorative corner dinosaur images
import dinoLeftImg from '../../assets/class-shape-1.png';
import dinoRightImg from '../../assets/class-shape-2.png';

const PopularClasses = () => {
  // Complete Play School, LKG, & UKG Class Programs with Indian Pricing & Structured Details
  const classesData = [
    {
      id: 1,
      title: 'Play Group Discovery',
      price: '₹11,999',
      image: classImg1,
      description:
        'A warm, playful environment focusing on sensory motor skills, color recognition, social sharing, and joyful early interactions.',
      age: '2 - 3 Years (Play School)',
      time: '9:00 - 11:30 AM',
      seat: '20',
    },
    {
      id: 2,
      title: 'LKG Foundation Program',
      price: '₹14,999',
      image: classImg2,
      description:
        'Structured pre-primary curriculum emphasizing English alphabets, phonics sounds, number concepts, rhymes, and creative crafts.',
      age: '3 - 4 Years (LKG)',
      time: '9:00 AM - 12:00 PM',
      seat: '22',
    },
    {
      id: 3,
      title: 'UKG Advanced Readiness',
      price: '₹17,500',
      image: classImg3,
      description:
        'Comprehensive kindergarten preparation featuring cursive handwriting, simple mathematics, science exploration, and storytelling.',
      age: '4 - 5 Years (UKG)',
      time: '9:00 AM - 1:00 PM',
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
          <span className="pc-subtitle">Nanda Kidz Academic Programs</span>
          <h2 className="pc-title">Play School, LKG & UKG Classes</h2>
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
                    <span className="pc-info-label">Age Group: </span>
                    <span className="pc-info-value">{item.age}</span>
                  </div>
                  <div className="pc-info-item">
                    <span className="pc-info-label">Timing: </span>
                    <span className="pc-info-value">{item.time}</span>
                  </div>
                  <div className="pc-info-item">
                    <span className="pc-info-label">Seats: </span>
                    <span className="pc-info-value">{item.seat} Max</span>
                  </div>
                </div>

                {/* Join Class Button */}
                <div className="pc-action-wrapper">
                  <button
                    className="pc-btn-join"
                    onClick={() => handleJoinClass(item.id)}
                  >
                    Enroll Now ✨
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
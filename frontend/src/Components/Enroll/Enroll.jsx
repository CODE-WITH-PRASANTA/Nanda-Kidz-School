import React from 'react';
import './Enroll.css';
import { FaBookmark, FaFolder } from 'react-icons/fa'; 


import img1 from '../../assets/course-01.jpg';
import img2 from '../../assets/course-02.jpg';
import img3 from '../../assets/course-03.jpg';
import img4 from '../../assets/course-04.jpg';
import img5 from '../../assets/course-05.jpg';
import img6 from '../../assets/course-06.jpg';

import giraffeImg from '../../assets/jeeraf.png'; 
import authorLogo from '../../assets/avtar logo.jpeg'; 

const Enroll = () => {
  // 6 Courses Array combining both reference images
  const courses = [
    // Image 1 Row (Top 3)
    {
      id: 1,
      image: img1,
      title: 'Discovery Lab',
      category: 'Creativity',
      level: 'Beginner',
      description: 'Fun projects with paint, paper, and glue to help kids express emotions, boost creativity, and develop fine motor skills.',
      author: 'nicdark',
      oldPrice: '100.00',
      price: '50.00'
    },
    {
      id: 2,
      image: img2,
      title: 'Groove Fitness',
      category: 'Physical',
      level: 'Challenging',
      description: 'Engaging stories, songs, and word games to develop vocabulary, imagination, and early reading skills.',
      author: 'nicdark',
      oldPrice: null,
      price: '45.00'
    },
    {
      id: 3,
      image: img3,
      title: 'Language Fun',
      category: 'Music',
      level: 'Advanced',
      description: 'Hands-on science fun for curious minds, exploring nature, colors, sounds, and simple experiments in a playful environment.',
      author: 'nicdark',
      oldPrice: '140.00',
      price: '89.00'
    },
    // Image 2 Row (Bottom 3)
    {
      id: 4,
      image: img4,
      title: 'Little Scientists',
      category: 'Math',
      level: 'Beginner',
      description: 'Jump, stretch, and dance with energetic games that improve balance, coordination, and body awareness through play.',
      author: 'nicdark',
      oldPrice: null,
      price: '35.00'
    },
    {
      id: 5,
      image: img5,
      title: 'Nature Explorers',
      category: 'Language',
      level: 'Easy',
      description: 'Sing, dance, and play with instruments while learning rhythm, melody, and movement in a joyful group setting.',
      author: 'nicdark',
      oldPrice: null,
      price: '75.00'
    },
    {
      id: 6,
      image: img6,
      title: 'Sensory Playtime',
      category: 'Cultural',
      level: 'Intermediate',
      description: 'Discover numbers, shapes, and patterns through fun games and playful activities designed for little learners.',
      author: 'nicdark',
      oldPrice: null,
      price: '120.00'
    }
  ];

  // Working Enroll Button Action
  const handleEnroll = (courseTitle, price) => {
    alert(`🎉 Successfully enrolled in "${courseTitle}" for ₹${price}!`);
  };

  return (
    <section className="enroll-section">
      {/* Giraffe Character at Top Left */}
      <div className="giraffe-wrapper">
        <img src={giraffeImg} alt="Giraffe" className="giraffe-img" />
      </div>

      <div className="enroll-container">
        <div className="courses-grid">
          {courses.map((course) => (
            <div key={course.id} className="course-card">
              {/* Card Image Wrapper with Rotate & B/W Hover Effect */}
              <div className="card-image-box">
                <img src={course.image} alt={course.title} className="card-img" />
              </div>

              {/* Card Body */}
              <div className="card-body">
                <h3 className="course-title">{course.title}</h3>

                {/* Tags / Meta Info */}
                <div className="course-meta">
                  <span className="meta-item">
                    <FaFolder className="meta-icon" /> {course.category}
                  </span>
                  <span className="meta-item">
                    <FaBookmark className="meta-icon" /> {course.level}
                  </span>
                </div>

                <p className="course-description">{course.description}</p>

                {/* Author Info */}
                <div className="course-author">
                  <img src={authorLogo} alt="Logo" className="author-img" />
                  <span className="author-text">By {course.author}</span>
                </div>
              </div>

              {/* Card Footer / Pricing & Action */}
              <div className="card-footer">
                <div className="price-box">
                  {course.oldPrice && (
                    <span className="old-price">₹{course.oldPrice}</span>
                  )}
                  <span className="current-price">₹{course.price}</span>
                </div>

                <button
                  className="enroll-btn"
                  onClick={() => handleEnroll(course.title, course.price)}
                >
                  ENROLL
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Bottom Action Buttons */}
      <div className="floating-actions">
        <button className="btn-demos">DEMOS</button>
        <button className="btn-purchase">PURCHASE</button>
      </div>
    </section>
  );
};

export default Enroll;
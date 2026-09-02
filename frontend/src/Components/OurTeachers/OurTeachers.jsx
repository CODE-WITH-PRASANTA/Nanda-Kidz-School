import React, { useState } from 'react';
import './OurTeachers.css';

// Import React Icons
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaTimes,
  FaQuoteLeft,
} from 'react-icons/fa';

// Import local image assets
import teacher1 from '../../assets/teacher-1.jpg';
import teacher2 from '../../assets/teacher-2.jpg';
import teacher3 from '../../assets/teacher-3.jpg';
import teacher4 from '../../assets/teacher-4.jpg';

const teachersData = [
  {
    id: 1,
    name: 'Glims Bond',
    role: 'Music Teacher',
    image: teacher1,
    bio: 'Passionate music instructor with over 8 years of experience nurturing children through rhythmic learning, vocal training, and joyful melodies.',
    experience: '8+ Years Exp',
    specialty: 'Rhythmic & Vocal Arts',
    socials: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
      instagram: '#',
    },
  },
  {
    id: 2,
    name: 'Sherlock Bin',
    role: 'Art Teacher',
    image: teacher2,
    bio: 'Creative visual artist specializing in early childhood motor skill development using finger painting, origami, and imaginative craft sessions.',
    experience: '6+ Years Exp',
    specialty: 'Visual & Craft Arts',
    socials: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
      instagram: '#',
    },
  },
  {
    id: 3,
    name: 'Priestly Herbart',
    role: 'Math Teacher',
    image: teacher3,
    bio: 'Dedicated numbers specialist turning abstract mathematics into fun puzzle games and interactive logic activities for toddlers.',
    experience: '10+ Years Exp',
    specialty: 'Early Logic & Numbers',
    socials: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
      instagram: '#',
    },
  },
  {
    id: 4,
    name: 'Smith Broke',
    role: 'English Teacher',
    image: teacher4,
    bio: 'Dynamic language coach focusing on phonics, storytelling, expressive vocabulary, and confident verbal communication for kindergarteners.',
    experience: '7+ Years Exp',
    specialty: 'Phonics & Storytelling',
    socials: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
      instagram: '#',
    },
  },
];

const OurTeachers = () => {
  const [activeBioTeacher, setActiveBioTeacher] = useState(null);

  const openBioModal = (teacher) => {
    setActiveBioTeacher(teacher);
  };

  const closeBioModal = () => {
    setActiveBioTeacher(null);
  };

  return (
    <section className="our-teachers">
      <div className="our-teachers__container">
        {/* Header Section */}
        <div className="our-teachers__header">
          <span className="our-teachers__subtitle">Our Core Faculty</span>
          <h2 className="our-teachers__title">Meet Our Expert Teachers</h2>
        </div>

        {/* Teachers Grid */}
        <div className="our-teachers__grid">
          {teachersData.map((teacher) => (
            <div className="our-teachers__card" key={teacher.id}>
              {/* Restructured Avatar/Blob/Social Container */}
              <div className="our-teachers__avatar-container">
                {/* 1. The Morphing Animated Blob Background */}
                <div className="our-teachers__blob-bg"></div>

                {/* 2. Main Circular Clipped Image */}
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="our-teachers__image"
                />

                {/* 3. Sliding Social Icons Bar */}
                <div className="our-teachers__social-bar">
                  <a
                    href={teacher.socials.facebook}
                    className="our-teachers__social-link"
                    aria-label="Facebook"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href={teacher.socials.twitter}
                    className="our-teachers__social-link"
                    aria-label="Twitter"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href={teacher.socials.linkedin}
                    className="our-teachers__social-link"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn />
                  </a>
                  <a
                    href={teacher.socials.instagram}
                    className="our-teachers__social-link"
                    aria-label="Instagram"
                  >
                    <FaInstagram />
                  </a>
                  {/* Bio Details Trigger Button */}
                  <button
                    onClick={() => openBioModal(teacher)}
                    className="our-teachers__social-link our-teachers__bio-btn"
                    aria-label="View Bio Description"
                    title="View Bio & Description"
                  >
                    <FaQuoteLeft />
                  </button>
                </div>
              </div>

              {/* Info Text */}
              <div className="our-teachers__info">
                <h3 className="our-teachers__name">{teacher.name}</h3>
                <p className="our-teachers__role">{teacher.role}</p>
                <button 
                  className="our-teachers__read-more-trigger"
                  onClick={() => openBioModal(teacher)}
                >
                  View Profile ✨
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Cartoon Bio Popup Modal */}
      {activeBioTeacher && (
        <div className="our-teachers__modal-backdrop" onClick={closeBioModal}>
          <div 
            className="our-teachers__modal-content animate-popIn" 
            onClick={(e) => e.stopPropagation()}
          >
            <button className="our-teachers__modal-close" onClick={closeBioModal}>
              <FaTimes />
            </button>

            <div className="our-teachers__modal-grid">
              <div className="our-teachers__modal-img-wrapper">
                <img src={activeBioTeacher.image} alt={activeBioTeacher.name} />
                <span className="our-teachers__modal-badge">{activeBioTeacher.experience}</span>
              </div>
              <div className="our-teachers__modal-text">
                <span className="our-teachers__modal-subtitle">{activeBioTeacher.role}</span>
                <h3 className="our-teachers__modal-name">{activeBioTeacher.name}</h3>
                <p className="our-teachers__modal-specialty">🎯 <strong>Specialty:</strong> {activeBioTeacher.specialty}</p>
                <p className="our-teachers__modal-bio">{activeBioTeacher.bio}</p>
                
                <div className="our-teachers__modal-socials-row">
                  <a href={activeBioTeacher.socials.facebook} className="modal-soc"><FaFacebookF /></a>
                  <a href={activeBioTeacher.socials.twitter} className="modal-soc"><FaTwitter /></a>
                  <a href={activeBioTeacher.socials.linkedin} className="modal-soc"><FaLinkedinIn /></a>
                  <a href={activeBioTeacher.socials.instagram} className="modal-soc"><FaInstagram /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OurTeachers;
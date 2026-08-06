import React from 'react';
import './OurTeachers.css';

// Import React Icons
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from 'react-icons/fa';

// Import local image assets (update these paths as needed)
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
    socials: {
      facebook: '#',
      twitter: '#',
      linkedin: '#',
      instagram: '#',
    },
  },
];

const OurTeachers = () => {
  return (
    <section className="our-teachers">
      <div className="our-teachers__container">
        {/* Header Section */}
        <div className="our-teachers__header">
          <span className="our-teachers__subtitle">Our Core Teacher</span>
          <h2 className="our-teachers__title">Meet Our Teacher</h2>
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
                </div>
              </div>

              {/* Info Text */}
              <div className="our-teachers__info">
                <h3 className="our-teachers__name">{teacher.name}</h3>
                <p className="our-teachers__role">{teacher.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeachers;
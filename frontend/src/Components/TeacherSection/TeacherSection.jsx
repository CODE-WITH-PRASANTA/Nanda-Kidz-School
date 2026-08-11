import React from 'react';
import './TeacherSection.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

// Import local images (Replace paths with your actual image paths)
import teacher1 from"../../assets/p1.jpg" ;
import teacher2 from"../../assets/p2.jpg" ;
import teacher3 from"../../assets/p3.jpg" ;
import teacher4 from"../../assets/p4.jpg" ;
import teacher5 from"../../assets/p5.jpg" ;
import teacher6 from"../../assets/p6.jpg" ;
import teacher7 from"../../assets/p7.jpg" ;
import teacher8 from"../../assets/p8.jpg" ;

const teachersData = [
  // Original 4 reference cards
  { id: 1, name: 'Glims Bond', role: 'Music Teacher', image: teacher1 },
  { id: 2, name: 'Sherlock Bin', role: 'Art Teacher', image: teacher2 },
  { id: 3, name: 'Priestly Herbart', role: 'Math Teacher', image: teacher3 },
  { id: 4, name: 'Smith Broke', role: 'English Teacher', image: teacher4 },
  
  // 4 Extra cards
  { id: 5, name: 'Sophia Miller', role: 'Science Teacher', image: teacher5 },
  { id: 6, name: 'David Lee', role: 'History Teacher', image: teacher6 },
  { id: 7, name: 'Emma Watson', role: 'Physics Teacher', image: teacher7 },
  { id: 8, name: 'Alexander Ray', role: 'Chemistry Teacher', image: teacher8 },
];

const TeacherSection = () => {
  return (
    <section className="TeacherSection">
      <div className="TeacherSection-container">
        {teachersData.map((teacher) => (
          <div key={teacher.id} className="TeacherSection-card">
            
            {/* Image Wrapper with Outer Orange Ring */}
            <div className="TeacherSection-image-wrapper">
              <div className="TeacherSection-circle">
                <img 
                  src={teacher.image} 
                  alt={teacher.name} 
                  className="TeacherSection-image" 
                />
                
                {/* Social icons overlay (visible on hovering image) */}
                <div className="TeacherSection-socials">
                  <a href="#facebook" className="TeacherSection-icon" aria-label="Facebook">
                    <FaFacebookF />
                  </a>
                  <a href="#twitter" className="TeacherSection-icon" aria-label="Twitter">
                    <FaTwitter />
                  </a>
                  <a href="#linkedin" className="TeacherSection-icon" aria-label="LinkedIn">
                    <FaLinkedinIn />
                  </a>
                  <a href="#instagram" className="TeacherSection-icon" aria-label="Instagram">
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>

            {/* Teacher Details */}
            <div className="TeacherSection-info">
              <h3 className="TeacherSection-name">{teacher.name}</h3>
              <p className="TeacherSection-role">{teacher.role}</p>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default TeacherSection;
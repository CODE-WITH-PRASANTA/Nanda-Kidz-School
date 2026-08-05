import React from 'react';
import './TeacherProfile.css';

// React Icons
import { FaGooglePlusG, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

// Main Teacher Image (replace path with your actual image path)
import teacherMainImg from '../../assets/pr1.jpg';

const TeacherProfile = () => {
  const skillsData = [
    { id: 1, label: 'Teaching Skills', percentage: '95%', color: '#f39c12' },
    { id: 2, label: 'Speaking', percentage: '85%', color: '#e74c3c' },
    { id: 3, label: 'Communication Skill', percentage: '75%', color: '#003366' },
    { id: 4, label: 'Follow The Rules', percentage: '65%', color: '#2ecc71' },
    { id: 5, label: 'Child Care Skills', percentage: '70%', color: '#e91e63' },
  ];

  return (
    <section className="TeacherProfile">
      <div className="TeacherProfile-container">
        
        {/* Left Scrollable Content Section */}
        <div className="TeacherProfile-left">
          {/* Main Hero Image */}
          <div className="TeacherProfile-image-container">
            <img 
              src={teacherMainImg} 
              alt="Alex Maxwel" 
              className="TeacherProfile-main-image" 
            />
          </div>

          {/* Personal Information and Biography */}
          <div className="TeacherProfile-bio-section">
            <h2 className="TeacherProfile-section-title">Personal Information and Biography</h2>
            <p className="TeacherProfile-paragraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="TeacherProfile-paragraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          {/* Teacher Skills Progress Bars */}
          <div className="TeacherProfile-skills-section">
            <h2 className="TeacherProfile-section-title">Teacher Skills</h2>
            <p className="TeacherProfile-paragraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <div className="TeacherProfile-skills-list">
              {skillsData.map((skill) => (
                <div key={skill.id} className="TeacherProfile-skill-item">
                  <div className="TeacherProfile-skill-header">
                    <span className="TeacherProfile-skill-name">{skill.label}</span>
                    <span className="TeacherProfile-skill-percentage">{skill.percentage}</span>
                  </div>
                  <div className="TeacherProfile-progress-bar">
                    <div 
                      className="TeacherProfile-progress-fill" 
                      style={{ width: skill.percentage, backgroundColor: skill.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sticky Sidebar Section */}
        <div className="TeacherProfile-right">
          <div className="TeacherProfile-card">
            <div className="TeacherProfile-card-header">
              <h3 className="TeacherProfile-card-title">Profile Details</h3>
            </div>
            
            <div className="TeacherProfile-card-body">
              <div className="TeacherProfile-info-row">
                <span className="TeacherProfile-info-label">Name:</span>
                <span className="TeacherProfile-info-value">Alex Maxwel</span>
              </div>
              <div className="TeacherProfile-info-row">
                <span className="TeacherProfile-info-label">Phone:</span>
                <span className="TeacherProfile-info-value">882-569-756</span>
              </div>
              <div className="TeacherProfile-info-row">
                <span className="TeacherProfile-info-label">Email:</span>
                <span className="TeacherProfile-info-value">ketan@gmail.com</span>
              </div>
              <div className="TeacherProfile-info-row">
                <span className="TeacherProfile-info-label">Address:</span>
                <span className="TeacherProfile-info-value">Wonder Street, USA, New York</span>
              </div>
              <div className="TeacherProfile-info-row">
                <span className="TeacherProfile-info-label">Designation:</span>
                <span className="TeacherProfile-info-value">Math Teacher</span>
              </div>
              <div className="TeacherProfile-info-row">
                <span className="TeacherProfile-info-label">Experience:</span>
                <span className="TeacherProfile-info-value">10 Years</span>
              </div>
              <div className="TeacherProfile-info-row TeacherProfile-social-row">
                <span className="TeacherProfile-info-label">Contact:</span>
                <div className="TeacherProfile-social-icons">
                  <a href="#google" className="TeacherProfile-social-link"><FaGooglePlusG /></a>
                  <a href="#facebook" className="TeacherProfile-social-link"><FaFacebookF /></a>
                  <a href="#twitter" className="TeacherProfile-social-link"><FaTwitter /></a>
                  <a href="#linkedin" className="TeacherProfile-social-link"><FaLinkedinIn /></a>
                  <a href="#instagram" className="TeacherProfile-social-link"><FaInstagram /></a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TeacherProfile;
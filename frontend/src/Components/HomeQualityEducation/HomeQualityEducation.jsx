import React from 'react';
import './HomeQualityEducation.css';
import studenImg from '../../assets/Education.webp';

const HomeQualityEducation = () => {
  const skillsData = [
    { label: 'Education Skills :', value: 84, color: '#ff8a00' },       // Bright Orange
    { label: 'Communication Skills :', value: 96, color: '#bc00dd' }, // Vibrant Purple/Magenta
    { label: 'Children Care :', value: 81, color: '#ff8a00' },        // Bright Orange
  ];

  return (
    <section className="hq-section">
      <div className="hq-container">
        
        {/* LEFT SIDE: Custom Blob Image Display with Rotating Backgrounds */}
        <div className="hq-image-side">
          <div className="hq-image-frame">
            {/* Outline decorative path rings (Counter-rotating) */}
            <div className="hq-outline-ring ring-2"></div>
            
            {/* The multi-colored background mask blob (Constantly rotating) */}
            <div className="hq-blob-bg"></div>
            
            {/* Main Subject Image */}
            <img 
              src={studenImg} 
              alt="Quality Education Student" 
              className="hq-student-img"
            />
          </div>
        </div>

        {/* RIGHT SIDE: Animated Typography & Skill Meters */}
        <div className="hq-content-side">
          <div className="hq-header-group">
            <span className="hq-tagline">QUALITY EDUCATION</span>
            <h2 className="hq-title">
              The Standard Primary Schooling Across Globe
            </h2>
            <p className="hq-desc">
              Scelerisque purus semper eget duis at tellus at urna condimentum. Sapien
              pellentesque ultricies ultricies metus faucibus non. Integer consequat ex lacus,
              in mattis nulla posuere in. Nam posuere feugiat lacus. Morbi suscipit erat felis,
              ac aliquam nibh.
            </p>
          </div>

          {/* Skillset list with dynamic values */}
          <div className="hq-skills-box">
            {skillsData.map((skill, index) => (
              <div key={index} className="hq-skill-row">
                <div className="hq-skill-meta">
                  <span className="hq-label">{skill.label}</span>
                  <span className="hq-percentage">{skill.value} %</span>
                </div>
                <div className="hq-meter-track">
                  <div 
                    className="hq-meter-fill"
                    style={{ 
                      '--target-width': `${skill.value}%`,
                      backgroundColor: skill.color,
                      animationDelay: `${0.6 + (0.15 * index)}s`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Call to action element */}
          <a href="#more" className="hq-btn-cta">
            <span>MORE ABOUT US</span>
            <svg className="hq-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>

        </div>
      </div>
    </section>
  );
};

export default HomeQualityEducation;
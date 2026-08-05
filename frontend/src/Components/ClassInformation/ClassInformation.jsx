import React, { useState } from 'react';
import './ClassInformation.css';

// Import class image from assets
import classStudentImg from '../../assets/class-details.jpg';

const ClassInformation = () => {
  // State for active tab selection
  const [activeTab, setActiveTab] = useState('Description');

  // Newsletter form handler
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
  };

  return (
    <section className="ci-section">
      <div className="ci-container">
        
        {/* Left Side: Scrollable Pane */}
        <div className="ci-left-scroll-pane">
          {/* Main Hero Image */}
          <div className="ci-image-container">
            <img src={classStudentImg} alt="Class Student" className="ci-main-img" />
          </div>

          {/* Tab Navigation Buttons */}
          <div className="ci-tabs-wrapper">
            {['Description', 'Teacher', 'Lesson', 'Cost'].map((tab) => (
              <button
                key={tab}
                className={`ci-tab-btn ${activeTab === tab ? 'ci-tab-active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Dynamic Content Display Area */}
          <div className="ci-tab-content">
            {activeTab === 'Description' && (
              <div className="ci-content-block">
                <h3 className="ci-content-title">Education Lessons</h3>
                <p className="ci-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="ci-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <h3 className="ci-content-title">English Lesson Class</h3>
                <p className="ci-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <h3 className="ci-content-title">Requirements</h3>
                <p className="ci-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <ul className="ci-list">
                  <li>Aliquam sit amet mi vitae turpis gravida vulputate.</li>
                  <li>Proin a orci nec sapien condimentum imperdiet.</li>
                  <li>Suspendisse viverra lectus eu augue efficitur pulvinar.</li>
                  <li>Mauris a purus ut mauris sodales ultrices.</li>
                </ul>
              </div>
            )}

            {activeTab === 'Teacher' && (
              <div className="ci-content-block">
                <h3 className="ci-content-title">Class Instructor</h3>
                <p className="ci-text">
                  Our experienced instructors foster a playful and safe learning environment tailored to early childhood developmental needs.
                </p>
              </div>
            )}

            {activeTab === 'Lesson' && (
              <div className="ci-content-block">
                <h3 className="ci-content-title">Lesson Overview</h3>
                <p className="ci-text">
                  Detailed curriculum includes daily creative arts, sensory play, basic language concepts, and interactive team exercises.
                </p>
              </div>
            )}

            {activeTab === 'Cost' && (
              <div className="ci-content-block">
                <h3 className="ci-content-title">Tuition & Pricing</h3>
                <p className="ci-text">
                  Flexible payment terms available per trimester or full academic year including all required learning material kits.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Constant Sticky Sidebar */}
        <div className="ci-right-sidebar">
          {/* Class Information Card */}
          <div className="ci-info-card">
            <h3 className="ci-sidebar-title">Information</h3>
            <div className="ci-title-divider"></div>

            <div className="ci-info-list">
              <div className="ci-info-row">
                <span className="ci-info-label">Student:</span>
                <span className="ci-info-val">25</span>
              </div>
              <div className="ci-info-row">
                <span className="ci-info-label">Lectures:</span>
                <span className="ci-info-val">6</span>
              </div>
              <div className="ci-info-row">
                <span className="ci-info-label">Time:</span>
                <span className="ci-info-val">9AM - 11:30AM</span>
              </div>
              <div className="ci-info-row">
                <span className="ci-info-label">Learn Day:</span>
                <span className="ci-info-val">Monday, Wednesday</span>
              </div>
              <div className="ci-info-row">
                <span className="ci-info-label">Language:</span>
                <span className="ci-info-val">English</span>
              </div>
            </div>
          </div>

          {/* Newsletter Subscribe Card */}
          <div className="ci-newsletter-card">
            <h3 className="ci-newsletter-title">Subscribe to Our Newsletter</h3>
            <form onSubmit={handleSubscribe} className="ci-newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="ci-newsletter-input"
              />
              <button type="submit" className="ci-newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ClassInformation;
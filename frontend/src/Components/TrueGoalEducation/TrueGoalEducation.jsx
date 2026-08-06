import React, { useState } from 'react';
import { 
  FaSearch, 
  FaCheck, 
  FaBookmark, 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaChevronLeft, 
  FaChevronRight 
} from 'react-icons/fa';

// Import images (using your specified relative paths)
import mainImg from '../../assets/blog-details.jpg';
import imgGrid1 from '../../assets/blog-4.jpg';
import imgGrid2 from '../../assets/blog-5.jpg';
import imgGrid3 from '../../assets/blog-6.jpg';
import avatarImg from '../../assets/blog-5.jpg';

import './TrueGoalEducation.css';

const TrueGoalEducation = () => {
  // State for Breadcrumb Navigation simulation
  const [breadcrumb, setBreadcrumb] = useState('Home / Blog Details');

  // Click handler for Popular Posts, Categories, and Tags
  const handleNavigate = (topicName) => {
    setBreadcrumb(`Home / Blog Details / ${topicName}`);
    // Scroll smoothly back to top so user sees updated breadcrumb
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="tge-page-container">
      {/* Dynamic Breadcrumb Bar */}
      <div className="tge-breadcrumb-bar">
        <p className="tge-breadcrumb-text">{breadcrumb}</p>
      </div>

      <div className="tge-main-wrapper">
        {/* LEFT COLUMN: Main Blog Content & Comments */}
        <div className="tge-left-column">
          {/* Main Feature Image */}
          <div className="tge-main-image-wrapper">
            <img 
              src={mainImg} 
              alt="Teacher in classroom" 
              className="tge-main-image"
            />
          </div>

          {/* Meta Information */}
          <div className="tge-post-meta">
            <span>Posted On: <strong className="tge-text-dark">September 31, 2026</strong></span>
            <span className="tge-meta-separator">–</span>
            <span>Posted By: <strong className="tge-text-dark">John Anderson</strong></span>
          </div>

          {/* Post Title */}
          <h1 className="tge-post-title">
            Determining The True Goal of Good Education is Difficult.
          </h1>

          <p className="tge-paragraph">
            Quuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quia non numquam eius modi tempora incidunt ut labore et dolore magnam dolor sit amet, consectetur adipisicing.
          </p>

          <p className="tge-paragraph">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>

          {/* Highlight Quote Box */}
          <blockquote className="tge-quote-box">
            "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
          </blockquote>

          <p className="tge-paragraph">
            Quuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quia non numquam eius modi tempora incidunt ut labore et dolore magnam dolor sit amet, consectetur adipisicing.
          </p>

          {/* 3-Image Grid */}
          <div className="tge-image-grid">
            <img src={imgGrid1} alt="Child studying at desk" />
            <img src={imgGrid2} alt="Child playing musical xylophone" />
            <img src={imgGrid3} alt="Young girl reading a book" />
          </div>

          {/* Offer Checklist Section */}
          <h2 className="tge-section-title">Four Major Elements That We Offer:</h2>
          <ul className="tge-check-list">
            <li>
              <span className="tge-check-icon light"><FaCheck /></span>
              Your child’s interests, likes, dislikes
            </li>
            <li>
              <span className="tge-check-icon light"><FaCheck /></span>
              Their routines- patterns of eating, sleeping, toileting
            </li>
            <li>
              <span className="tge-check-icon light"><FaCheck /></span>
              Your child’s current wellbeing
            </li>
            <li>
              <span className="tge-check-icon filled"><FaCheck /></span>
              Any major events taking place at home.
            </li>
          </ul>

          <h2 className="tge-section-title">It’s Time To Think Differently About Homeschooling</h2>
          <p className="tge-paragraph">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>

          {/* Tags & Social Share Footer */}
          <div className="tge-post-footer">
            <div className="tge-footer-tags">
              <FaBookmark className="tge-bookmark-icon" />
              <span>Preschool, Children</span>
            </div>
            <div className="tge-social-share">
              <span>Share:</span>
              <button className="tge-social-btn" aria-label="Share on Facebook"><FaFacebookF /></button>
              <button className="tge-social-btn" aria-label="Share on Twitter"><FaTwitter /></button>
              <button className="tge-social-btn" aria-label="Share on Instagram"><FaInstagram /></button>
            </div>
          </div>

          {/* Post Navigation Controls */}
          <div className="tge-post-nav">
            <button className="tge-nav-btn"><FaChevronLeft /> Prev Post</button>
            <button className="tge-nav-btn">Next Post <FaChevronRight /></button>
          </div>

          {/* Comments Section */}
          <div className="tge-comments-section">
            <h3 className="tge-comments-title">3 Comments:</h3>

            <div className="tge-comment-card">
              <img src={avatarImg} alt="John Jones" className="tge-avatar" />
              <div className="tge-comment-content">
                <h4>John Jones</h4>
                <p className="tge-comment-date">April 24, 2026 at 10:59 am</p>
                <p className="tge-comment-body">Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.</p>
                <button className="tge-reply-btn">Reply</button>
              </div>
            </div>

            <div className="tge-comment-card">
              <img src={avatarImg} alt="Steven Smith" className="tge-avatar" />
              <div className="tge-comment-content">
                <h4>Steven Smith</h4>
                <p className="tge-comment-date">April 24, 2026 at 10:59 am</p>
                <p className="tge-comment-body">Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.</p>
                <button className="tge-reply-btn">Reply</button>
              </div>
            </div>

            <div className="tge-comment-card">
              <img src={avatarImg} alt="Sarah Taylor" className="tge-avatar" />
              <div className="tge-comment-content">
                <h4>Sarah Taylor</h4>
                <p className="tge-comment-date">April 24, 2026 at 10:59 am</p>
                <p className="tge-comment-body">Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.</p>
                <button className="tge-reply-btn">Reply</button>
              </div>
            </div>
          </div>

          {/* Leave a Reply Form Section */}
          <div className="tge-reply-form-wrapper">
            <h3 className="tge-form-title">Leave a Reply</h3>
            <p className="tge-form-subtitle">Your email address will not be published. Required fields are marked <span className="tge-required">*</span></p>
            
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="tge-form-row">
                <input type="text" placeholder="Your Name*" required className="tge-input" />
                <input type="email" placeholder="Your Email*" required className="tge-input" />
              </div>
              <input type="text" placeholder="Website" className="tge-input full-width" />
              <textarea placeholder="Your Comment..." rows="5" className="tge-textarea"></textarea>
              
              <div className="tge-checkbox-row">
                <input type="checkbox" id="save-info" />
                <label htmlFor="save-info">Save my name, email, and website in this browser for the next time I comment.</label>
              </div>

              <button type="submit" className="tge-submit-btn">Post A Comment</button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Sidebar following main page scroll */}
        <aside className="tge-right-column">
          {/* Search Widget */}
          <div className="tge-sidebar-card">
            <h3 className="tge-sidebar-title">Search</h3>
            <div className="tge-search-box">
              <input type="text" placeholder="Search..." className="tge-search-input" />
              <button className="tge-search-btn" aria-label="Search"><FaSearch /></button>
            </div>
          </div>

          {/* Popular Posts Widget */}
          <div className="tge-sidebar-card">
            <h3 className="tge-sidebar-title">Popular Posts</h3>
            <div className="tge-popular-list">
              {[
                { title: 'The Data Surrounding Higher Education', date: 'June 10, 2026', img: imgGrid1 },
                { title: 'Conversion Rate the Sales Funnel Optimization', date: 'June 21, 2026', img: imgGrid2 },
                { title: 'Business Data is changing the world’s Energy', date: 'June 30, 2026', img: imgGrid3 },
                { title: 'The Billionaire Guide On Design That Will Get You Rich', date: 'May 10, 2026', img: imgGrid1 },
                { title: 'The Data-Driven Approach To Understanding Your Users', date: 'May 21, 2026', img: imgGrid2 },
              ].map((item, idx) => (
                <div key={idx} className="tge-popular-item" onClick={() => handleNavigate(item.title)}>
                  <img src={item.img} alt={item.title} className="tge-popular-img" />
                  <div className="tge-popular-info">
                    <span className="tge-popular-date">{item.date}</span>
                    <h4 className="tge-popular-heading">{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories Widget */}
          <div className="tge-sidebar-card">
            <h3 className="tge-sidebar-title">Categories</h3>
            <ul className="tge-categories-list">
              {['Alphabet Parade', 'Auditory Processing', 'Gross Motor', 'Kindergarten', 'Games', 'Inspire Success'].map((cat, idx) => (
                <li key={idx} className="tge-category-item" onClick={() => handleNavigate(cat)}>
                  <span className="tge-orange-dot"></span>
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tags Widget */}
          <div className="tge-sidebar-card">
            <h3 className="tge-sidebar-title">Popular Tags</h3>
            <div className="tge-tags-container">
              {['Preschool', 'Children', 'Activities', 'Educational', 'Teachers'].map((tag, idx) => (
                <button key={idx} className="tge-tag-btn" onClick={() => handleNavigate(tag)}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TrueGoalEducation;
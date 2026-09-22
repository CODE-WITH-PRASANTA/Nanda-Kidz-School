import React, { useState, useEffect, useMemo } from 'react';
import './Floating.css';

import bgTop from '../../assets/nan1.png';

import { 
  X, 
  User, 
  MapPin, 
  Cake, 
  MessageSquare, 
  Send, 
  Phone, 
  MessageCircle,
  Sparkles
} from 'lucide-react';

const Floating = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    age: '',
    message: ''
  });

  const handleClose = () => {
    setIsOpen(false);
    if (onClose && typeof onClose === 'function') {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Enquiry Submitted Successfully!');
    handleClose();
  };

  // Progress: how many of the 3 required fields are filled
  const progress = useMemo(() => {
    const required = [formData.name, formData.address, formData.age];
    const filled = required.filter((v) => v && v.length > 0).length;
    return Math.round((filled / required.length) * 100);
  }, [formData]);

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="floating-modal-overlay" 
      onClick={handleClose} 
      role="dialog" 
      aria-modal="true"
    >
      <div 
        className="floating-card" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient border glow */}
        <div className="floating-card-glow"></div>

        <button 
          type="button"
          className="floating-close-btn" 
          onClick={handleClose} 
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Compact Glass Header with circular framed photo */}
        <div className="floating-header">
          <div className="floating-avatar-frame">
            <img src={bgTop} alt="Nanda Kidz" className="floating-avatar-img" />
            <span className="floating-avatar-sparkle"><Sparkles size={14} /></span>
          </div>

          <div className="floating-header-text">
            <div className="brand-logo-wrapper">
              <div className="brand-logo-text">
                <span className="letter-n">N</span>
                <span className="letter-a">A</span>
                <span className="letter-n2">N</span>
                <span className="letter-d">D</span>
                <span className="letter-a2">A</span>
              </div>
              <div className="brand-subtext">KIDZ</div>
            </div>
            <div className="brand-tagline">Preschool &amp; Daycare</div>
          </div>
        </div>

        <div className="floating-intro">
          <h1 className="floating-title">Let's Get Started</h1>
          <p className="floating-subtitle">
            We're excited to be part of your child's learning journey!
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="floating-progress-row">
          <div className="floating-progress-track">
            <div
              className="floating-progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="floating-progress-label">{progress}% complete</span>
        </div>

        {/* Scrollable Form Body */}
        <div className="floating-scroll-body">
          <div className="floating-form-container">
            <form onSubmit={handleSubmit} className="floating-form">

              {/* Child's Name — floating label style */}
              <div className="fl-field fl-purple">
                <div className="fl-icon"><User size={16} /></div>
                <input
                  type="text"
                  name="name"
                  id="fl-name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="fl-name">Child's Name <span className="required-star">★</span></label>
              </div>

              {/* Address */}
              <div className="fl-field fl-green">
                <div className="fl-icon"><MapPin size={16} /></div>
                <input
                  type="text"
                  name="address"
                  id="fl-address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label htmlFor="fl-address">Address <span className="required-star">★</span></label>
              </div>

              {/* Child's Age */}
              <div className="fl-field fl-orange">
                <div className="fl-icon"><Cake size={16} /></div>
                <select
                  name="age"
                  id="fl-age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className={formData.age ? 'has-value' : ''}
                >
                  <option value="" disabled hidden></option>
                  <option value="2">2 Years</option>
                  <option value="3">3 Years</option>
                  <option value="4">4 Years</option>
                  <option value="5+">5+ Years</option>
                </select>
                <label htmlFor="fl-age">Child's Age <span className="required-star">★</span></label>
              </div>

              {/* Message */}
              <div className="fl-field fl-pink fl-textarea-field">
                <div className="fl-icon"><MessageSquare size={16} /></div>
                <textarea
                  name="message"
                  id="fl-message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder=" "
                  rows="3"
                />
                <label htmlFor="fl-message">Message (optional)</label>
              </div>

              <button type="submit" className="submit-btn">
                <span className="submit-btn-shine"></span>
                <Send size={18} className="submit-icon" />
                <span>Submit Enquiry</span>
              </button>
            </form>

            <div className="form-divider">
              <span className="divider-heart">♥</span>
            </div>

            <p className="contact-quick-label">Prefer to talk instead?</p>

            <div className="contact-actions">
              <a href="tel:+919876543210" className="contact-action-btn call-btn" title="Call Us">
                <span className="contact-action-icon">
                  <Phone size={18} />
                </span>
                <span className="contact-action-text">
                  <span className="contact-action-title">Call Us</span>
                  <span className="contact-action-sub">Speak directly</span>
                </span>
              </a>

              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="contact-action-btn whatsapp-btn" title="WhatsApp Us">
                <span className="contact-action-icon">
                  <span className="whatsapp-pulse"></span>
                  <MessageCircle size={18} />
                </span>
                <span className="contact-action-text">
                  <span className="contact-action-title">WhatsApp</span>
                  <span className="contact-action-sub">Quick chat</span>
                </span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Floating;
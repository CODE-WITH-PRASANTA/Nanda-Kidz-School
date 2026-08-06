import React, { useState } from 'react';
import './Floating.css';

// Import local image
import bgTop from '../../assets/nan1.png';

// Lucide Icons
import { 
  X, 
  User, 
  MapPin, 
  Cake, 
  MessageSquare, 
  Send, 
  Phone, 
  MessageCircle 
} from 'lucide-react';

const Floating = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    age: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Enquiry Submitted Successfully!');
  };

  return (
    <div className="floating-modal-overlay">
      <div className="floating-card">
        
        {/* Top Header Banner Background Section */}
        <div 
          className="floating-header-bg" 
          style={{ backgroundImage: `url(${bgTop})` }}
        >
          {/* Close Button */}
          <button className="floating-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} color="#1e293b" />
          </button>

          {/* Logo & Header Title */}
          <div className="floating-brand-section">
            <div className="brand-logo-wrapper">
              <div className="brand-logo-text">
                <span className="letter-n">N</span>
                <span className="letter-a">A</span>
                <span className="letter-n2">N</span>
                <span className="letter-d">D</span>
                <span className="letter-a2">A</span>
              </div>
              <div className="brand-subtext">KIDS</div>
            </div>
            <div className="brand-tagline">Preschool & Daycare</div>
            
            <h1 className="floating-title">Enquiry Form</h1>
            <p className="floating-subtitle">
              We’re excited to be a part
            </p>
            <p className="floating-subtitle">of your child’s learning journey!</p>
          </div>
          <span className="heart-icon">❤️</span>
        </div>

        {/* Main Form Content */}
        <div className="floating-form-container">
          <form onSubmit={handleSubmit} className="floating-form">
            
            {/* Child's Name */}
            <div className="form-group field-purple">
              <div className="input-label-row">
                <div className="field-icon icon-purple">
                  <User size={16} />
                </div>
                <label>Child’s Name <span className="required-star">★</span></label>
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter child’s full name"
                required
              />
            </div>

            {/* Address */}
            <div className="form-group field-green">
              <div className="input-label-row">
                <div className="field-icon icon-green">
                  <MapPin size={16} />
                </div>
                <label>Address <span className="required-star">★</span></label>
              </div>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your full address"
                required
              />
            </div>

            {/* Child's Age */}
            <div className="form-group field-orange">
              <div className="input-label-row">
                <div className="field-icon icon-orange">
                  <Cake size={16} />
                </div>
                <label>Child’s Age <span className="required-star">★</span></label>
              </div>
              <select
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              >
                <option value="" disabled hidden>Select child’s age</option>
                <option value="2">2 Years</option>
                <option value="3">3 Years</option>
                <option value="4">4 Years</option>
                <option value="5+">5+ Years</option>
              </select>
            </div>

            {/* Message */}
            <div className="form-group field-pink">
              <div className="input-label-row">
                <div className="field-icon icon-pink">
                  <MessageSquare size={16} />
                </div>
                <label>Message</label>
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your child..."
                rows="3"
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn">
              <Send size={18} className="submit-icon" />
              <span>Submit Enquiry</span>
            </button>
          </form>

          {/* Divider */}
          <div className="form-divider">
            <span className="divider-heart">♥</span>
          </div>

          {/* Quick Contact Action Buttons */}
          <div className="contact-actions">
            <a href="tel:+919876543210" className="contact-action-btn call-btn" title="Call Us">
              <Phone size={20} />
              <span>Call Us</span>
            </a>

            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="contact-action-btn whatsapp-btn" title="WhatsApp Us">
              <MessageCircle size={20} />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Floating;
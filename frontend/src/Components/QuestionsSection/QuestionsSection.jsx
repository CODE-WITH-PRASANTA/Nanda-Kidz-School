import React, { useState } from 'react';
import './QuestionsSection.css';

const QuestionsSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
  };

  return (
    <section className="QuestionsSection">
      <div className="QuestionsSection-container">
        
        {/* Header Section */}
        <div className="QuestionsSection-header">
          <span className="QuestionsSection-subtitle">Questions</span>
          <h2 className="QuestionsSection-title">Do You Have Any Questions?</h2>
        </div>

        {/* Form Container */}
        <form className="QuestionsSection-form" onSubmit={handleSubmit}>
          
          {/* Top Row: Name & Email */}
          <div className="QuestionsSection-row">
            <div className="QuestionsSection-input-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="QuestionsSection-input"
                required
              />
            </div>
            <div className="QuestionsSection-input-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="QuestionsSection-input"
                required
              />
            </div>
          </div>

          {/* Middle Row: Phone & Subject */}
          <div className="QuestionsSection-row">
            <div className="QuestionsSection-input-group">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="QuestionsSection-input"
              />
            </div>
            <div className="QuestionsSection-input-group">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="QuestionsSection-input"
              />
            </div>
          </div>

          {/* Message Row */}
          <div className="QuestionsSection-row single">
            <div className="QuestionsSection-input-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="QuestionsSection-textarea"
                rows="6"
                required
              ></textarea>
            </div>
          </div>

          {/* Submit Button Container */}
          <div className="QuestionsSection-btn-wrapper">
            <button type="submit" className="QuestionsSection-submit-btn">
              <span>Send Message</span>
            </button>
          </div>

        </form>

      </div>
    </section>
  );
};

export default QuestionsSection;
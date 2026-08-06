import React, { useState } from 'react';
import './Love.css';
import flowerImg from '../../assets/flower-1.png'; // अपनी फोटो का सही पथ (path) दें
import bunnyImg from '../../assets/an-01.png';

const Love = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    country: '',
    city: '',
    address: '',
    zipCode: '',
    message: '',
  });

  const countryList = [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'Australia',
    'India',
    'Brazil',
    'Japan',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted Data:', formData);
  };

  return (
    <div className="love-wrapper">
      {/* Floating Images */}
      <img src={flowerImg} alt="Flower" className="floating-flower" />
      <img src={bunnyImg} alt="Bunny" className="floating-bunny" />

      <div className="love-container">
        {/* Header Section */}
        <div className="love-header">
          <p className="subtitle">GET IN TOUCH WITH US</p>
          <h1 className="main-title">
            We’d <span className="highlight-text">Love</span> to Hear from You!
          </h1>
          <p className="description">
            Have questions or want to join our fun days? Our kind teachers are here to help you and
            your family feel happy and comfortable every step of the way.
          </p>
        </div>

        {/* Stepper Navigation */}
        <div className="stepper-container">
          <div className="step-item active">
            <div className="step-circle">1</div>
            <span className="step-label">Personal<br />Informations</span>
          </div>
          <div className="step-line"></div>
          <div className="step-item">
            <div className="step-circle">2</div>
            <span className="step-label">Choose<br />Donation</span>
          </div>
          <div className="step-line"></div>
          <div className="step-item">
            <div className="step-circle">3</div>
            <span className="step-label">Contact<br />Informations</span>
          </div>
        </div>

        {/* Form Section */}
        <form className="love-form" onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="form-row three-cols">
            <div className="form-group">
              <label htmlFor="name">Name <span className="required">*</span></label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Insert your name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="surname">Surname <span className="required">*</span></label>
              <input
                type="text"
                id="surname"
                name="surname"
                placeholder="Insert your surname"
                value={formData.surname}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email <span className="required">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Insert your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="form-row two-cols">
            <div className="form-group">
              <label htmlFor="country">Your country <span className="required">*</span></label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled hidden>Not Set</option>
                {countryList.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="city">City <span className="required">*</span></label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Your City"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="form-row two-cols">
            <div className="form-group">
              <label htmlFor="address">Address <span className="required">*</span></label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Insert your address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="zipCode">Zip Code <span className="required">*</span></label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                placeholder="Type your Zip Code"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="form-row full-width">
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Write your message"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-submit-container">
            <button type="submit" className="submit-btn">NEXT</button>
          </div>
        </form>
      </div>

      {/* Floating Action Buttons */}
      <div className="floating-actions">
        <button className="action-btn demo-btn">DEMOS</button>
        <button className="action-btn purchase-btn">PURCHASE</button>
      </div>
    </div>
  );
};

export default Love;
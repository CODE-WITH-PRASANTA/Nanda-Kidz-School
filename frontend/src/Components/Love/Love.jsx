import React, { useState } from "react";
import "./Love.css";

import flowerImg from "../../assets/flower-1.png";
import bunnyImg from "../../assets/an-01.png";

const Love = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    childAge: "",
    city: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (submitted) {
      setSubmitted(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Nanda Kidz enquiry:", formData);

    setSubmitted(true);

    setFormData({
      name: "",
      surname: "",
      email: "",
      phone: "",
      childAge: "",
      city: "",
      message: "",
    });
  };

  return (
    <section
      className="love-wrapper"
      aria-labelledby="love-main-title"
    >
      {/* Decorative illustrations */}
      <img
        src={flowerImg}
        alt=""
        aria-hidden="true"
        className="floating-flower"
      />

      <img
        src={bunnyImg}
        alt=""
        aria-hidden="true"
        className="floating-bunny"
      />

      <div className="love-container">

        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="love-header">
          <span className="subtitle">
            GET IN TOUCH WITH NANDA KIDZ
          </span>

          <h1
            id="love-main-title"
            className="main-title"
          >
            <span className="highlight-text">
              Nanda Kidz Best play school in Bhubaneswar
            </span>
          </h1>

          <p className="description">
            Have questions about admissions, classes, activities or
            your child&apos;s first school experience? Send us your
            enquiry and our team will be happy to guide you through
            the next steps.
          </p>
        </div>

        {/* =====================================================
            CONTACT HIGHLIGHTS
        ====================================================== */}
        <div className="contact-highlights">

          <div className="contact-highlight">
            <span className="highlight-icon">01</span>
            <div>
              <strong>Visit Our School</strong>
              <p>
                K-5, HIG-424, Kalinga Vihar,
                Kalinganagar, Bhubaneswar
              </p>
            </div>
          </div>

          <a
            href="tel:+919438013349"
            className="contact-highlight contact-highlight-link"
          >
            <span className="highlight-icon">02</span>
            <div>
              <strong>Call Us</strong>
              <p>+91 9438013349</p>
            </div>
          </a>

          <div className="contact-highlight">
            <span className="highlight-icon">03</span>
            <div>
              <strong>Parent Enquiries</strong>
              <p>
                Admissions, programs, fees and school information
              </p>
            </div>
          </div>

        </div>

        {/* =====================================================
            FORM
        ====================================================== */}
        <form
          className="love-form"
          onSubmit={handleSubmit}
        >
          <div className="form-card">

            <div className="form-card-heading">
              <span>Parent Enquiry</span>

              <h2>
                Tell us how we can help
              </h2>

              <p>
                Share a few details and your question. Please provide
                accurate contact information so the school can get
                back to you.
              </p>
            </div>

            {/* Row 1 */}
            <div className="form-row three-cols">
              <div className="form-group">
                <label htmlFor="name">
                  First Name <span className="required">*</span>
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your first name"
                  value={formData.name}
                  onChange={handleInputChange}
                  autoComplete="given-name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="surname">
                  Surname <span className="required">*</span>
                </label>

                <input
                  type="text"
                  id="surname"
                  name="surname"
                  placeholder="Enter your surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                  autoComplete="family-name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email <span className="required">*</span>
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="form-row three-cols">
              <div className="form-group">
                <label htmlFor="phone">
                  Phone Number <span className="required">*</span>
                </label>

                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={formData.phone}
                  onChange={handleInputChange}
                  autoComplete="tel"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="childAge">
                  Child&apos;s Age
                </label>

                <select
                  id="childAge"
                  name="childAge"
                  value={formData.childAge}
                  onChange={handleInputChange}
                >
                  <option value="">
                    Select age
                  </option>
                  <option value="2-3 years">
                    2 - 3 years
                  </option>
                  <option value="3-4 years">
                    3 - 4 years
                  </option>
                  <option value="4-5 years">
                    4 - 5 years
                  </option>
                  <option value="5-6 years">
                    5 - 6 years
                  </option>
                  <option value="6+ years">
                    6+ years
                  </option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="city">
                  City <span className="required">*</span>
                </label>

                <input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Bhubaneswar"
                  value={formData.city}
                  onChange={handleInputChange}
                  autoComplete="address-level2"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div className="form-address">
              <span>School Location</span>

              <p>
                K-5, HIG-424, Kalinga Vihar,
                Kalinganagar, Bhubaneswar, Odisha 751028
              </p>
            </div>

            {/* Message */}
            <div className="form-row full-width">
              <div className="form-group">
                <label htmlFor="message">
                  Your Question <span className="required">*</span>
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Ask about admission, fees, classes, activities, transport or anything else you would like to know..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <div className="form-submit-container">
              <button
                type="submit"
                className="submit-btn"
              >
                <span>Send Enquiry</span>
                <span className="submit-arrow">→</span>
              </button>

              <p className="form-note">
                Prefer a quick conversation? Call{" "}
                <a href="tel:+919438013349">
                  +91 9438013349
                </a>
              </p>
            </div>

            {submitted && (
              <div
                className="form-success"
                role="status"
              >
                Thank you. Your enquiry has been submitted successfully.
              </div>
            )}
          </div>
        </form>

        {/* =====================================================
            BOTTOM CONTENT
        ====================================================== */}
        <div className="love-bottom">

          <span className="bottom-label">
            A simple step toward the right beginning
          </span>

          <h2>
            Looking for a caring school for your little one?
          </h2>

          <p>
            Nanda Kidz – The Little Kingdom aims to make the early
            years joyful, comfortable and meaningful. Parents can
            contact us to learn more about the school environment,
            available programs, admission process and other
            information before making a decision.
          </p>

          <a
            href="tel:+919438013349"
            className="bottom-call"
          >
            Call Nanda Kidz
            <span>+91 9438013349</span>
          </a>

        </div>
      </div>
    </section>
  );
};

export default Love;
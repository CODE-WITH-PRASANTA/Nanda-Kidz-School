import React, { useState } from "react";
import "./Love.css";

import flowerImg from "../../assets/flower-1.png";
import bunnyImg from "../../assets/an-01.png";

import { API } from "../../api/axios";

const initialFormData = {
  name: "",
  surname: "",
  email: "",
  phone: "",
  childAge: "",
  city: "",
  message: "",
};

const Love = () => {
  const [formData, setFormData] = useState(initialFormData);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear old messages while user edits
    if (error) {
      setError("");
    }

    if (submitted) {
      setSubmitted(false);
    }
  };

  // =====================================================
  // HANDLE FORM SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple clicks
    if (loading) return;

    setLoading(true);
    setError("");
    setSubmitted(false);

    try {
      // -------------------------------------------------
      // Prepare data
      // -------------------------------------------------

      const payload = {
        name: formData.name.trim(),
        surname: formData.surname.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        childAge: formData.childAge,
        city: formData.city.trim(),
        message: formData.message.trim(),
      };

      console.log("Sending contact enquiry:", payload);

      // -------------------------------------------------
      // POST REQUEST
      // http://localhost:5000/api/contact-leads
      // -------------------------------------------------

      const response = await API.post(
        "/contact-leads",
        payload
      );

      console.log(
        "Contact enquiry response:",
        response.data
      );

      // -------------------------------------------------
      // SUCCESS
      // -------------------------------------------------

      if (response.data?.success) {
        setSubmitted(true);

        // Clear form
        setFormData(initialFormData);

        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        setError(
          response.data?.message ||
            "Unable to submit your enquiry."
        );
      }
    } catch (err) {
      console.error(
        "Contact enquiry error:",
        err
      );

      // Backend error
      if (err.response) {
        console.error(
          "Backend response:",
          err.response.data
        );

        setError(
          err.response.data?.message ||
            "Server error. Please try again."
        );
      }

      // Server is not running / network error
      else if (err.request) {
        setError(
          "Unable to connect to the server. Please try again."
        );
      }

      // Other error
      else {
        setError(
          "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="love-wrapper"
      aria-labelledby="love-main-title"
    >
      {/* =====================================================
          DECORATIVE IMAGES
      ====================================================== */}

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
            Have questions about admissions, classes,
            activities or your child&apos;s first school
            experience? Send us your enquiry and our
            team will be happy to guide you through
            the next steps.
          </p>
        </div>

        {/* =====================================================
            CONTACT HIGHLIGHTS
        ====================================================== */}

        <div className="contact-highlights">

          {/* School Address */}

          <div className="contact-highlight">
            <span className="highlight-icon">
              01
            </span>

            <div>
              <strong>
                Visit Our School
              </strong>

              <p>
                K-5, HIG-424, Kalinga Vihar,
                Kalinganagar, Bhubaneswar
              </p>
            </div>
          </div>

          {/* Phone */}

          <a
            href="tel:+919438013349"
            className="contact-highlight contact-highlight-link"
          >
            <span className="highlight-icon">
              02
            </span>

            <div>
              <strong>
                Call Us
              </strong>

              <p>
                +91 9438013349
              </p>
            </div>
          </a>

          {/* Parent Enquiry */}

          <div className="contact-highlight">
            <span className="highlight-icon">
              03
            </span>

            <div>
              <strong>
                Parent Enquiries
              </strong>

              <p>
                Admissions, programs, fees and
                school information
              </p>
            </div>
          </div>

        </div>

        {/* =====================================================
            CONTACT FORM
        ====================================================== */}

        <form
          className="love-form"
          onSubmit={handleSubmit}
          noValidate={false}
        >
          <div className="form-card">

            {/* =================================================
                FORM HEADER
            ================================================== */}

            <div className="form-card-heading">
              <span>
                Parent Enquiry
              </span>

              <h2>
                Tell us how we can help
              </h2>

              <p>
                Share a few details and your question.
                Please provide accurate contact
                information so the school can get back
                to you.
              </p>
            </div>

            {/* =================================================
                ROW 1
            ================================================== */}

            <div className="form-row three-cols">

              {/* First Name */}

              <div className="form-group">
                <label htmlFor="name">
                  First Name{" "}
                  <span className="required">
                    *
                  </span>
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
                  disabled={loading}
                />
              </div>

              {/* Surname */}

              <div className="form-group">
                <label htmlFor="surname">
                  Surname{" "}
                  <span className="required">
                    *
                  </span>
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
                  disabled={loading}
                />
              </div>

              {/* Email */}

              <div className="form-group">
                <label htmlFor="email">
                  Email{" "}
                  <span className="required">
                    *
                  </span>
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
                  disabled={loading}
                />
              </div>

            </div>

            {/* =================================================
                ROW 2
            ================================================== */}

            <div className="form-row three-cols">

              {/* Phone */}

              <div className="form-group">
                <label htmlFor="phone">
                  Phone Number{" "}
                  <span className="required">
                    *
                  </span>
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
                  disabled={loading}
                />
              </div>

              {/* Child Age */}

              <div className="form-group">
                <label htmlFor="childAge">
                  Child&apos;s Age
                </label>

                <select
                  id="childAge"
                  name="childAge"
                  value={formData.childAge}
                  onChange={handleInputChange}
                  disabled={loading}
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

              {/* City */}

              <div className="form-group">
                <label htmlFor="city">
                  City{" "}
                  <span className="required">
                    *
                  </span>
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
                  disabled={loading}
                />
              </div>

            </div>

            {/* =================================================
                SCHOOL LOCATION
            ================================================== */}

            <div className="form-address">
              <span>
                School Location
              </span>

              <p>
                K-5, HIG-424, Kalinga Vihar,
                Kalinganagar, Bhubaneswar,
                Odisha 751028
              </p>
            </div>

            {/* =================================================
                MESSAGE
            ================================================== */}

            <div className="form-row full-width">

              <div className="form-group">

                <label htmlFor="message">
                  Your Question{" "}
                  <span className="required">
                    *
                  </span>
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Ask about admission, fees, classes, activities, transport or anything else you would like to know..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                />

              </div>

            </div>

            {/* =================================================
                ERROR MESSAGE
            ================================================== */}

            {error && (
              <div
                className="form-error"
                role="alert"
              >
                {error}
              </div>
            )}

            {/* =================================================
                SUBMIT AREA
            ================================================== */}

            <div className="form-submit-container">

              <button
                type="submit"
                className="submit-btn"
                disabled={loading}
              >
                <span>
                  {loading
                    ? "Submitting..."
                    : "Send Enquiry"}
                </span>

                <span className="submit-arrow">
                  {loading ? "..." : "→"}
                </span>
              </button>

              <p className="form-note">
                Prefer a quick conversation? Call{" "}
                <a href="tel:+919438013349">
                  +91 9438013349
                </a>
              </p>

            </div>

            {/* =================================================
                SUCCESS MESSAGE
            ================================================== */}

            {submitted && (
              <div
                className="form-success"
                role="status"
                aria-live="polite"
              >
                Thank you! Your enquiry has been
                submitted successfully. Our team will
                contact you soon.
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
            Looking for a caring school for your
            little one?
          </h2>

          <p>
            Nanda Kidz – The Little Kingdom aims to
            make the early years joyful, comfortable
            and meaningful. Parents can contact us
            to learn more about the school environment,
            available programs, admission process and
            other information before making a decision.
          </p>

          <a
            href="tel:+919438013349"
            className="bottom-call"
          >
            Call Nanda Kidz
            <span>
              +91 9438013349
            </span>
          </a>

        </div>

      </div>
    </section>
  );
};

export default Love;
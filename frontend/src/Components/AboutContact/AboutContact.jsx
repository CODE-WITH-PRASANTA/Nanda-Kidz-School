
import React, { useState } from "react";
import "./AboutContact.css";
import api from "../../api/axios";

import {
  Send,
  Phone,
  MapPin,
  Clock,
  User,
  PenLine,
  Navigation,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Nanda+Kidz+Kalinga+Vihar+Kalinganagar+Bhubaneswar+Odisha+751028";

const CONTACT_DETAILS = [
  {
    id: 1,
    icon: <Phone size={18} />,
    label: "Call Nanda Kidz",
    value: "+91 9438013349",
    href: "tel:+919438013349",
  },
  {
    id: 2,
    icon: <MapPin size={18} />,
    label: "Our Location",
    value:
      "K-5, HIG-424, Kalinga Vihar LIG, Kalinganagar, Bhubaneswar, Odisha 751028",
    href: MAP_URL,
  },
  {
    id: 3,
    icon: <Clock size={18} />,
    label: "School Hours",
    value: "Monday - Saturday · Contact us for current timings",
  },
];

const SOCIAL_LINKS = [
  {
    id: "facebook",
    icon: <FaFacebookF size={16} />,
    href: "https://facebook.com",
    label: "Facebook",
  },
  {
    id: "instagram",
    icon: <FaInstagram size={17} />,
    href: "https://instagram.com",
    label: "Instagram",
  },
  {
    id: "youtube",
    icon: <FaYoutube size={18} />,
    href: "https://youtube.com",
    label: "YouTube",
  },
];

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const AboutContact = () => {
  const [formData, setFormData] = useState(INITIAL_FORM);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitStatus, setSubmitStatus] = useState(null);

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // HANDLE FORM SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Don't allow multiple submissions
    if (isSubmitting) {
      return;
    }

    // Reset old status
    setSubmitStatus(null);

    setIsSubmitting(true);

    try {
      // ========================================
      // SEND DATA TO BACKEND
      // Using existing Axios API instance
      // ========================================

      const response = await api.post("/contacts", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      console.log(
        "Contact submitted successfully:",
        response.data
      );

      // ========================================
      // SUCCESS
      // ========================================

      setSubmitStatus("success");

      // Clear form after successful submission
      setFormData(INITIAL_FORM);

    } catch (error) {
      // ========================================
      // ERROR
      // ========================================

      console.error(
        "Contact form submission failed:",
        error
      );

      console.error(
        "Backend response:",
        error.response?.data
      );

      setSubmitStatus("error");

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="about-contact-section">

      {/* Decorative Background */}

      <div
        className="about-contact-glow-blob about-contact-glow-blob-1"
        aria-hidden="true"
      />

      <div
        className="about-contact-glow-blob about-contact-glow-blob-2"
        aria-hidden="true"
      />

      <div
        className="about-contact-dot-grid"
        aria-hidden="true"
      />

      <div className="about-contact-container">

        <div className="about-contact-grid">

          {/* =====================================================
              LEFT SIDE - CONTACT INFORMATION
          ===================================================== */}

          <div className="about-contact-info">

            <div className="about-contact-info-header">

              <span
                className="about-contact-plane-icon"
                aria-hidden="true"
              >
                <Send size={18} />
              </span>

              <span className="about-contact-eyebrow">
                Come & Visit Us
              </span>

              <h1 className="about-contact-title">
                best play school in bhubaneswar
              </h1>

              <div className="about-contact-title-underline" />

              <p className="about-contact-description">
                Looking for a warm and caring place where your child
                can enjoy their first school experiences? Nanda Kidz
                provides a friendly environment where children learn,
                play and grow with confidence.
              </p>

              <p className="about-contact-description about-contact-location-intro">
                Visit our school at Kalinga Vihar, Kalinganagar,
                Bhubaneswar, and talk with our team about your
                child&apos;s early learning journey.
              </p>

            </div>

            {/* Contact Details */}

            <div className="about-contact-details-list">

              {CONTACT_DETAILS.map((item) => (
                <div
                  className="about-contact-detail-item"
                  key={item.id}
                >

                  <div className="about-contact-detail-icon">
                    {item.icon}
                  </div>

                  <div className="about-contact-detail-text">

                    <span className="about-contact-detail-label">
                      {item.label}
                    </span>

                    {item.href ? (
                      <a
                        href={item.href}
                        className="about-contact-detail-value link-value"
                        target={
                          item.href.startsWith("http")
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="about-contact-detail-value">
                        {item.value}
                      </span>
                    )}

                  </div>

                </div>
              ))}

            </div>

            {/* Get Directions */}

            <a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="about-contact-directions-btn"
            >
              <Navigation size={16} />
              <span>Get Directions</span>
            </a>

            {/* Social Links */}

            <div className="about-contact-social-row">

              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-contact-social-icon"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}

            </div>

          </div>

          {/* =====================================================
              RIGHT SIDE - CONTACT FORM
          ===================================================== */}

          <div className="about-contact-form-card">

            <div className="about-contact-form-header">

              <div className="about-contact-form-icon">
                <Send size={18} />
              </div>

              <div>

                <span className="about-contact-form-small-title">
                  We&apos;re Here to Help
                </span>

                <h2 className="about-contact-form-title">
                  Send Us a Message
                </h2>

              </div>

            </div>

            <p className="about-contact-form-intro">
              Have a question about admission, school activities or
              visiting Nanda Kidz? Send us a message and our team
              will be happy to assist you.
            </p>

            {/* ==========================================
                SUCCESS MESSAGE
            ========================================== */}

            {submitStatus === "success" && (
              <div
                className="about-contact-form-alert success"
                role="alert"
              >
                Thank you! Your message has been received.
                We&apos;ll get back to you soon.
              </div>
            )}

            {/* ==========================================
                ERROR MESSAGE
            ========================================== */}

            {submitStatus === "error" && (
              <div
                className="about-contact-form-alert error"
                role="alert"
              >
                Something went wrong. Please try again.
              </div>
            )}

            <form
              className="about-contact-form"
              onSubmit={handleSubmit}
            >

              {/* Name + Email */}

              <div className="about-contact-form-row">

                <div className="about-contact-field">

                  <User
                    size={16}
                    className="about-contact-field-icon"
                    aria-hidden="true"
                  />

                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />

                </div>

                <div className="about-contact-field">

                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />

                </div>

              </div>

              {/* Phone + Subject */}

              <div className="about-contact-form-row">

                <div className="about-contact-field">

                  <Phone
                    size={16}
                    className="about-contact-field-icon"
                    aria-hidden="true"
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                  />

                </div>

                <div className="about-contact-field">

                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* Message */}

              <div className="about-contact-field about-contact-field-textarea">

                <PenLine
                  size={16}
                  className="about-contact-field-icon about-contact-field-icon-top"
                  aria-hidden="true"
                />

                <textarea
                  name="message"
                  placeholder="Tell us how we can help..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* Submit */}

              <button
                type="submit"
                className="about-contact-submit-btn"
                disabled={isSubmitting}
              >

                <Send size={16} />

                <span>
                  {isSubmitting
                    ? "Sending..."
                    : "Send Message"}
                </span>

              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
};

export default AboutContact;


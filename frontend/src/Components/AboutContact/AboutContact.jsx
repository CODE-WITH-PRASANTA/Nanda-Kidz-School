import React, { useState } from "react";
import "./AboutContact.css";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  Tag,
  PenLine,
  Headphones,
  Globe,
  Share2,
  Compass,
  MessageCircle,
  GraduationCap,
  Building2,
  Sparkles,
} from "lucide-react";

const CONTACT_DETAILS = [
  {
    id: 1,
    icon: <Phone size={20} />,
    label: "Call Us",
    value: "+91 98765 43210",
  },
  {
    id: 2,
    icon: <Mail size={20} />,
    label: "Email Us",
    value: "info@nandakidz.com",
  },
  {
    id: 3,
    icon: <MapPin size={20} />,
    label: "Visit Us",
    value: "K-5, HIG-424, Kalinga Vihar, Kalinganagar, Bhubaneswar, Odisha 751019",
  },
  {
    id: 4,
    icon: <Clock size={20} />,
    label: "Office Hours",
    value: "Mon - Sat: 8:00 AM - 5:00 PM · Sunday: Closed",
  },
];

const SOCIAL_LINKS = [
  { id: "facebook", icon: <Globe size={18} />, href: "https://facebook.com", label: "Facebook" },
  { id: "instagram", icon: <Share2 size={18} />, href: "https://instagram.com", label: "Instagram" },
  { id: "twitter", icon: <Compass size={18} />, href: "https://twitter.com", label: "Twitter" },
  { id: "youtube", icon: <MessageCircle size={18} />, href: "https://youtube.com", label: "YouTube" },
];

const AboutContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="about-contact-section">
      <div className="about-contact-glow-blob about-contact-glow-blob-1" aria-hidden="true" />
      <div className="about-contact-glow-blob about-contact-glow-blob-2" aria-hidden="true" />
      <div className="about-contact-dot-grid" aria-hidden="true" />

      <div className="about-contact-container">
        <div className="about-contact-grid">

          {/* ================= LEFT: INFO PANEL ================= */}
          <div className="about-contact-info">
            <div className="about-contact-info-header">
              <span className="about-contact-plane-icon">
                <Send size={22} />
              </span>
              <span className="about-contact-eyebrow">Get In</span>
              <h2 className="about-contact-title">Touch With Us</h2>
              <div className="about-contact-title-underline" />
              <p className="about-contact-description">
                We'd love to hear from you! Whether you have a question about
                admissions, our programs, or just want to say hello, our team
                is always here for you.
              </p>
            </div>

            <div className="about-contact-details-list">
              {CONTACT_DETAILS.map((item) => (
                <div className="about-contact-detail-item" key={item.id}>
                  <div className="about-contact-detail-icon">{item.icon}</div>
                  <div className="about-contact-detail-text">
                    <span className="about-contact-detail-label">{item.label}</span>
                    <span className="about-contact-detail-value">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>

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

            {/* CAMPUS CARD GRAPHIC CONTAINER MATCHING REFERENCE IMAGE */}
            <div className="about-contact-photo-wrapper">
             

             
            </div>
          </div>

          {/* ================= RIGHT: FORM CARD ================= */}
          <div className="about-contact-form-card">
            <div className="about-contact-form-header">
              <div className="about-contact-form-icon">
                <Send size={20} />
              </div>
              <h3 className="about-contact-form-title">Send Us a Message</h3>
            </div>

            {submitStatus === "success" && (
              <div className="about-contact-form-alert success">
                Thanks! Your message has been sent — we'll get back to you soon.
              </div>
            )}
            {submitStatus === "error" && (
              <div className="about-contact-form-alert error">
                Something went wrong. Please try again in a moment.
              </div>
            )}

            <form className="about-contact-form" onSubmit={handleSubmit}>
              <div className="about-contact-form-row">
                <div className="about-contact-field">
                  <User size={18} className="about-contact-field-icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="about-contact-field">
                  <Mail size={18} className="about-contact-field-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="about-contact-form-row">
                <div className="about-contact-field">
                  <Phone size={18} className="about-contact-field-icon" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="about-contact-field">
                  <Tag size={18} className="about-contact-field-icon" />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="about-contact-field about-contact-field-textarea">
                <PenLine size={18} className="about-contact-field-icon about-contact-field-icon-top" />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="about-contact-submit-btn"
                disabled={isSubmitting}
              >
                <Send size={18} />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutContact;
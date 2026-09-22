import React, { useEffect, useState, useMemo } from "react";
import "./Floating.css";
import API from "../../api/axios";
import logoImg from "../../assets/nanda image .png";

import {
  X,
  User,
  MapPin,
  Cake,
  MessageSquare,
  Send,
  Sparkles,
  Loader2,
} from "lucide-react";

const Floating = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    age: "",
    message: "",
  });

  /* =========================
     CLOSE MODAL
  ========================= */
  const handleClose = () => {
    setIsOpen(false);

    if (onClose && typeof onClose === "function") {
      onClose();
    }
  };

  /* =========================
     ESC KEY
  ========================= */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, []);

  /* =========================
     INPUT CHANGE
  ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.address.trim() ||
      !formData.age
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await API.post("/enquiries", formData);

      if (response.data && response.data.success) {
        alert("Enquiry Submitted Successfully!");
        handleClose();
      } else {
        alert(response.data?.message || "Submission failed.");
      }
    } catch (error) {
      console.error("Enquiry Submission Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to connect to the server."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* =========================
     PROGRESS
  ========================= */
  const progress = useMemo(() => {
    const required = [
      formData.name,
      formData.address,
      formData.age,
    ];

    const filled = required.filter(
      (value) =>
        value &&
        value.toString().trim().length > 0
    ).length;

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
        {/* Gradient Border */}
        <div className="floating-card-glow"></div>

        {/* =========================
            CLOSE BUTTON
        ========================= */}
        <button
          type="button"
          className="floating-close-btn"
          onClick={handleClose}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* =========================
            HEADER
        ========================= */}
        <div className="floating-header">
          <div className="floating-avatar-frame">
            <img
              src={logoImg}
              alt="Nanda Kidz – The Little Kingdom"
              className="floating-avatar-img"
            />

            <span className="floating-avatar-sparkle">
              <Sparkles size={14} />
            </span>
          </div>

          <div className="floating-header-text">
            <div className="brand-school-badge">
              <span>The Little Kingdom</span>
            </div>

            <div className="brand-logo-title">
              NANDA KIDZ
            </div>

            <div className="brand-subtext">
              A Play School • Since 2011
            </div>
          </div>
        </div>

        {/* =========================
            INTRO
        ========================= */}
        <div className="floating-intro">
          <h1 className="floating-title">
            Let's Get Started
          </h1>

          <p className="floating-subtitle">
            We're excited to be part of your child's
            learning journey!
          </p>
        </div>

        {/* =========================
            PROGRESS
        ========================= */}
        <div className="floating-progress-row">
          <div className="floating-progress-track">
            <div
              className="floating-progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <span className="floating-progress-label">
            {progress}% complete
          </span>
        </div>

        {/* =========================
            FORM BODY
        ========================= */}
        <div className="floating-scroll-body">
          <div className="floating-form-container">
            <form
              onSubmit={handleSubmit}
              className="floating-form"
            >
              {/* ==================================================
                  CHILD NAME
              ================================================== */}
              <div
                className={`fl-field fl-purple ${
                  formData.name ? "has-value" : ""
                }`}
              >
                <div className="fl-icon">
                  <User size={17} />
                </div>

                <input
                  type="text"
                  name="name"
                  id="fl-name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                />

                <label htmlFor="fl-name">
                  Child's Name
                  <span className="required-star">
                    *
                  </span>
                </label>
              </div>

              {/* ==================================================
                  ADDRESS
              ================================================== */}
              <div
                className={`fl-field fl-green ${
                  formData.address ? "has-value" : ""
                }`}
              >
                <div className="fl-icon">
                  <MapPin size={17} />
                </div>

                <input
                  type="text"
                  name="address"
                  id="fl-address"
                  value={formData.address}
                  onChange={handleChange}
                  autoComplete="street-address"
                  required
                />

                <label htmlFor="fl-address">
                  Address
                  <span className="required-star">
                    *
                  </span>
                </label>
              </div>

              {/* ==================================================
                  CHILD AGE
                  FIXED FLOATING SELECT
              ================================================== */}
              <div
                className={`fl-field fl-orange fl-age-field ${
                  formData.age ? "has-value" : ""
                }`}
              >
                <div className="fl-icon">
                  <Cake size={17} />
                </div>

                <select
                  name="age"
                  id="fl-age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  aria-label="Child's Age"
                >
                  <option value="" disabled>
                    Select child's age
                  </option>

                  <option value="2">
                    2 Years
                  </option>

                  <option value="3">
                    3 Years
                  </option>

                  <option value="4">
                    4 Years
                  </option>

                  <option value="5+">
                    5+ Years
                  </option>
                </select>

                <label htmlFor="fl-age">
                  Child's Age
                  <span className="required-star">
                    *
                  </span>
                </label>
              </div>

              {/* ==================================================
                  MESSAGE
              ================================================== */}
              <div
                className={`fl-field fl-pink fl-textarea-field ${
                  formData.message ? "has-value" : ""
                }`}
              >
                <div className="fl-icon">
                  <MessageSquare size={17} />
                </div>

                <textarea
                  name="message"
                  id="fl-message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  autoComplete="off"
                />

                <label htmlFor="fl-message">
                  Message
                  <span className="optional-text">
                    (optional)
                  </span>
                </label>
              </div>

              {/* ==================================================
                  SUBMIT
              ================================================== */}
              <button
                type="submit"
                className="submit-btn"
                disabled={submitting}
              >
                <span className="submit-btn-shine"></span>

                {submitting ? (
                  <Loader2
                    size={18}
                    className="submit-icon submit-loading"
                  />
                ) : (
                  <Send
                    size={18}
                    className="submit-icon"
                  />
                )}

                <span>
                  {submitting
                    ? "Submitting..."
                    : "Submit Enquiry"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Floating;
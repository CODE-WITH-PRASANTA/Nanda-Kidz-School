import React, { useState } from "react";
import "./QuestionsSection.css";

const QuestionsSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
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

    console.log("Form Submitted:", formData);
    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section
      className="QuestionsSection"
      aria-labelledby="QuestionsSection-title"
    >
      <div className="QuestionsSection-container">

        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="QuestionsSection-header">
          <span className="QuestionsSection-subtitle">
            Talk to Nanda Kidz
          </span>

          <h1
            id="QuestionsSection-title"
            className="QuestionsSection-title"
          >
            best nursery school in bhubaneswar
          </h1>

          <p className="QuestionsSection-intro">
            Choosing the right preschool is an important decision for
            every family. Whether you are comparing a
            <strong> best play school in bhubaneswar with fees</strong>,
            looking for a{" "}
            <strong>
              play school near khandagiri, bhubaneswar
            </strong>,
            or simply wondering
            <strong> which school is best for my child?</strong>,
            our team is here to answer your questions.
          </p>
        </div>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}
        <div className="QuestionsSection-content">

          {/* Parent Information */}
          <div className="QuestionsSection-info">
            <span className="QuestionsSection-info-label">
              We are happy to help
            </span>

            <h2>
              Looking for the right beginning for your little one?
            </h2>

            <p>
              At Nanda Kidz The Little Kingdom A Play School, we
              believe parents should have clear information before
              making an admission decision. You can ask us about
              programs, admission age, activities, school routines,
              safety, transport and current fees.
            </p>

            <div className="QuestionsSection-points">
              <div className="QuestionsSection-point">
                <span className="QuestionsSection-point-icon">
                  01
                </span>

                <div>
                  <strong>Admissions</strong>
                  <p>
                    Learn about available classes, admission age
                    and the school experience.
                  </p>
                </div>
              </div>

              <div className="QuestionsSection-point">
                <span className="QuestionsSection-point-icon">
                  02
                </span>

                <div>
                  <strong>Fees & Programs</strong>
                  <p>
                    Ask about play school fees in Bhubaneswar and
                    what is included in each program.
                  </p>
                </div>
              </div>

              <div className="QuestionsSection-point">
                <span className="QuestionsSection-point-icon">
                  03
                </span>

                <div>
                  <strong>School & Safety</strong>
                  <p>
                    Get information about classroom care, safety
                    and day-to-day arrangements.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="tel:+919438013349"
              className="QuestionsSection-phone"
            >
              <span>Prefer to speak directly?</span>
              <strong>+91 9438013349</strong>
            </a>
          </div>

          {/* =====================================================
              FORM
          ====================================================== */}
          <div className="QuestionsSection-form-card">
            <div className="QuestionsSection-form-heading">
              <span>Send us a message</span>

              <p>
                Tell us what you would like to know and our team can
                guide you with the relevant information.
              </p>
            </div>

            <form
              className="QuestionsSection-form"
              onSubmit={handleSubmit}
            >
              {/* Name + Email */}
              <div className="QuestionsSection-row">
                <div className="QuestionsSection-input-group">
                  <label htmlFor="question-name">
                    Your Name
                  </label>

                  <input
                    id="question-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="QuestionsSection-input"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="QuestionsSection-input-group">
                  <label htmlFor="question-email">
                    Email Address
                  </label>

                  <input
                    id="question-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="QuestionsSection-input"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* Phone + Subject */}
              <div className="QuestionsSection-row">
                <div className="QuestionsSection-input-group">
                  <label htmlFor="question-phone">
                    Phone Number
                  </label>

                  <input
                    id="question-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="QuestionsSection-input"
                    autoComplete="tel"
                  />
                </div>

                <div className="QuestionsSection-input-group">
                  <label htmlFor="question-subject">
                    What can we help with?
                  </label>

                  <input
                    id="question-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Admissions, fees, transport..."
                    className="QuestionsSection-input"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="QuestionsSection-row single">
                <div className="QuestionsSection-input-group">
                  <label htmlFor="question-message">
                    Your Question
                  </label>

                  <textarea
                    id="question-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what you would like to know..."
                    className="QuestionsSection-textarea"
                    rows="6"
                    required
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="QuestionsSection-btn-wrapper">
                <button
                  type="submit"
                  className="QuestionsSection-submit-btn"
                >
                  <span>Send My Question</span>
                  <span className="QuestionsSection-btn-arrow">
                    →
                  </span>
                </button>
              </div>

              {submitted && (
                <div
                  className="QuestionsSection-success"
                  role="status"
                >
                  Thank you. Your question has been received.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* =====================================================
            SEO SUPPORT CONTENT
        ====================================================== */}
        <div className="QuestionsSection-bottom">
          <span className="QuestionsSection-bottom-label">
            Helpful for parents
          </span>

          <h2>
            Nanda Kidz Best play school in Bhubaneswar
          </h2>

          <p>
            Parents searching for the{" "}
            <strong>
              best play school for kids in bhubaneswar
            </strong>{" "}
            often want to understand much more than just the
            classroom. Learning style, care, safety, activities,
            communication and the overall environment all matter.
            That is why we encourage families to ask questions before
            admission.
          </p>

          <p>
            If you are comparing a{" "}
            <strong>
              best play school in bhubaneswar
            </strong>
            , checking{" "}
            <strong>
              play school fees in bhubaneswar
            </strong>
            , or looking for the{" "}
            <strong>
              best school for lkg in bhubaneswar
            </strong>
            , speaking directly with the school can help you
            understand the options available for your child.
          </p>

          <div className="QuestionsSection-keywords">
            <span>Best play school in Kalinganagar</span>
            <span>Top best nursery school in Bhubaneswar</span>
            <span>Best play school for kids</span>
            <span>Best school for LKG</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuestionsSection;
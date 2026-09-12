import React from "react";
import "./HomeKindergarten.css";

import boyImg from "../../assets/aboutus.webp";
import owlImg from "../../assets/who-we-are-shape1.png";
import founderImg from "../../assets/NandaMam.webp";

const HomeKindergarten = () => {
  const features = [
    {
      id: 1,
      text: "Homelike Environment",
    },
    {
      id: 2,
      text: "Quality Educators",
    },
    {
      id: 3,
      text: "Safety and Security",
    },
    {
      id: 4,
      text: "Play to Learn",
    },
  ];

  return (
    <section className="hk-section">
      <div className="hk-container">

        {/* Floating Owl Mascot */}
        <div className="hk-owl-container">
          <img
            src={owlImg}
            alt="Nanda Kidz play school mascot"
            className="hk-owl-image"
          />
        </div>

        {/* Left Side - Image */}
        <div className="hk-media-column">
          <div className="hk-blob-wrapper">

            {/* Decorative Morph Blob */}
            <div className="hk-morph-blob"></div>

            {/* Main Image Frame */}
            <div className="hk-image-frame">
              <img
                src={boyImg}
                alt="Children learning and playing at Nanda Kidz in Bhubaneswar"
                className="hk-boy-image"
              />
            </div>

            {/* Decorative Dots */}
            <div className="hk-accent-dot hk-accent-dot-1"></div>
            <div className="hk-accent-dot hk-accent-dot-2"></div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="hk-content-column">

          <span className="hk-subtitle">
            Who We Are
          </span>

          {/* Primary SEO Keyword */}
          <h1 className="hk-heading">
            Best Play School in Bhubaneswar
          </h1>

          <p className="hk-text-description">
            Nanda Kidz is a caring and cheerful learning space where young
            children can learn, play, explore, and grow with confidence.
            Located in Kalinga Vihar, Bhubaneswar, we focus on creating a
            warm environment where every child feels comfortable, valued,
            and encouraged to learn at their own pace.
          </p>

          <p className="hk-text-description">
            As a trusted choice for parents looking for a{" "}
            <strong>best kids school in Bhubaneswar</strong>, Nanda Kidz
            combines playful activities with early childhood learning.
            Our approach helps children develop communication, creativity,
            social skills, independence, and a strong foundation for their
            future education.
          </p>

          <p className="hk-text-description">
            Our goal is simple — to make the early learning journey enjoyable
            and meaningful. At <strong>Nanda Kidz Best Play</strong>, children
            get opportunities to learn through stories, activities, games,
            creative work, and everyday interactions in a safe and supportive
            atmosphere.
          </p>

          <div className="hk-features-grid">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="hk-feature-card"
              >
                <span className="hk-feature-badge">
                  {feature.id}
                </span>

                <span className="hk-feature-label">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="hk-action-row">

            <a
              href="/about"
              className="hk-btn-primary"
            >
              Read More
            </a>

            {/* Founder Profile */}
            <div className="hk-founder-badge-card">

              <div className="hk-founder-avatar-wrap">
                <img
                  src={founderImg}
                  alt="Dr. Achman Nanda - Founder and Director of Nanda Kidz"
                  className="hk-founder-img"
                />
              </div>

              <div className="hk-founder-info">
                <h4 className="hk-founder-name">
                  Dr. Achman Nanda
                </h4>

                <p className="hk-founder-title">
                  Founder &amp; Director
                </p>
              </div>

            </div>
          </div>

          {/* Address / Contact */}
          <div className="hk-contact-info">

            <span className="hk-contact-item">
              <strong>Nanda Kidz</strong>
            </span>

            <span className="hk-contact-item">
              K-5, HIG-424, Kalinga Vihar LIG,
              Kalinganagar, Bhubaneswar, Odisha - 751028
            </span>

            <a
              href="tel:+919438013349"
              className="hk-contact-phone"
            >
              +91 9438013349
            </a>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeKindergarten;
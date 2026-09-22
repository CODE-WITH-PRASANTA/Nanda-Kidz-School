import React from 'react';
import './AboutUs.css';

// Local assets
import starImg from '../../assets/star.webp';
import rocketImg from '../../assets/rocket.webp';
import capImg from '../../assets/aboutuscap.webp';
import studentImg from '../../assets/aboutus.webp';

const AboutUs = () => {
  return (
    <section
      className="about-us-container"
      aria-labelledby="about-nanda-kidz-title"
    >
      {/* Ambient background decoration */}
      <div
        className="about-ambient about-ambient--1"
        aria-hidden="true"
      ></div>

      <div
        className="about-ambient about-ambient--2"
        aria-hidden="true"
      ></div>

      <div className="about-us-content">

        {/* =====================================================
            LEFT: IMAGE AREA
        ====================================================== */}
        <div className="image-section">

          {/* Decorative star */}
          <img
            src={starImg}
            alt=""
            className="decorative-star"
            aria-hidden="true"
          />

          <div className="blob-wrapper">

            {/* Decorative top dot */}
            <span
              className="blob-dot top-dot"
              aria-hidden="true"
            ></span>

            {/* Organic image frame */}
            <div className="blob-border">

              <div className="blob-image-container">
                <img
                  src={studentImg}
                  alt="Children learning and playing at Nanda Kidz"
                  className="student-image"
                />

                <div
                  className="blob-image-shine"
                  aria-hidden="true"
                ></div>
              </div>

            </div>

            {/* Experience badge */}
            <div className="about-experience-badge">
              <span
                className="badge-icon"
                aria-hidden="true"
              >
                🌟
              </span>

              <div>
                <strong>10+ Years</strong>
                <small>Trusted Early Education</small>
              </div>
            </div>

            {/* Decorative bottom dot */}
            <span
              className="blob-dot bottom-dot"
              aria-hidden="true"
            ></span>

          </div>
        </div>

        {/* =====================================================
            RIGHT: ABOUT CONTENT
        ====================================================== */}
        <div className="text-section">

          {/* Decorative rocket */}
          <img
            src={rocketImg}
            alt=""
            className="decorative-rocket"
            aria-hidden="true"
          />

          {/* Section label */}
          <div className="subtitle-wrapper">
            <img
              src={capImg}
              alt=""
              className="cap-icon"
              aria-hidden="true"
            />

            <span className="subtitle">
              ABOUT NANDA KIDZ
            </span>
          </div>

          {/* =================================================
              MAIN SEO HEADING
          ================================================== */}
          <h1
            id="about-nanda-kidz-title"
            className="main-heading"
          >
            best play school in bhubaneswar
            <br />
            <span className="heading-highlight">
              Nanda Kidz – The Little Kingdom
            </span>
          </h1>

          {/* Natural SEO content */}
          <p className="description">
            Nanda Kidz is a warm and happy place where children can learn,
            play, explore, and grow with confidence. As a trusted early
            learning centre, we focus on playful activities, creativity,
            communication, and meaningful experiences that make learning
            enjoyable for little minds.
          </p>

          <p className="description about-seo-description">
            <strong>Nanda Kidz Best play school in Bhubaneswar</strong>
            brings together caring teachers, engaging activities, and a
            child-friendly environment in Kalinga Vihar, Kalinganagar.
            Our approach gives every child the space to discover their
            interests while developing social, emotional, and early
            learning skills.
          </p>

          {/* Action row */}
          <div className="about-action-row">

            <a
              href="#more"
              className="read-more-btn"
              aria-label="Explore more about Nanda Kidz"
            >
              <span
                className="btn-shine"
                aria-hidden="true"
              ></span>

              <span>EXPLORE MORE</span>

              <span
                className="arrow-icon"
                aria-hidden="true"
              >
                ↗
              </span>
            </a>

            {/* Parent information */}
            <div className="about-stats-pill">

              <div className="stat-avatars" aria-hidden="true">
                <span>👶</span>
                <span>👧</span>
                <span>👦</span>
              </div>

              <div className="stat-text">
                <strong>Happy Little Learners</strong>
                <span>Learning through play</span>
              </div>

            </div>
          </div>

          {/* Location information */}
          <div className="about-location-box">

            <div className="location-icon" aria-hidden="true">
              📍
            </div>

            <div className="location-content">
              <span className="location-label">
                FIND NANDA KIDZ
              </span>

              <p>
                K-5, HIG-424, Kalinga Vihar LIG,
                Kalinganagar, Bhubaneswar, Odisha 751028
              </p>

              <a
                href="tel:+919438013349"
                className="location-phone"
              >
                +91 9438013349
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;
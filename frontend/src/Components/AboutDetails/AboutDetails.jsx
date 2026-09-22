import React from 'react';
import './AboutDetails.css';

import principalImg from '../../assets/NandaMam.webp';

import {
  FaUser,
  FaQuoteLeft,
  FaQuoteRight,
  FaGraduationCap,
  FaUserFriends,
  FaTrophy,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa';

import { GiOpenBook } from 'react-icons/gi';

const AboutDetails = () => {
  return (
    <section className="about-details-container">
      <div className="about-details-card">

        {/* =========================================
            LEFT SIDE - PRINCIPAL IMAGE
        ========================================= */}
        <div className="about-details-left">

          {/* Decorative Dots */}
          <div className="about-details-dots-top" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

          {/* Curved Background */}
          <svg
            className="about-details-bg-svg"
            viewBox="0 0 400 500"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 0,0 L 280,0 C 370,120 370,380 0,500 Z"
              fill="#002b5b"
            />

            <path
              d="M 280,0 C 370,120 370,380 0,500"
              fill="none"
              stroke="#f6a609"
              strokeWidth="12"
            />
          </svg>

          {/* Image Glow */}
          <div
            className="about-details-img-glow"
            aria-hidden="true"
          ></div>

          {/* Principal Image */}
          <div className="about-details-img-container">
            <img
              src={principalImg}
              alt="Nanda Kidz Founder and Director"
              className="about-details-img"
              loading="lazy"
            />
          </div>

          {/* Book Badge */}
          <div className="about-details-badge">
            <div className="about-details-badge-ring">
              <div className="about-details-badge-inner">
                <GiOpenBook className="about-details-badge-icon" />
              </div>
            </div>
          </div>
        </div>

        {/* =========================================
            RIGHT SIDE - ABOUT INFORMATION
        ========================================= */}
        <div className="about-details-right">

          {/* Decorative Leaf */}
          <svg
            className="about-details-leaf"
            viewBox="0 0 100 100"
            fill="#dce4fd"
            aria-hidden="true"
          >
            <path d="M50 0 Q75 25 100 50 Q75 75 50 100 Q25 75 0 50 Q25 25 50 0 Z" />

            <path
              d="M50 10 L50 90 M30 30 L50 50 L70 30 M30 70 L50 50 L70 70"
              stroke="#ffffff"
              strokeWidth="2"
              fill="none"
            />
          </svg>

          {/* Section Label */}
          <div className="about-details-header">
            <div className="about-details-user-avatar">
              <FaUser />
            </div>

            <span className="about-details-cursive">
              From the Desk of
            </span>
          </div>

          {/* SEO H1 */}
          <h1 className="about-details-name">
            best play school in bhubaneswar
          </h1>

          <span className="about-details-role">
            NANDA KIDZ — THE LITTLE KINGDOM
          </span>

          <div className="about-details-divider">
            <span className="about-details-diamond">◆</span>
          </div>

          {/* Founder Name */}
          <div className="about-details-founder">
            <span className="about-details-founder-label">
              Founder & Director
            </span>

            <h2 className="about-details-founder-name">
              Dr. Achman Nanda
            </h2>
          </div>

          {/* Main Description */}
          <div className="about-details-quote-box">
            <FaQuoteLeft className="about-details-qicon q-left" />

            <p className="about-details-text">
              At Nanda Kidz, we believe the early years of childhood should
              be filled with curiosity, confidence, creativity and plenty of
              happy moments. Our approach combines learning with play, giving
              children the freedom to explore while growing in a safe and
              caring environment.
            </p>

            <p className="about-details-text about-details-text-second">
              With experienced guidance and a strong focus on early childhood
              development, Nanda Kidz aims to give every child a positive
              beginning to their educational journey.
            </p>

            <FaQuoteRight className="about-details-qicon q-right" />
          </div>

          {/* Natural SEO Content */}
          <div className="about-details-seo-content">
            <p>
              Families searching for the <strong>best play school in
              bhubaneswar</strong> can discover a warm and child-friendly
              learning space at Nanda Kidz. We understand that every child
              develops differently, which is why our classrooms encourage
              children to learn at their own pace.
            </p>

            <p>
              Parents who are comparing <strong>play school fees in
              bhubaneswar</strong> can contact our team to understand the
              programs, activities and learning support included at Nanda
              Kidz.
            </p>

            <p>
              If you are wondering <strong>which school is best for my
              child?</strong>, start by looking beyond academics. A good
              early-learning environment should make your child feel safe,
              understood, encouraged and excited to come to school. That is
              the experience we work to create every day at Nanda Kidz.
            </p>
          </div>

          {/* Contact Information */}
          <div className="about-details-contact">

            <div className="about-details-contact-item">
              <div className="about-details-contact-icon">
                <FaMapMarkerAlt />
              </div>

              <div>
                <span>Visit Nanda Kidz</span>
                <strong>
                  K-5, HIG-424, Kalinga Vihar LIG,
                  Kalinganagar, Bhubaneswar, Odisha 751028
                </strong>
              </div>
            </div>

            <a
              href="tel:+919438013349"
              className="about-details-contact-item about-details-phone"
            >
              <div className="about-details-contact-icon">
                <FaPhoneAlt />
              </div>

              <div>
                <span>Call Us</span>
                <strong>+91 9438013349</strong>
              </div>
            </a>

          </div>

          {/* Bottom Stats */}
          <div className="about-details-stats">

            <div className="about-details-stat">
              <div className="about-details-stat-icon-bg">
                <FaGraduationCap />
              </div>

              <div>
                <strong>30+</strong>
                <span>
                  Years of
                  <br />
                  Experience
                </span>
              </div>
            </div>

            <div className="about-details-stat-sep"></div>

            <div className="about-details-stat">
              <div className="about-details-stat-icon-bg">
                <FaUserFriends />
              </div>

              <div>
                <strong>20+</strong>
                <span>
                  Years in Social
                  <br />
                  Work & Welfare
                </span>
              </div>
            </div>

            <div className="about-details-stat-sep"></div>

            <div className="about-details-stat">
              <div className="about-details-stat-icon-bg">
                <FaTrophy />
              </div>

              <div>
                <strong>Child</strong>
                <span>
                  Focused
                  <br />
                  Learning
                </span>
              </div>
            </div>

          </div>

          {/* Bottom Decorative Dots */}
          <div
            className="about-details-dots-bottom"
            aria-hidden="true"
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutDetails;
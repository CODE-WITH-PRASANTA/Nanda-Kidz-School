import React from "react";
import "./AboutKidsSchool.css";
import { FaInstagram } from "react-icons/fa";

// Decorative images
import kidsLeftDoodle from "../../assets/kidsleft.avif";
import kidsRightDoodle from "../../assets/kids.avif";

// Gallery images
import kids1 from "../../assets/kids1.webp";
import kids2 from "../../assets/kids2.webp";
import kids3 from "../../assets/kids3.webp";
import kids4 from "../../assets/kids4.webp";
import kids5 from "../../assets/kids5.webp";
import kids6 from "../../assets/kids6.webp";
import kids7 from "../../assets/kids7.webp";
import kids8 from "../../assets/kids8.webp";

const galleryItems = [
  {
    id: 1,
    imgSrc: kids1,
    alt: "Children enjoying a learning activity at Nanda Kidz",
  },
  {
    id: 2,
    imgSrc: kids2,
    alt: "Kids participating in a fun classroom activity",
  },
  {
    id: 3,
    imgSrc: kids3,
    alt: "Children learning and playing together",
  },
  {
    id: 4,
    imgSrc: kids4,
    alt: "Creative activity for children at play school",
  },
  {
    id: 5,
    imgSrc: kids5,
    alt: "Children enjoying a group activity",
  },
  {
    id: 6,
    imgSrc: kids6,
    alt: "Happy children taking part in school activities",
  },
  {
    id: 7,
    imgSrc: kids7,
    alt: "Kids exploring a playful learning environment",
  },
  {
    id: 8,
    imgSrc: kids8,
    alt: "Children sharing a joyful moment at school",
  },
];

const AboutKidsSchool = () => {
  return (
    <section className="social-section">
      {/* ================= Header ================= */}
      <div className="social-header">
        {/* Left Decorative Illustration */}
        <div className="doodle doodle-left">
          <img
            src={kidsLeftDoodle}
            alt=""
            aria-hidden="true"
          />
        </div>

        {/* Header Content */}
        <div className="header-content">
          <div className="sub-title">
            <span className="grad-cap-icon" aria-hidden="true">
              🎓
            </span>
            OUR LITTLE WORLD
          </div>

          <h1 className="main-title">
            best play school for kids in bhubaneswar
          </h1>

          <p className="description">
            At Nanda Kidz, children get a happy and welcoming space where
            learning happens naturally through play, stories, activities and
            everyday interaction. We believe the early years should be filled
            with curiosity, confidence and plenty of joyful moments.
          </p>

          <p className="description description-secondary">
            Parents often ask, <strong>which school is best for my child?</strong>
            {" "}The right beginning is a place where children feel safe,
            cared for and encouraged to explore. Our aim is to make those
            first school experiences comfortable, meaningful and enjoyable.
          </p>
        </div>

        {/* Right Decorative Illustration */}
        <div className="doodle doodle-right">
          <img
            src={kidsRightDoodle}
            alt=""
            aria-hidden="true"
          />
        </div>
      </div>

      {/* ================= Gallery ================= */}
      <div className="gallery-grid">
        {galleryItems.map((item) => (
          <div className="gallery-card" key={item.id}>
            <img
              src={item.imgSrc}
              alt={item.alt}
              className="card-image"
              loading="lazy"
            />

            {/* Instagram Overlay */}
            <div className="hover-overlay">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="instagram-btn"
                aria-label={`View ${item.alt} on Instagram`}
              >
                <FaInstagram className="instagram-icon" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutKidsSchool;
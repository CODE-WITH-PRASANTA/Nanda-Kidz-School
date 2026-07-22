import React from "react";
import "./AboutKidsSchool.css";
import { FaInstagram } from "react-icons/fa";

// Import local images
import kidsLeftDoodle from "../../assets/kidsleft.avif";
import kidsRightDoodle from "../../assets/kids.avif";

import kids1 from "../../assets/kids1.webp";
import kids2 from "../../assets/kids2.webp";
import kids3 from "../../assets/kids3.webp";
import kids4 from "../../assets/kids4.webp";
import kids5 from "../../assets/kids5.webp";
import kids6 from "../../assets/kids6.webp";
import kids7 from "../../assets/kids7.webp";
import kids8 from "../../assets/kids8.webp";

// Gallery Images
const galleryItems = [
  { id: 1, imgSrc: kids1, alt: "Kids Activity 1" },
  { id: 2, imgSrc: kids2, alt: "Kids Activity 2" },
  { id: 3, imgSrc: kids3, alt: "Kids Activity 3" },
  { id: 4, imgSrc: kids4, alt: "Kids Activity 4" },
  { id: 5, imgSrc: kids5, alt: "Kids Activity 5" },
  { id: 6, imgSrc: kids6, alt: "Kids Activity 6" },
  { id: 7, imgSrc: kids7, alt: "Kids Activity 7" },
  { id: 8, imgSrc: kids8, alt: "Kids Activity 8" },
];

const AboutKidsSchool = () => {
  return (
    <section className="social-section">
      {/* ================= Header ================= */}
      <div className="social-header">
        <div className="doodle doodle-left">
          <img src={kidsLeftDoodle} alt="Kids Left" />
        </div>

        <div className="header-content">
          <div className="sub-title">
            <span className="grad-cap-icon">🎓</span>
            OUR SOCIAL CIRCLE
          </div>

          <h2 className="main-title">@Kidscool</h2>

          <p className="description">
            Leo In Vitae Turpis Massa Sed. A Lacus Vestibulum Sed Arcu Non.
            Consectetur Purus Ut Faucibus Pulvinar. Mauris Vitae Ultricies Leo
            Integer Malesuada Nunc Vel Risus Commodo.
          </p>
        </div>

        <div className="doodle doodle-right">
          <img src={kidsRightDoodle} alt="Kids Right" />
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
            />

            {/* Hover Overlay */}
            <div className="hover-overlay">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="instagram-btn"
                aria-label="Instagram"
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
import React from "react";
import "./Contacts.css";

import crayonIcon from "../../assets/ico-01.png";
import paperPlaneIcon from "../../assets/ico-02.png";
import rockingHorseIcon from "../../assets/ico-03.png";
import beeImg from "../../assets/Animal-11.png";
import grassImg from "../../assets/grass.png";

const contactCards = [
  {
    id: 1,
    icon: crayonIcon,
    title: "Admissions & Enquiries",
    description:
      "Have questions about admission, classes, programs or your child's first school experience? Our team is happy to help.",
    link: "tel:+919438013349",
    value: "+91 9438013349",
    type: "phone",
  },
  {
    id: 2,
    icon: paperPlaneIcon,
    title: "School Information",
    description:
      "Ask us about activities, daily routines, school timings, transport and other information that parents may need before admission.",
    link: "tel:+919438013349",
    value: "+91 9438013349",
    type: "phone",
  },
  {
    id: 3,
    icon: rockingHorseIcon,
    title: "Visit Nanda Kidz",
    description:
      "Planning a school visit? Contact us for directions and to learn more about the learning environment at Nanda Kidz – The Little Kingdom.",
    link: "https://www.google.com/maps/search/?api=1&query=Nanda+Kidz+Kalinga+Vihar+Kalinganagar+Bhubaneswar+Odisha+751028",
    value: "Get Directions",
    type: "location",
  },
];

const nearbyAreas = [
  "Khandagiri",
  "Patrapada",
  "Ghatikia",
  "Kalinga Vihar",
];

const Contacts = () => {
  return (
    <section
      className="contacts-wrapper"
      aria-labelledby="contacts-main-title"
    >
      {/* Decorative illustrations */}
      <img
        src={beeImg}
        alt=""
        aria-hidden="true"
        className="decor-bee"
      />

      <img
        src={grassImg}
        alt=""
        aria-hidden="true"
        className="decor-grass"
      />

      <div className="contacts-container">

        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="contacts-header">
          <span className="contacts-label">
            Contact Nanda Kidz
          </span>

          <h1 id="contacts-main-title">
            play school near khandagiri, bhubaneswar
          </h1>

          <p className="contacts-intro">
            Looking for a caring and engaging school environment for
            your little one? Nanda Kidz – The Little Kingdom is here
            to help parents with admission questions, school
            information, programs, activities and visit arrangements.
          </p>
        </div>

        {/* =====================================================
            CONTACT CARDS
        ====================================================== */}
        <div className="contacts-grid">
          {contactCards.map((card) => (
            <article
              key={card.id}
              className="contact-card"
            >
              <div className="contact-icon-wrapper">
                <img
                  src={card.icon}
                  alt=""
                  aria-hidden="true"
                  className="contact-icon"
                />
              </div>

              <h2 className="contact-title">
                {card.title}
              </h2>

              <p className="contact-description">
                {card.description}
              </p>

              <a
                href={card.link}
                className={`contact-action ${
                  card.type === "location"
                    ? "contact-location-action"
                    : ""
                }`}
                target={
                  card.type === "location"
                    ? "_blank"
                    : undefined
                }
                rel={
                  card.type === "location"
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                {card.value}
              </a>
            </article>
          ))}
        </div>

        {/* =====================================================
            LOCATION & NEIGHBORHOOD REACH
        ====================================================== */}
        <div className="contacts-location-section">

          <div className="contacts-location-content">
            <span className="contacts-location-label">
              School Location & Neighborhood Reach
            </span>

            <h2>
              Easy to reach from nearby Bhubaneswar neighborhoods
            </h2>

            <p>
              Nanda Kidz is located at Kalinga Vihar, Kalinganagar,
              Bhubaneswar. Families looking for a
              <strong>
                {" "}play school near khandagiri, bhubaneswar
              </strong>
              or a
              <strong>
                {" "}best play school in Kalinganagar
              </strong>
              can contact us for directions and school visit
              information.
            </p>

            <div className="contacts-address">
              <span>School Address</span>

              <strong>
                K-5, HIG-424, Kalinga Vihar LIG,
                Kalinganagar, Bhubaneswar,
                Odisha 751028
              </strong>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Nanda+Kidz+Kalinga+Vihar+Kalinganagar+Bhubaneswar+Odisha+751028"
              target="_blank"
              rel="noopener noreferrer"
              className="contacts-map-button"
            >
              Open School Location
              <span>→</span>
            </a>
          </div>

          <div className="contacts-neighborhood-card">
            <span className="contacts-neighborhood-small">
              Nearby areas
            </span>

            <h3>
              Find your route to Nanda Kidz
            </h3>

            <p>
              Interactive map directions are available for families
              travelling from these nearby areas:
            </p>

            <div className="contacts-area-list">
              {nearbyAreas.map((area) => (
                <a
                  key={area}
                  href={`https://www.google.com/maps/dir/?api=1&destination=Nanda+Kidz+Kalinga+Vihar+Kalinganagar+Bhubaneswar+Odisha+751028&origin=${encodeURIComponent(
                    area + ", Bhubaneswar, Odisha"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contacts-area"
                >
                  <span>{area}</span>
                  <b>↗</b>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* =====================================================
            EXTRA PARENT MESSAGE
        ====================================================== */}
        <div className="contacts-parent-note">
          <span>
            Nanda Kidz – The Little Kingdom
          </span>

          <p>
            We believe choosing a preschool should feel comfortable
            and informed. Parents are welcome to contact the school
            to ask questions or plan a visit before making an
            admission decision.
          </p>
        </div>

      </div>

      {/* Bottom wave */}
      <div className="wave-divider">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="wave-svg"
          aria-hidden="true"
        >
          <path
            d="M0,0 C150,90 350,-40 500,50 C650,140 900,-20 1200,40 L1200,120 L0,120 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
};

export default Contacts;
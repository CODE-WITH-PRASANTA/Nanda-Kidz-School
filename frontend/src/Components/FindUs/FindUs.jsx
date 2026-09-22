import React, { useState } from "react";
import "./FindUs.css";

const FindUs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const accordionData = [
    {
      title: "Our School Location",
      content:
        "Nanda Kidz – The Little Kingdom is located at K-5, HIG-424, Kalinga Vihar, Kalinganagar, Bhubaneswar, Odisha 751028. Families can contact us for directions or to plan a school visit.",
    },
    {
      title: "Nearby Neighborhoods",
      content:
        "Our location is convenient for families travelling from Khandagiri, Patrapada, Ghatikia and Kalinga Vihar. Parents can use the map below to check the route from their area.",
    },
    {
      title: "Admissions & Enquiries",
      content:
        "For information about admissions, classes, activities, school routines and other parent questions, please contact Nanda Kidz directly. Our team will help you understand the available options for your child.",
    },
  ];

  const nearbyAreas = [
    {
      name: "Khandagiri",
      icon: "🌈",
    },
    {
      name: "Patrapada",
      icon: "🚌",
    },
    {
      name: "Ghatikia",
      icon: "🌱",
    },
    {
      name: "Kalinga Vihar",
      icon: "🏫",
    },
  ];

  const toggleAccordion = (index) => {
    setOpenIndex((current) =>
      current === index ? null : index
    );
  };

  const openDirections = (origin = "") => {
    const destination =
      "Nanda Kidz, K-5, HIG-424, Kalinga Vihar, Kalinganagar, Bhubaneswar, Odisha 751028";

    const url = origin
      ? `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
          origin
        )}&destination=${encodeURIComponent(destination)}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          destination
        )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      className="findus-wrapper"
      aria-labelledby="findus-main-title"
    >
      {/* =====================================================
          DECORATIVE SVG
      ====================================================== */}

      <div className="findus-decoration findus-decoration-top">
        <svg
          viewBox="0 0 180 150"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M30 80C45 35 80 20 120 37C155 52 165 85 140 111C114 137 66 130 42 111C25 98 22 92 30 80Z"
            fill="#F8D77A"
          />

          <circle
            cx="126"
            cy="42"
            r="12"
            fill="#17835F"
            opacity="0.15"
          />

          <circle
            cx="36"
            cy="105"
            r="8"
            fill="#E77555"
            opacity="0.18"
          />
        </svg>
      </div>

      <div className="findus-decoration findus-decoration-bottom">
        <svg
          viewBox="0 0 220 160"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M10 130C35 95 68 103 91 122C112 140 143 145 167 120C187 99 209 100 215 110V160H10Z"
            fill="#BEE6D6"
          />

          <path
            d="M65 122C62 92 71 70 91 56"
            fill="none"
            stroke="#17835F"
            strokeWidth="6"
            strokeLinecap="round"
          />

          <path
            d="M91 56C104 67 109 79 105 93"
            fill="none"
            stroke="#17835F"
            strokeWidth="6"
            strokeLinecap="round"
          />

          <circle
            cx="83"
            cy="45"
            r="14"
            fill="#F4BF54"
          />
        </svg>
      </div>

      <div className="findus-container">

        {/* =====================================================
            LEFT CONTENT
        ====================================================== */}

        <div className="findus-content">

          <span className="findus-subtitle">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 21C12 21 19 15.5 19 9.5C19 5.91 15.87 3 12 3C8.13 3 5 5.91 5 9.5C5 15.5 12 21 12 21Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <circle
                cx="12"
                cy="9.5"
                r="2.7"
                stroke="currentColor"
                strokeWidth="1.8"
              />
            </svg>

            FIND NANDA KIDZ
          </span>

          <h1
            id="findus-main-title"
            className="findus-title"
          >
            Nanda Kidz Best play school in Bhubaneswar
          </h1>

          <p className="findus-description">
            Visit Nanda Kidz – The Little Kingdom at Kalinga Vihar,
            Kalinganagar, Bhubaneswar. We welcome parents who would
            like to know more about our school, learning environment,
            activities and admission options.
          </p>

          {/* ===================================================
              MINI HIGHLIGHTS
          ==================================================== */}

          <div className="findus-mini-highlights">

            <div className="findus-mini-item">
              <span className="findus-mini-icon green">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 21C12 21 19 15.5 19 9.5C19 5.91 15.87 3 12 3C8.13 3 5 5.91 5 9.5C5 15.5 12 21 12 21Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle
                    cx="12"
                    cy="9.5"
                    r="2.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>
              </span>

              <div>
                <strong>Kalinga Vihar</strong>
                <span>Kalinganagar, Bhubaneswar</span>
              </div>
            </div>

            <div className="findus-mini-item">
              <span className="findus-mini-icon yellow">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 4H19V20H5V4Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 8H16"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 12H16"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>

              <div>
                <strong>Parent Enquiries</strong>
                <span>Admissions & school information</span>
              </div>
            </div>

          </div>

          {/* ===================================================
              ACCORDION
          ==================================================== */}

          <div className="accordion-section">
            {accordionData.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={item.title}
                  className={`accordion-item ${
                    isOpen ? "open" : ""
                  }`}
                >
                  <button
                    type="button"
                    className={`accordion-header ${
                      isOpen ? "active" : ""
                    }`}
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isOpen}
                    aria-controls={`findus-answer-${index}`}
                  >
                    <span
                      className={`accordion-icon ${
                        isOpen ? "open" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9 18L15 12L9 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>

                    <span className="accordion-title-text">
                      {item.title}
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={`findus-answer-${index}`}
                      className="accordion-body"
                    >
                      <p>{item.content}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ===================================================
              ADDRESS
          ==================================================== */}

          <div className="findus-address">
            <span className="findus-address-label">
              School Address
            </span>

            <div className="findus-address-row">
              <span className="findus-address-pin">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 21C12 21 19 15.5 19 9.5C19 5.91 15.87 3 12 3C8.13 3 5 5.91 5 9.5C5 15.5 12 21 12 21Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle
                    cx="12"
                    cy="9.5"
                    r="2.6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>
              </span>

              <p>
                K-5, HIG-424, Kalinga Vihar,
                Kalinganagar, Bhubaneswar,
                Odisha 751028
              </p>
            </div>
          </div>

          {/* ===================================================
              ACTIONS
          ==================================================== */}

          <div className="findus-actions">

            <button
              type="button"
              className="view-prices-btn"
              onClick={() => openDirections()}
            >
              <span>GET DIRECTIONS</span>
              <span className="button-arrow">→</span>
            </button>

            <a
              href="tel:+919438013349"
              className="call-us-btn"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6.5 3.5L9 3L11 8L8 9.5C9.3 12.4 11.6 14.7 14.5 16L16 13L21 15V17.5C21 19.16 19.66 20.5 18 20.5C9.99 20.5 3.5 14.01 3.5 6C3.5 4.62 4.62 3.5 6 3.5H6.5Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
              </svg>

              CALL +91 9438013349
            </a>

          </div>

          {/* ===================================================
              NEIGHBORHOOD ROUTES
          ==================================================== */}

          <div className="findus-routes">

            <div className="routes-heading">
              <span className="routes-label">
                Nearby Areas
              </span>

              <span className="routes-hint">
                Get directions
              </span>
            </div>

            <div className="routes-list">
              {nearbyAreas.map((area) => (
                <button
                  key={area.name}
                  type="button"
                  onClick={() =>
                    openDirections(
                      `${area.name}, Bhubaneswar, Odisha`
                    )
                  }
                >
                  <span className="route-icon">
                    {area.icon}
                  </span>

                  <span>{area.name}</span>

                  <b>↗</b>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* =====================================================
            RIGHT MAP
        ====================================================== */}

        <div className="findus-map-side">

          <div className="findus-map-heading">
            <div>
              <span>VISIT OUR SCHOOL</span>
              <strong>Find us in Kalinga Vihar</strong>
            </div>

            <span className="map-heading-badge">
              Bhubaneswar
            </span>
          </div>

          <div className="findus-map-container">

            {/* Decorative map pin */}
            <div className="map-floating-pin">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 21C12 21 19 15.5 19 9.5C19 5.91 15.87 3 12 3C8.13 3 5 5.91 5 9.5C5 15.5 12 21 12 21Z"
                  fill="#17835F"
                />
                <circle
                  cx="12"
                  cy="9.5"
                  r="2.5"
                  fill="#ffffff"
                />
              </svg>
            </div>

            <iframe
              title="Nanda Kidz location in Kalinga Vihar, Bhubaneswar"
              src="https://www.google.com/maps?q=Nanda%20Kidz%2C%20K-5%2C%20HIG-424%2C%20Kalinga%20Vihar%2C%20Kalinganagar%2C%20Bhubaneswar%2C%20Odisha%20751028&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="google-map-iframe"
            />

          </div>

          {/* Map footer card */}
          <div className="map-caption">

            <div className="map-caption-info">
              <span>School Location</span>

              <strong>
                K-5, HIG-424, Kalinga Vihar
              </strong>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Nanda+Kidz+Kalinga+Vihar+Kalinganagar+Bhubaneswar+Odisha+751028"
              target="_blank"
              rel="noopener noreferrer"
              className="map-link"
            >
              <span>Open in Maps</span>
              <b>→</b>
            </a>

          </div>
        </div>
      </div>
    </section>
  );
};

export default FindUs;
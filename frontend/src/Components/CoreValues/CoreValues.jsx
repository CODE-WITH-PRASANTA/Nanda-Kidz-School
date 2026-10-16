import React from "react";
import "./CoreValues.css";

// Import images
import mainImg from "../../assets/Beautymam.webp";
import shapeRight from "../../assets/value-shape-3 (3).png";
import shapeSun from "../../assets/value-shape-1.png";
import shapePencil from "../../assets/value-shape-2.png";

const CoreValues = () => {
  const highlightsData = [
    {
      id: "01",
      title: "Autism & Child Development",
      description:
        "Her specialized expertise ensures that every child, whether neurotypical or with special needs, receives attentive, individualized psychological and developmental care.",
      colorClass: "core-values__number--blue",
      tag: "Specialized Care",
    },
    {
      id: "02",
      title: "20+ Years in Social Work",
      description:
        "Rooted in decades of dedication to social work and women's studies, creating a compassionate, secure, and nurturing second home for children and mothers alike.",
      colorClass: "core-values__number--yellow",
      tag: "Safe & Nurturing",
    },
    {
      id: "03",
      title: "Understanding Over Teaching",
      description:
        "Guided by the core philosophy: 'We don't teach children, we understand them.' Our holistic curriculum respects every child's unique emotional and learning pace.",
      colorClass: "core-values__number--pink",
      tag: "Child Psychology",
    },
  ];

  return (
    <section className="core-values">
      {/* Decorative Floating Shapes */}
      <img
        src={shapeSun}
        alt=""
        aria-hidden="true"
        className="core-values__shape core-values__shape--top-left"
      />

      <img
        src={shapePencil}
        alt=""
        aria-hidden="true"
        className="core-values__shape core-values__shape--bottom-left"
      />

      <img
        src={shapeRight}
        alt=""
        aria-hidden="true"
        className="core-values__shape core-values__shape--right"
      />

      <div className="core-values__container">
        {/* -------------------------------------------------
            LEFT: FOUNDER IMAGE & PROFILE CARD
        ------------------------------------------------- */}
        <div className="core-values__image-wrapper">
          <div className="core-values__image-backdrop"></div>

          <div className="core-values__main-image-frame">
            <img
              src={mainImg}
              alt="Dr. Achman Nanda - Founder and Child Psychologist at Nanda Kidz"
              className="core-values__main-image"
            />
          </div>

          <div className="core-values__experience-card">
            <span className="exp-star">👑</span>
            <div>
              <strong>Dr. Achman Nanda</strong>
              <small>Founder | Child Psychologist | Visionary</small>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------
            RIGHT: EDITORIAL & VISION CONTENT
        ------------------------------------------------- */}
        <div className="core-values__content">
          <div className="core-values__badge">
            <span className="core-values__subtitle">
              A Play School Since 2011
            </span>
          </div>

          <h1 className="core-values__title">
            The Brain Behind{" "}
            <span className="text-highlight">
              Nanda Kidz – The Little Kingdom
            </span>
          </h1>

          <p className="core-values__intro-text">
            <strong>Nanda Kidz – The Little Kingdom</strong> is not just a play
            school. It is a mother's vision, a psychologist's mission, and an
            academician's lifelong dream brought to life by{" "}
            <strong>Dr. Achman Nanda</strong>. Holding a{" "}
            <strong>Ph.D. in Child Psychology</strong> with over{" "}
            <strong>35 years of experience since 1991</strong>, she has
            dedicated her career to one guiding truth:{" "}
            <em>"Every child deserves to be understood."</em>
          </p>

          <p className="core-values__intro-text core-values__intro-text--second">
            After leading the prestigious <strong>Bachpan Group of Schools, New Delhi</strong> as Director,
            she returned to her roots to build a sanctuary where learning feels
            like play, school feels like a kingdom, and children thrive under
            psychologist-guided care.
          </p>

          {/* -------------------------------------------------
              KEY HIGHLIGHTS / PILLARS
          ------------------------------------------------- */}
          <div className="core-values__list">
            {highlightsData.map((item) => (
              <div key={item.id} className="core-values__item">
                <div className={`core-values__number ${item.colorClass}`}>
                  {item.id}
                </div>

                <div className="core-values__item-text">
                  <div className="core-values__header-row">
                    <h2 className="core-values__item-title">{item.title}</h2>
                    <span className="core-values__pill-tag">{item.tag}</span>
                  </div>

                  <p className="core-values__item-description">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Callout / Motto */}
          <div className="core-values__closing-note">
            <span>✨</span>
            <p>
              Single-handedly guiding academics, counseling, and social
              initiatives — <strong>Welcome to her Kingdom, where your child is the royalty.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
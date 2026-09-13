import React from "react";
import "./CoreValues.css";

// Import images
import mainImg from "../../assets/value-1.png";
import shapeRight from "../../assets/value-shape-3 (3).png";
import shapeSun from "../../assets/value-shape-1.png";
import shapePencil from "../../assets/value-shape-2.png";

const CoreValues = () => {
  const valuesData = [
    {
      id: "01",
      title: "Learning Through Play",
      description:
        "Children learn naturally when they can explore, experiment, ask questions, and enjoy what they are doing. Our activities encourage curiosity, creativity, communication, and independent thinking.",
      colorClass: "core-values__number--blue",
      tag: "Happy Learning",
    },
    {
      id: "02",
      title: "Safe & Caring Environment",
      description:
        "Every child deserves to feel comfortable and cared for. We create a clean, welcoming space where children can learn confidently with the guidance and attention of caring educators.",
      colorClass: "core-values__number--yellow",
      tag: "Child First",
    },
    {
      id: "03",
      title: "Growing With Confidence",
      description:
        "From classroom activities to creative play, children get opportunities to express themselves, work with others, solve little problems, and build confidence at their own pace.",
      colorClass: "core-values__number--pink",
      tag: "Overall Growth",
    },
  ];

  return (
    <section className="core-values">
      {/* Decorative Shapes */}
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
            LEFT IMAGE
        ------------------------------------------------- */}
        <div className="core-values__image-wrapper">
          <div className="core-values__image-backdrop"></div>

          <img
            src={mainImg}
            alt="Children learning and playing at Nanda Kidz"
            className="core-values__main-image"
          />

          <div className="core-values__experience-card">
            <span className="exp-star">⭐</span>

            <div>
              <strong>Nanda Kidz</strong>
              <small>Play School • LKG • UKG</small>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------
            RIGHT CONTENT
        ------------------------------------------------- */}
        <div className="core-values__content">
          <div className="core-values__badge">
            <span className="core-values__subtitle">
              Why Parents Choose Nanda Kidz
            </span>
          </div>

          <h1 className="core-values__title">
            Play School Near Khandagiri, Bhubaneswar{" "}
            <span className="text-highlight">
              Where Little Minds Grow
            </span>
          </h1>

          <p className="core-values__intro-text">
            Looking for a{" "}
            <strong>play school near Khandagiri, Bhubaneswar</strong>{" "}
            where your child can enjoy learning from the very beginning?
            Nanda Kidz creates a friendly and engaging environment where
            children can learn through play, stories, activities, music,
            creativity, and everyday experiences.
          </p>

          <p className="core-values__intro-text core-values__intro-text--second">
            We focus on the little things that matter during the early
            years — helping children become comfortable in a classroom,
            make friends, communicate freely, and discover the joy of
            learning. This is what makes Nanda Kidz a trusted choice for
            parents searching for the{" "}
            <strong>best play school in Bhubaneswar</strong>.
          </p>

          {/* -------------------------------------------------
              CORE VALUES
          ------------------------------------------------- */}
          <div className="core-values__list">
            {valuesData.map((item) => (
              <div
                key={item.id}
                className="core-values__item"
              >
                <div
                  className={`core-values__number ${item.colorClass}`}
                >
                  {item.id}
                </div>

                <div className="core-values__item-text">
                  <div className="core-values__header-row">
                    <h2 className="core-values__item-title">
                      {item.title}
                    </h2>

                    <span className="core-values__pill-tag">
                      {item.tag}
                    </span>
                  </div>

                  <p className="core-values__item-description">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Small closing message */}
          <div className="core-values__closing-note">
            <span>🌱</span>
            <p>
              A gentle beginning today can build a confident tomorrow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
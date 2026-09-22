import React, { useState } from "react";
import "./Homecoursecategory.css";

// Import local image assets
import artImg from "../../assets/art.webp";
import musicImg from "../../assets/music.webp";
import languageImg from "../../assets/language.webp";
import indoorImg from "../../assets/indoor.webp";
import danceImg from "../../assets/dance.webp";
import cookingImg from "../../assets/cooking.webp";

const Homecoursecategory = () => {
  const allCategories = [
    {
      id: 1,
      name: "Art & Creativity",
      image: artImg,
      frameType: "shape-1",
    },
    {
      id: 2,
      name: "Music & Rhythm",
      image: musicImg,
      frameType: "shape-2",
    },
    {
      id: 3,
      name: "Language Learning",
      image: languageImg,
      frameType: "shape-3",
    },
    {
      id: 4,
      name: "Indoor Activities",
      image: indoorImg,
      frameType: "shape-4",
    },
    {
      id: 5,
      name: "Dance & Movement",
      image: danceImg,
      frameType: "shape-1",
    },
    {
      id: 6,
      name: "Fun Cooking",
      image: cookingImg,
      frameType: "shape-2",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);

  const maxIndex = allCategories.length - 4;

  const handleNext = () => {
    setStartIndex((prev) =>
      prev >= maxIndex ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setStartIndex((prev) =>
      prev <= 0 ? maxIndex : prev - 1
    );
  };

  const visibleCategories = allCategories.slice(
    startIndex,
    startIndex + 4
  );

  return (
    <section
      className="course-cat-section"
      aria-labelledby="course-category-title"
    >
      {/* Decorative Stars */}
      <svg
        className="decor-star star-left"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z" />
      </svg>

      <svg
        className="decor-star star-right"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z" />
      </svg>

      {/* Section Heading */}
      <span className="subtitle">
        Learning Through Fun
      </span>

      <h1
        id="course-category-title"
        className="title"
      >
        School in Bhubaneswar Where Children Learn, Play & Grow
      </h1>

      <p className="course-category-intro">
        At Nanda Kidz, learning is not limited to books and
        classrooms. Children get opportunities to explore art,
        music, language, movement, indoor games, and creative
        activities in a happy and friendly environment.
      </p>

      {/* Categories Slider */}
      <div className="carousel-wrapper">

        {/* Previous Button */}
        <button
          type="button"
          className="slider-arrow arrow-left"
          onClick={handlePrev}
          aria-label="Show previous activities"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
          </svg>
        </button>

        {/* Categories */}
        <div className="categories-container">
          {visibleCategories.map((item) => (
            <article
              key={item.id}
              className={`card-column theme-${item.frameType}`}
            >
              <div
                className={`shape-frame ${item.frameType}`}
                aria-hidden="true"
              >
                <div className="inner-img-wrapper">
                  <img
                    src={item.image}
                    alt=""
                    className="counter-rotating-img"
                  />
                </div>
              </div>

              <h2 className="label-text">
                {item.name}
              </h2>
            </article>
          ))}
        </div>

        {/* Next Button */}
        <button
          type="button"
          className="slider-arrow arrow-right"
          onClick={handleNext}
          aria-label="Show more activities"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
          </svg>
        </button>
      </div>

      {/* Supporting Content */}
      <div className="course-category-bottom">
        <span className="bottom-line"></span>

        <p>
          Every activity is planned to give children a chance
          to discover their interests, express themselves, and
          enjoy learning with their friends. Our goal is to make
          the early school years comfortable, active, and full
          of happy memories.
        </p>
      </div>
    </section>
  );
};

export default Homecoursecategory;
import React, { useEffect, useState, useRef } from "react";
import "./HeroSection.css";

// Background
import bgImage from "../../assets/bg-1.jpg";

// Children images
import child1 from "../../assets/c-1.webp";
import child2 from "../../assets/c-2.webp";
import child3 from "../../assets/c-3.webp";
import child4 from "../../assets/c-4.webp";
import child5 from "../../assets/c-5.webp";
import child6 from "../../assets/c-6.webp";
import child7 from "../../assets/c-7.webp";
import child8 from "../../assets/c-8.webp";
import child9 from "../../assets/c-9.webp";

// Decorative assets
import giraffeAsset from "../../assets/jeeraf.png";
import flowerBlue from "../../assets/flower.png";

const LEFT_COLUMN_IMAGES = [
  {
    src: child7,
    alt: "Children enjoying time together at Nanda Kidz",
    heightClass: "img-child7",
  },
  {
    src: child1,
    alt: "Children learning in the classroom",
    heightClass: "img-child1",
  },
  {
    src: child3,
    alt: "Child enjoying a creative drawing activity",
    heightClass: "img-child3",
  },
  {
    src: child9,
    alt: "Girl enjoying bubbles and outdoor play",
    heightClass: "img-child9",
  },
];

const RIGHT_COLUMN_IMAGES = [
  {
    src: child8,
    alt: "Children learning with a tablet",
    heightClass: "img-child8",
  },
  {
    src: child2,
    alt: "Girl enjoying a musical activity",
    heightClass: "img-child2",
  },
  {
    src: child5,
    alt: "Happy child at Nanda Kidz",
    heightClass: "img-child5",
  },
  {
    src: child6,
    alt: "Children enjoying music and creative activities",
    heightClass: "img-child6",
  },
];

const HeroSection = () => {
  const scrollTarget = useRef(0);
  const scrollCurrent = useRef(0);
  const cardRefs = useRef([]);

  const [animatedY, setAnimatedY] = useState(0);
  const [activeModalImage, setActiveModalImage] = useState(null);
  const [revealedCards, setRevealedCards] = useState({});

  /* -------------------------------------------------------
     Smooth Parallax Scroll
  ------------------------------------------------------- */
  useEffect(() => {
    const handleScroll = () => {
      scrollTarget.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    let animationFrameId;

    const renderLoop = () => {
      scrollCurrent.current +=
        (scrollTarget.current - scrollCurrent.current) * 0.08;

      setAnimatedY(scrollCurrent.current);

      animationFrameId = window.requestAnimationFrame(renderLoop);
    };

    animationFrameId = window.requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  /* -------------------------------------------------------
     Card Scroll Reveal
  ------------------------------------------------------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = Number(entry.target.dataset.cardIndex);

          setRevealedCards((prev) => {
            if (prev[index]) return prev;

            return {
              ...prev,
              [index]: true,
            };
          });

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    cardRefs.current.forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  /* -------------------------------------------------------
     Parallax Values
  ------------------------------------------------------- */
  const imageGridScrollOffset = animatedY * 0.45;
  const backgroundScrollOffset = animatedY * 0.25;

  /* -------------------------------------------------------
     Modal
  ------------------------------------------------------- */
  const handleCardClick = (imgSrc, altText) => {
    setActiveModalImage({
      src: imgSrc,
      alt: altText,
    });
  };

  const closeModal = () => {
    setActiveModalImage(null);
  };

  /* Close modal with Escape key */
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (activeModalImage) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [activeModalImage]);

  const setCardRef = (index) => (element) => {
    cardRefs.current[index] = element;
  };

  /* -------------------------------------------------------
     Reusable Image Card
  ------------------------------------------------------- */
  const renderCard = (item, index, extraClass = "") => (
    <div
      key={`${item.alt}-${index}`}
      ref={setCardRef(index)}
      data-card-index={index}
      className={`HeroSection-card ${item.heightClass} ${extraClass} ${
        revealedCards[index] ? "is-revealed" : ""
      }`}
      style={{
        "--reveal-delay": `${index * 80}ms`,
      }}
      onClick={() => handleCardClick(item.src, item.alt)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          handleCardClick(item.src, item.alt);
        }
      }}
      aria-label={`View ${item.alt}`}
    >
      <img src={item.src} alt={item.alt} />

      <div className="HeroSection-eyeOverlay">
        <div className="cartoon-eye-icon">👀</div>
        <span>Take a closer look</span>
      </div>
    </div>
  );

  return (
    <section
      className="HeroSection"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPositionY: `${backgroundScrollOffset}px`,
      }}
    >
      {/* ---------------------------------------------------
          Decorative Elements
      --------------------------------------------------- */}
      <img
        src={giraffeAsset}
        className="HeroSection-giraffe"
        alt=""
        aria-hidden="true"
      />

      <img
        src={flowerBlue}
        className="HeroSection-flower"
        style={{
          transform: `translateY(${imageGridScrollOffset * 0.8}px)`,
        }}
        alt=""
        aria-hidden="true"
      />

      {/* ---------------------------------------------------
          Main Hero Layout
      --------------------------------------------------- */}
      <div
        className="HeroSection-gridWrapper"
        style={{
          transform: `translateY(${imageGridScrollOffset}px)`,
        }}
      >
        {/* LEFT IMAGE COLUMN */}
        <div className="HeroSection-col LeftCol">
          {LEFT_COLUMN_IMAGES.map((item, index) =>
            renderCard(
              item,
              index,
              index === 0 ? "rounded-tr-lg" : ""
            )
          )}
        </div>

        {/* CENTER CONTENT */}
        <div className="HeroSection-centerContent">
          <div className="HeroSection-textBlock">
            <span className="HeroSection-subtitle">
              Nanda Kidz • The Little Kingdom
            </span>

            <h1 className="HeroSection-title MainTitle">
              Welcome to Nanda Kidz:
              <br />
              <span className="HeroSection-titleGreen">
                The Little Kingdom
              </span>
            </h1>

            <p className="HeroSection-description">
              A cheerful place where little minds can learn, play,
              discover new things, and grow with confidence. At Nanda
              Kidz, every day is filled with simple joys, creative
              activities, friendly faces, and meaningful early
              learning experiences.
            </p>

            <p className="HeroSection-description secondary">
              We believe childhood should be full of curiosity,
              imagination, laughter, and opportunities to explore.
              Our little kingdom is created to give children a
              comfortable beginning to their learning journey.
            </p>

            <div className="HeroSection-highlights">
              <span>🌱 Learn</span>
              <span>🎨 Create</span>
              <span>🧸 Play</span>
              <span>💛 Grow</span>
            </div>
          </div>

          {/* CENTER IMAGE */}
          {renderCard(
            {
              src: child4,
              alt: "Girl enjoying a playful learning activity at Nanda Kidz",
              heightClass: "img-child4",
            },
            LEFT_COLUMN_IMAGES.length
          )}
        </div>

        {/* RIGHT IMAGE COLUMN */}
        <div className="HeroSection-col RightCol">
          {RIGHT_COLUMN_IMAGES.map((item, index) =>
            renderCard(
              item,
              LEFT_COLUMN_IMAGES.length + 1 + index
            )
          )}
        </div>
      </div>

      {/* ---------------------------------------------------
          Image Preview Modal
      --------------------------------------------------- */}
      {activeModalImage && (
        <div
          className="HeroSection-modalBackdrop"
          onClick={closeModal}
          role="presentation"
        >
          <div
            className="HeroSection-modalContainer animate-popIn"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="HeroSection-modalCloseBtn"
              onClick={closeModal}
              aria-label="Close image preview"
            >
              &times;
            </button>

            <div className="HeroSection-modalFrame">
              <div className="cartoon-preview-badge">
                ✨ Magic View ✨
              </div>

              <img
                src={activeModalImage.src}
                alt={activeModalImage.alt}
                className="HeroSection-modalImage"
              />

              <div className="cartoon-eye-decoration left-eye">
                <div className="eyeball">
                  <div className="pupil"></div>
                </div>
              </div>

              <div className="cartoon-eye-decoration right-eye">
                <div className="eyeball">
                  <div className="pupil"></div>
                </div>
              </div>
            </div>

            <p className="HeroSection-modalCaption">
              {activeModalImage.alt}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
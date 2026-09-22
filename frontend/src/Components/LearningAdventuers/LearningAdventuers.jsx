import React from "react";
import "./LearningAdventuers.css";

import kids1Img from "../../assets/c-1.webp";
import bubbleGirlImg from "../../assets/c-5.webp";
import musicGirlImg from "../../assets/c-3.webp";
import giraffeImg from "../../assets/jeeraf.png";

const activityModules = [
  {
    title: "Karate",
    text: "Simple age-appropriate movements help children build confidence, balance and body awareness in a fun setting.",
  },
  {
    title: "Yoga",
    text: "Gentle yoga activities introduce children to movement, breathing, focus and calm moments during the day.",
  },
  {
    title: "Craft",
    text: "Hands-on craft sessions let little learners explore colours, textures and their own creative ideas.",
  },
  {
    title: "Storytelling",
    text: "Stories help children listen, imagine, communicate and discover new ideas through characters and playful conversations.",
  },
  {
    title: "Dance",
    text: "Music and movement give children a joyful way to express themselves while developing rhythm and coordination.",
  },
];

const LearningAdventuers = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="adventures-wrapper"
      aria-labelledby="adventures-main-title"
    >
      <div className="adventures-container">

        {/* =====================================================
            SECTION INTRO
        ====================================================== */}
        <div className="adventures-heading">
          <span className="adventures-label">
            Little Learners · Big Discoveries
          </span>

          <h1
            id="adventures-main-title"
            className="adventures-main-title"
          >
            best play school for kids in bhubaneswar
          </h1>

          <p className="adventures-intro">
            At Nanda Kidz, children learn through joyful experiences,
            movement, creativity and stories. Our short-term activity
            modules are designed to give little learners new ways to
            explore their interests while building confidence and
            everyday skills.
          </p>
        </div>

        {/* =====================================================
            MAIN CARDS
        ====================================================== */}
        <div className="adventures-container-grid">

          {/* Left Card */}
          <article className="adventure-card side-card">
            <div className="image-blob-wrapper blue-blob">
              <img
                src={kids1Img}
                alt="Children enjoying a creative learning activity at Nanda Kidz"
                className="blob-image"
              />
            </div>

            <div className="card-content">
              <span
                className="decorative-icon spiral-icon"
                aria-hidden="true"
              >
                🌀
              </span>

              <span className="card-kicker">
                Calm & Confidence
              </span>

              <h2 className="card-title">
                Peaceful Learning Time
              </h2>

              <p className="card-description">
                Quiet moments, gentle activities and simple guided
                exercises give children time to settle, focus and
                enjoy learning at their own pace.
              </p>

              <button
                type="button"
                className="card-btn green-btn"
                onClick={scrollToTop}
              >
                KNOW MORE
              </button>
            </div>
          </article>

          {/* Center Card */}
          <article className="adventure-card center-card">
            <div className="center-image-container">
              <img
                src={bubbleGirlImg}
                alt="Children learning and playing together at Nanda Kidz"
                className="center-bg-image"
              />

              <div className="image-overlay">
                <span className="center-card-kicker">
                  Explore · Learn · Grow
                </span>

                <h2 className="center-card-title">
                  Learning Adventures
                </h2>

                <p>
                  Every activity is a chance to discover something new.
                </p>
              </div>
            </div>

            <img
              src={giraffeImg}
              alt=""
              aria-hidden="true"
              className="giraffe-illustration"
            />
          </article>

          {/* Right Card */}
          <article className="adventure-card side-card">
            <div className="image-blob-wrapper yellow-blob">
              <img
                src={musicGirlImg}
                alt="Child enjoying music and movement activities at Nanda Kidz"
                className="blob-image"
              />
            </div>

            <div className="card-content">
              <span
                className="decorative-icon flower-icon"
                aria-hidden="true"
              >
                🌼
              </span>

              <span className="card-kicker">
                Creative Enrichment
              </span>

              <h2 className="card-title">
                Path to Growth
              </h2>

              <p className="card-description">
                From music and movement to stories and hands-on
                creativity, children can try new experiences while
                developing confidence, curiosity and social skills.
              </p>

              <button
                type="button"
                className="card-btn red-btn"
                onClick={scrollToTop}
              >
                ASK US
              </button>
            </div>
          </article>
        </div>

        {/* =====================================================
            SHORT-TERM ACTIVITY MODULES
        ====================================================== */}
        <div className="adventures-modules">
          <div className="modules-heading">
            <span className="modules-label">
              Short-Term Activity Modules
            </span>

            <h2>
              Fun activities beyond the classroom
            </h2>

            <p>
              Children can explore different interests through
              simple, enjoyable modules covering karate, yoga, craft,
              storytelling and dance.
            </p>
          </div>

          <div className="modules-grid">
            {activityModules.map((module, index) => (
              <article
                className="module-card"
                key={module.title}
              >
                <div className="module-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3>{module.title}</h3>

                <p>{module.text}</p>
              </article>
            ))}
          </div>
        </div>

        {/* =====================================================
            BOTTOM CONTENT
        ====================================================== */}
        <div className="adventures-bottom">
          <div className="adventures-bottom-content">
            <span>
              A little more fun in every learning day
            </span>

            <h2>
              Discover, create and enjoy every new experience
            </h2>

            <p>
              We want children to feel excited about trying something
              new. These activities are planned to complement early
              learning with opportunities for movement, imagination,
              self-expression and social interaction.
            </p>
          </div>

          <button
            type="button"
            className="adventures-bottom-btn"
            onClick={scrollToTop}
          >
            CONTACT NANDA KIDZ
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LearningAdventuers;
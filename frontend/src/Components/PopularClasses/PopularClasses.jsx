
import React from "react";
import "./PopularClasses.css";

// Class card images
// Class card images - 4 separate images
import classImg1 from "../../assets/image4.webp";
import classImg2 from "../../assets/image5.webp";
import classImg3 from "../../assets/image6.webp";
import classImg4 from "../../assets/Image1.webp";

// Decorative dinosaur images
import dinoLeftImg from "../../assets/class-shape-1.webp";
import dinoRightImg from "../../assets/class-shape-2.webp";

const classesData = [
  {
    id: 1,
    title: "Play Group Discovery",
    image: classImg1,
    description:
      "A happy and welcoming first step for little learners, with playful activities that encourage sharing, communication, colours, movement, and everyday discovery.",
    age: "2 - 3 Years",
    time: "8:30 AM - 11:00 AM",
    seat: 40,
    tag: "Most Loved",
    icon: "🧸",
  },
  {
    id: 2,
    title: "Nursery Learning Program",
    image: classImg2,
    description:
      "An engaging early-learning program where children explore alphabets, numbers, rhymes, colours, stories, and creative activities in a joyful environment.",
    age: "3 - 4 Years",
    time: "8:00 AM - 11:30 AM",
    seat: 60,
    tag: "Little Explorers",
    icon: "🎨",
  },
  {
    id: 3,
    title: "LKG Foundation Program",
    image: classImg3,
    description:
      "A balanced foundation program introducing phonics, alphabets, numbers, rhymes, creative activities, and classroom routines in an enjoyable way.",
    age: "4 - 5 Years",
    time: "8:00 AM - 11:30 AM",
    seat: 50,
    tag: "Popular Choice",
    icon: "📚",
  },
  {
    id: 4,
    title: "UKG School Readiness",
    image: classImg4,
    description:
      "A kindergarten program that develops confidence through handwriting, basic mathematics, storytelling, science activities, and essential school-readiness skills.",
    age: "5 - 6 Years",
    time: "8:00 AM - 12:00 PM",
    seat: 40,
    tag: "Future Ready",
    icon: "🎓",
  },
];
const PopularClasses = () => {
  const handleJoinClass = (classId) => {
    window.location.href = `/class-details/${classId}`;
  };

  return (
    <section className="pc-section">
      {/* Decorative Dinosaur - Left */}
      <img
        src={dinoLeftImg}
        alt=""
        aria-hidden="true"
        className="pc-dino-bg pc-dino-left"
      />

      {/* Decorative Dinosaur - Right */}
      <img
        src={dinoRightImg}
        alt=""
        aria-hidden="true"
        className="pc-dino-bg pc-dino-right"
      />

      <div className="pc-container">
        {/* Header */}
        <div className="pc-header">
          <span className="pc-eyebrow">
            <span className="pc-eyebrow-dot" />
            Admissions Open
          </span>

          <span className="pc-subtitle">
            Nanda Kidz The Little Kingdom A Play School
          </span>

          <h1 className="pc-title">
            Best Play School in Bhubaneswar
          </h1>

          <p className="pc-intro">
            At Nanda Kidz, children get a joyful place to learn, play,
            explore, and grow. Our programs are thoughtfully designed
            for young learners, helping them develop confidence,
            creativity, communication, and essential early-learning skills.
          </p>

          <p className="pc-intro pc-intro-secondary">
            From Play Group and Nursery to LKG and UKG, we provide
            age-appropriate learning experiences in a welcoming
            environment for every little learner.
          </p>
        </div>

        {/* Four Class Cards */}
        <div className="pc-grid">
          {classesData.map((item) => (
            <article key={item.id} className="pc-card">
              {/* Card Image */}
              <div className="pc-image-wrapper">
                <img
                  src={item.image}
                  alt={`${item.title} at Nanda Kidz`}
                  className="pc-card-image"
                  loading="lazy"
                />

                <span className="pc-tag-badge">
                  {item.tag}
                </span>

                <span className="pc-class-icon" aria-hidden="true">
                  {item.icon}
                </span>
              </div>

              {/* Card Content */}
              <div className="pc-card-content">
                <h2 className="pc-card-title">
                  {item.title}
                </h2>

                <p className="pc-card-description">
                  {item.description}
                </p>

                {/* Age Group */}
                <div className="pc-age-strip">
                  <span className="pc-age-icon" aria-hidden="true">
                    👶
                  </span>

                  <div className="pc-age-content">
                    <span className="pc-info-label">
                      Suitable Age
                    </span>

                    <span className="pc-info-value">
                      {item.age}
                    </span>
                  </div>
                </div>

                {/* Timing and Seats */}
                <div className="pc-card-info">
                  <div className="pc-info-box pc-timing-box">
                    <span
                      className="pc-info-box-icon"
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 2" />
                      </svg>
                    </span>

                    <span className="pc-info-box-label">
                      Class Timing
                    </span>

                    <span className="pc-info-box-value">
                      {item.time}
                    </span>
                  </div>

                  <div className="pc-info-box pc-seats-box">
                    <span
                      className="pc-info-box-icon"
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="9" cy="7" r="3" />
                        <path d="M3.5 19v-2a5.5 5.5 0 0 1 11 0v2" />
                        <path d="M16 4.5a3 3 0 0 1 0 5.8" />
                        <path d="M17 13a5 5 0 0 1 3.5 4.8V19" />
                      </svg>
                    </span>

                    <span className="pc-info-box-label">
                      Seat Capacity
                    </span>

                    <span className="pc-seat-number">
                      {item.seat}
                      <small> seats</small>
                    </span>
                  </div>
                </div>

                {/* Enrollment Button */}
                <div className="pc-action-wrapper">
                  <button
                    type="button"
                    className="pc-btn-join"
                    onClick={() => handleJoinClass(item.id)}
                    aria-label={`Enroll in ${item.title}`}
                  >
                    <span>Enroll Now</span>
                    <span className="pc-btn-sparkle" aria-hidden="true">
                      ✨
                    </span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Content */}
        <div className="pc-bottom-content">
          <h2>A Happy Beginning for Every Child</h2>

          <p>
            Choosing the right early-learning environment is an important
            decision for every parent. At Nanda Kidz The Little Kingdom,
            we make learning simple, engaging, and enjoyable so that
            children feel comfortable while developing the skills they
            need for their next stage of education.
          </p>

          <p>
            From the first playful experiences in Play Group and Nursery
            to the growing independence of LKG and UKG, our activities
            encourage curiosity, creativity, confidence, and a love
            of learning.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PopularClasses;

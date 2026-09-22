import React from "react";
import "./PopularClasses.css";

// Class card images
import classImg1 from "../../assets/image4.webp";
import classImg2 from "../../assets/image5.webp";
import classImg3 from "../../assets/image6.webp";

// Decorative dinosaur images
import dinoLeftImg from "../../assets/class-shape-1.png";
import dinoRightImg from "../../assets/class-shape-2.png";

const classesData = [
  {
    id: 1,
    title: "Play Group Discovery",
    price: "₹11,999",
    image: classImg1,
    description:
      "A happy and welcoming first step for little learners, with playful activities that encourage sharing, communication, colours, movement, and everyday discovery.",
    age: "2 - 3 Years (Play School)",
    time: "9:00 - 11:30 AM",
    seat: "20",
    tag: "Most Loved",
  },
  {
    id: 2,
    title: "LKG Foundation Program",
    price: "₹14,999",
    image: classImg2,
    description:
      "A balanced early-learning program introducing phonics, alphabets, numbers, rhymes, creative activities, and classroom routines in an enjoyable way.",
    age: "3 - 4 Years (LKG)",
    time: "9:00 AM - 12:00 PM",
    seat: "22",
    tag: "Popular Choice",
  },
  {
    id: 3,
    title: "UKG Advanced Readiness",
    price: "₹17,500",
    image: classImg3,
    description:
      "A focused kindergarten program that builds confidence through handwriting, basic mathematics, storytelling, science activities, and school-readiness skills.",
    age: "4 - 5 Years (UKG)",
    time: "9:00 AM - 1:00 PM",
    seat: "25",
    tag: "Best Value",
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

        {/* =================================================
            HEADER
        ================================================= */}
        <div className="pc-header">

          <span className="pc-eyebrow">
            <span className="pc-eyebrow-dot" />
            Admissions Open
          </span>

          <span className="pc-subtitle">
            Nanda Kidz The Little Kingdom A Play School
          </span>

          {/* Main SEO Heading */}
          <h1 className="pc-title">
            Best Play School in Bhubaneswar
          </h1>

          <p className="pc-intro">
            At Nanda Kidz, children get a joyful place to learn, play,
            explore, and grow. Our programs are thoughtfully designed for
            young learners, helping them develop confidence, creativity,
            communication, and essential early-learning skills.
          </p>

          <p className="pc-intro pc-intro-secondary">
            Nanda Kidz Best Play offers age-appropriate programs for Play
            School, LKG, and UKG, making us a friendly choice for parents
            looking for a <strong>best play school for kids in Bhubaneswar</strong>.
          </p>

        </div>

        {/* =================================================
            CLASS CARDS
        ================================================= */}
        <div className="pc-grid">

          {classesData.map((item) => (
            <article
              key={item.id}
              className="pc-card"
            >

              {/* Image */}
              <div className="pc-image-wrapper">

                <img
                  src={item.image}
                  alt={`${item.title} at Nanda Kidz`}
                  className="pc-card-image"
                />

                <span className="pc-tag-badge">
                  {item.tag}
                </span>

                <span className="pc-price-badge">
                  {item.price}
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

                {/* Program Information */}
                <div className="pc-card-info">

                  <div className="pc-info-item">
                    <span className="pc-info-label">
                      Age Group
                    </span>

                    <span className="pc-info-value">
                      {item.age}
                    </span>
                  </div>

                  <div className="pc-info-item">
                    <span className="pc-info-label">
                      Timing
                    </span>

                    <span className="pc-info-value">
                      {item.time}
                    </span>
                  </div>

                  <div className="pc-info-item">
                    <span className="pc-info-label">
                      Seats
                    </span>

                    <span className="pc-info-value">
                      {item.seat} Max
                    </span>
                  </div>

                </div>

                {/* Enroll Button */}
                <div className="pc-action-wrapper">

                  <button
                    type="button"
                    className="pc-btn-join"
                    onClick={() => handleJoinClass(item.id)}
                  >
                    <span>Enroll Now</span>
                    <span className="pc-btn-sparkle">✨</span>
                  </button>

                </div>

              </div>
            </article>
          ))}

        </div>

        {/* =================================================
            BOTTOM CONTENT
        ================================================= */}
        <div className="pc-bottom-content">

          <h2>
            A Happy Beginning for Every Child
          </h2>

          <p>
            Choosing the right early-learning environment is an important
            decision for every parent. At Nanda Kidz The Little Kingdom,
            we keep learning simple, engaging, and enjoyable so that
            children feel comfortable while developing the skills they
            need for their next stage of education.
          </p>

          <p>
            From the first playful experiences in our Play Group to the
            growing independence of LKG and UKG, every classroom activity
            is planned around the child's age, interests, and learning
            needs.
          </p>

        </div>

      </div>
    </section>
  );
};

export default PopularClasses;
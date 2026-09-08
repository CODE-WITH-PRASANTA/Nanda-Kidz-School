
import React, { useState } from "react";
import "./Testimonial.css";

import {
  FaQuoteRight,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
} from "react-icons/fa";

import birdPair1 from "../../assets/testimonials-1.png";
import birdPair2 from "../../assets/testimonials-2.png";
import birdPair3 from "../../assets/testimonials-3.png";

const testimonialData = [
  {
    id: 1,
    name: "Priya Mohanty",
    role: "Parent",
    quote:
      "A wonderful place for little ones to begin their learning journey. The child-proofed classrooms feel safe and welcoming, while the teachers are caring and attentive to every child.",
    birdImage: birdPair1,
  },
  {
    id: 2,
    name: "Rahul Das",
    role: "Parent",
    quote:
      "We are very happy with the learning environment. The classrooms are clean, hygienic, and well maintained. The open play areas give children plenty of space to learn, play, and explore.",
    birdImage: birdPair2,
  },
  {
    id: 3,
    name: "Sneha Patnaik",
    role: "Parent",
    quote:
      "The teachers understand how young children learn. Activities are fun and engaging, and the school gives equal importance to learning, creativity, play, and good habits.",
    birdImage: birdPair3,
  },
  {
    id: 4,
    name: "Arjun Behera",
    role: "Parent",
    quote:
      "Safety was one of our biggest priorities when choosing a nursery school. The child-friendly classrooms, hygienic sanitation, and CCTV surveillance give us great peace of mind.",
    birdImage: birdPair2,
  },
  {
    id: 5,
    name: "Ananya Sahu",
    role: "Parent",
    quote:
      "The school has created a warm and positive atmosphere for children. My child enjoys coming to school every day and has become more confident, social, and independent.",
    birdImage: birdPair3,
  },
  {
    id: 6,
    name: "Suman Mishra",
    role: "Parent",
    quote:
      "I really appreciate the attention given to cleanliness and safety. The staff are friendly and approachable, and the children get enough opportunities for creative and outdoor play.",
    birdImage: birdPair1,
  },
  {
    id: 7,
    name: "Ritika Nayak",
    role: "Parent",
    quote:
      "The combination of caring teachers, safe classrooms, and enjoyable activities makes this nursery a great choice for young children. We have seen a lovely change in our child's confidence.",
    birdImage: birdPair3,
  },
  {
    id: 8,
    name: "Debashis Rout",
    role: "Parent",
    quote:
      "The school provides a balanced environment where children can learn at their own pace. The open play areas and engaging classroom activities make learning enjoyable rather than stressful.",
    birdImage: birdPair1,
  },
  {
    id: 9,
    name: "Pooja Swain",
    role: "Parent",
    quote:
      "A safe, clean, and cheerful environment is exactly what we wanted for our child. The CCTV surveillance and hygienic facilities add confidence, while the teachers provide genuine care and guidance.",
    birdImage: birdPair2,
  },
];

const getInitials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const Testimonial = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const cardsPerPage = 3;
  const totalPages = Math.ceil(testimonialData.length / cardsPerPage);

  const handlePrev = () => {
    setCurrentPage((prev) =>
      prev === 0 ? totalPages - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentPage((prev) =>
      prev === totalPages - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className="testimonial-section">
      {/* Decorative background elements */}
      <div className="testimonial-section__ambient testimonial-section__ambient--1"></div>
      <div className="testimonial-section__ambient testimonial-section__ambient--2"></div>

      <div className="testimonial-section__container">

        {/* Section Header */}
        <div className="testimonial-section__header">
          <span className="testimonial-section__subtitle">
            Happy Parents
          </span>

          <h1 className="testimonial-section__title">
            Top Best Nursery School in Bhubaneswar
          </h1>

          <p className="testimonial-section__intro">
            Child-proofed classrooms, hygienic sanitation, open play areas,
            and CCTV surveillance create a safe and caring environment where
            little learners can grow with confidence.
          </p>

          <div className="testimonial-section__title-underline"></div>
        </div>

        {/* Testimonials Carousel */}
        <div className="testimonial-section__carousel">

          {/* Previous Button */}
          <button
            type="button"
            className="testimonial-section__nav-btn testimonial-section__nav-btn--prev"
            onClick={handlePrev}
            aria-label="Previous testimonials"
          >
            <FaChevronLeft />
          </button>

          {/* Next Button */}
          <button
            type="button"
            className="testimonial-section__nav-btn testimonial-section__nav-btn--next"
            onClick={handleNext}
            aria-label="Next testimonials"
          >
            <FaChevronRight />
          </button>

          <div
            className="testimonial-section__track"
            style={{
              transform: `translateX(-${currentPage * 100}%)`,
            }}
          >
            {testimonialData.map((item) => (
              <div
                key={item.id}
                className="testimonial-section__card-wrapper"
              >
                <article className="testimonial-section__card">

                  {/* Decorative Quote */}
                  <FaQuoteRight className="testimonial-section__quote-watermark" />

                  {/* Rating */}
                  <div
                    className="testimonial-section__stars"
                    aria-label="5 star rating"
                  >
                    {[...Array(5)].map((_, index) => (
                      <FaStar key={index} />
                    ))}
                  </div>

                  {/* Parent Review */}
                  <p className="testimonial-section__quote">
                    “{item.quote}”
                  </p>

                  {/* Parent Details */}
                  <div className="testimonial-section__footer">
                    <div className="testimonial-section__avatar">
                      {getInitials(item.name)}
                    </div>

                    <div className="testimonial-section__author">
                      <h3 className="testimonial-section__name">
                        {item.name}
                      </h3>

                      <span className="testimonial-section__role">
                        {item.role}
                      </span>
                    </div>
                  </div>
                </article>

                {/* Decorative Birds */}
                <div className="testimonial-section__birds-wrapper">
                  <img
                    src={item.birdImage}
                    alt=""
                    className="testimonial-section__birds-image"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="testimonial-section__dots">
          {[...Array(totalPages)].map((_, index) => (
            <button
              type="button"
              key={index}
              className={`testimonial-section__dot ${
                currentPage === index
                  ? "testimonial-section__dot--active"
                  : ""
              }`}
              onClick={() => setCurrentPage(index)}
              aria-label={`Go to testimonial group ${index + 1}`}
              aria-current={
                currentPage === index ? "true" : undefined
              }
            />
          ))}
        </div>

        {/* Safety & Care Highlights */}
        <div className="testimonial-section__highlights">

          <div className="testimonial-section__highlight">
            <span className="testimonial-section__highlight-icon">
              🛡️
            </span>
            <div>
              <h3>Safe Classrooms</h3>
              <p>Child-proofed spaces designed for little learners.</p>
            </div>
          </div>

          <div className="testimonial-section__highlight">
            <span className="testimonial-section__highlight-icon">
              🧼
            </span>
            <div>
              <h3>Hygienic Environment</h3>
              <p>Clean and well-maintained facilities for children.</p>
            </div>
          </div>

          <div className="testimonial-section__highlight">
            <span className="testimonial-section__highlight-icon">
              🌳
            </span>
            <div>
              <h3>Open Play Areas</h3>
              <p>Room for children to play, explore, and stay active.</p>
            </div>
          </div>

          <div className="testimonial-section__highlight">
            <span className="testimonial-section__highlight-icon">
              📹
            </span>
            <div>
              <h3>CCTV Surveillance</h3>
              <p>Added security and peace of mind for parents.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonial;


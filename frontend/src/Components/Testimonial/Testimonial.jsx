import React, {
  useEffect,
  useState,
} from "react";

import "./Testimonial.css";

import {
  FaQuoteRight,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaUser,
  FaBriefcase,
  FaCommentAlt,
  FaPaperPlane,
  FaCheckCircle,
  FaHeart,
} from "react-icons/fa";

import birdPair1 from "../../assets/testimonials-1.png";
import birdPair2 from "../../assets/testimonials-2.png";
import birdPair3 from "../../assets/testimonials-3.png";

// =========================================================
// MUMMY + CHILD IMAGE
// =========================================================

import mummyChild from "../../assets/mummy-chiled.png";

// =========================================================
// API CONFIG
// =========================================================

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

// =========================================================
// BIRD IMAGES
// =========================================================

const birdImages = [
  birdPair1,
  birdPair2,
  birdPair3,
];

// =========================================================
// INITIALS
// =========================================================

const getInitials = (name = "") => {
  return String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

// =========================================================
// TESTIMONIAL COMPONENT
// =========================================================

const Testimonial = () => {
  // =======================================================
  // CAROUSEL STATE
  // =======================================================

  const [currentPage, setCurrentPage] =
    useState(0);

  // =======================================================
  // TESTIMONIAL API STATE
  // =======================================================

  const [testimonials, setTestimonials] =
    useState([]);

  const [
    loadingTestimonials,
    setLoadingTestimonials,
  ] = useState(true);

  const [
    testimonialError,
    setTestimonialError,
  ] = useState("");

  // =======================================================
  // FORM STATE
  // =======================================================

  const [formData, setFormData] =
    useState({
      name: "",
      designation: "",
      rating: 0,
      description: "",
    });

  const [hoverRating, setHoverRating] =
    useState(0);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [submitStatus, setSubmitStatus] =
    useState({
      type: "",
      message: "",
    });

  // =======================================================
  // CAROUSEL
  // =======================================================

  const cardsPerPage = 3;

  const totalPages =
    Math.ceil(
      testimonials.length /
        cardsPerPage
    );

  // =======================================================
  // FETCH PUBLISHED TESTIMONIALS
  // =======================================================

  const fetchPublishedTestimonials =
    async () => {
      try {
        setLoadingTestimonials(true);

        setTestimonialError("");

        const response = await fetch(
          `${API_BASE_URL}/api/testimonials/published`
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to fetch testimonials."
          );
        }

        setTestimonials(
          data.testimonials || []
        );

        setCurrentPage(0);
      } catch (error) {
        console.error(
          "FETCH PUBLISHED TESTIMONIALS ERROR:",
          error
        );

        setTestimonials([]);

        setTestimonialError(
          error.message ||
            "Unable to load testimonials."
        );
      } finally {
        setLoadingTestimonials(false);
      }
    };

  // =======================================================
  // LOAD TESTIMONIALS ON PAGE LOAD
  // =======================================================

  useEffect(() => {
    fetchPublishedTestimonials();
  }, []);

  // =======================================================
  // KEEP PAGE VALID WHEN DATA CHANGES
  // =======================================================

  useEffect(() => {
    if (totalPages === 0) {
      setCurrentPage(0);
      return;
    }

    setCurrentPage((prev) =>
      Math.min(
        prev,
        totalPages - 1
      )
    );
  }, [totalPages]);

  // =======================================================
  // PREVIOUS
  // =======================================================

  const handlePrev = () => {
    if (totalPages <= 1) {
      return;
    }

    setCurrentPage((prev) =>
      prev === 0
        ? totalPages - 1
        : prev - 1
    );
  };

  // =======================================================
  // NEXT
  // =======================================================

  const handleNext = () => {
    if (totalPages <= 1) {
      return;
    }

    setCurrentPage((prev) =>
      prev === totalPages - 1
        ? 0
        : prev + 1
    );
  };

  // =======================================================
  // FORM INPUT
  // =======================================================

  const handleInputChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (submitStatus.message) {
      setSubmitStatus({
        type: "",
        message: "",
      });
    }
  };

  // =======================================================
  // RATING
  // =======================================================

  const handleRating = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));

    setSubmitStatus({
      type: "",
      message: "",
    });
  };

  // =======================================================
  // SUBMIT REVIEW
  // =======================================================

  const handleSubmitReview = async (
    e
  ) => {
    e.preventDefault();

    const name =
      formData.name.trim();

    const designation =
      formData.designation.trim();

    const description =
      formData.description.trim();

    // -------------------------------------------------------
    // CLIENT VALIDATION
    // -------------------------------------------------------

    if (!name) {
      setSubmitStatus({
        type: "error",
        message:
          "Please enter your name.",
      });

      return;
    }

    if (!designation) {
      setSubmitStatus({
        type: "error",
        message:
          "Please enter your designation.",
      });

      return;
    }

    if (!formData.rating) {
      setSubmitStatus({
        type: "error",
        message:
          "Please select a rating.",
      });

      return;
    }

    if (!description) {
      setSubmitStatus({
        type: "error",
        message:
          "Please write your review.",
      });

      return;
    }

    if (description.length < 10) {
      setSubmitStatus({
        type: "error",
        message:
          "Please write at least 10 characters in your review.",
      });

      return;
    }

    // -------------------------------------------------------
    // START SUBMIT
    // -------------------------------------------------------

    setIsSubmitting(true);

    setSubmitStatus({
      type: "",
      message: "",
    });

    try {
      const response =
        await fetch(
          `${API_BASE_URL}/api/testimonials`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              name,
              designation,
              rating: Number(
                formData.rating
              ),
              description,
            }),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to submit your review. Please try again."
        );
      }

      // -------------------------------------------------------
      // SUCCESS
      // -------------------------------------------------------

      setSubmitStatus({
        type: "success",
        message:
          "Thank you! Your review has been submitted successfully and is awaiting approval.",
      });

      setFormData({
        name: "",
        designation: "",
        rating: 0,
        description: "",
      });

      setHoverRating(0);
    } catch (error) {
      console.error(
        "TESTIMONIAL SUBMISSION ERROR:",
        error
      );

      setSubmitStatus({
        type: "error",
        message:
          error.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // =======================================================
  // CURRENT TESTIMONIALS
  // =======================================================

  const startIndex =
    currentPage * cardsPerPage;

  const currentTestimonials =
    testimonials.slice(
      startIndex,
      startIndex + cardsPerPage
    );

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <section className="testimonial-section">

      {/* =================================================
          DECORATIVE BACKGROUND
      ================================================= */}

      <div className="testimonial-section__ambient testimonial-section__ambient--1"></div>

      <div className="testimonial-section__ambient testimonial-section__ambient--2"></div>

      <div className="testimonial-section__container">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="testimonial-section__header">

          <span className="testimonial-section__subtitle">
            Happy Parents
          </span>

          <h1 className="testimonial-section__title">
            Top Best Nursery School in Bhubaneswar
          </h1>

          <p className="testimonial-section__intro">
            Child-proofed classrooms, hygienic
            sanitation, open play areas, and CCTV
            surveillance create a safe and caring
            environment where little learners can
            grow with confidence.
          </p>

          <div className="testimonial-section__title-underline"></div>

        </div>

        {/* =================================================
            SHARE YOUR EXPERIENCE FORM
        ================================================= */}

        <div className="testimonial-form">

          {/* LEFT CONTENT */}

          <div className="testimonial-form__intro">

            <div className="testimonial-form__heart testimonial-form__heart--one">
              <FaHeart />
            </div>

            <div className="testimonial-form__heart testimonial-form__heart--two">
              <FaHeart />
            </div>

            {/* MUMMY + CHILD */}

            <div className="testimonial-form__illustration">

              <img
                src={mummyChild}
                alt="Mother and child"
                className="testimonial-form__illustration-image"
              />

            </div>

            <div className="testimonial-form__intro-content">

              <span className="testimonial-form__small-title">
                Your Voice Matters
              </span>

              <h2>
                Share Your
                <br />
                <span>
                  Experience
                </span>
              </h2>

              <div className="testimonial-form__line"></div>

              <p>
                Your feedback helps us grow
                and support more little
                learners!
              </p>

            </div>

          </div>

          {/* FORM */}

          <form
            className="testimonial-form__fields"
            onSubmit={
              handleSubmitReview
            }
            noValidate
          >

            {/* NAME */}

            <div className="testimonial-form__field">

              <label htmlFor="testimonial-name">
                Name <span>*</span>
              </label>

              <div className="testimonial-form__input-wrapper">

                <FaUser />

                <input
                  id="testimonial-name"
                  type="text"
                  name="name"
                  value={
                    formData.name
                  }
                  onChange={
                    handleInputChange
                  }
                  placeholder="Enter your name"
                  maxLength={80}
                  autoComplete="name"
                />

              </div>

            </div>

            {/* DESIGNATION */}

            <div className="testimonial-form__field">

              <label htmlFor="testimonial-designation">
                Designation{" "}
                <span>*</span>
              </label>

              <div className="testimonial-form__input-wrapper">

                <FaBriefcase />

                <input
                  id="testimonial-designation"
                  type="text"
                  name="designation"
                  value={
                    formData.designation
                  }
                  onChange={
                    handleInputChange
                  }
                  placeholder="e.g. Parent, Guardian, etc."
                  maxLength={50}
                />

              </div>

            </div>

            {/* RATING */}

            <div className="testimonial-form__field testimonial-form__field--rating">

              <label>
                Rating <span>*</span>
              </label>

              <div
                className="testimonial-form__rating"
                onMouseLeave={() =>
                  setHoverRating(0)
                }
              >

                {[1, 2, 3, 4, 5].map(
                  (star) => (
                    <button
                      key={star}
                      type="button"
                      className={
                        star <=
                        (hoverRating ||
                          formData.rating)
                          ? "is-active"
                          : ""
                      }
                      onMouseEnter={() =>
                        setHoverRating(
                          star
                        )
                      }
                      onClick={() =>
                        handleRating(
                          star
                        )
                      }
                      aria-label={`${star} star`}
                    >
                      <FaStar />
                    </button>
                  )
                )}

              </div>

            </div>

            {/* REVIEW */}

            <div className="testimonial-form__field testimonial-form__field--review">

              <label htmlFor="testimonial-description">
                Your Review{" "}
                <span>*</span>
              </label>

              <div className="testimonial-form__textarea-wrapper">

                <FaCommentAlt />

                <textarea
                  id="testimonial-description"
                  name="description"
                  value={
                    formData.description
                  }
                  onChange={
                    handleInputChange
                  }
                  placeholder="Write your experience here..."
                  maxLength={500}
                  rows={4}
                />

              </div>

              <div className="testimonial-form__counter">
                {
                  formData.description
                    .length
                }
                /500
              </div>

            </div>

            {/* STATUS MESSAGE */}

            {submitStatus.message && (
              <div
                className={`testimonial-form__message testimonial-form__message--${submitStatus.type}`}
                role="alert"
              >

                {submitStatus.type ===
                "success" ? (
                  <FaCheckCircle />
                ) : (
                  <span className="testimonial-form__error-icon">
                    !
                  </span>
                )}

                <span>
                  {
                    submitStatus.message
                  }
                </span>

              </div>
            )}

            {/* SUBMIT */}

            <button
              type="submit"
              className="testimonial-form__submit"
              disabled={isSubmitting}
            >

              {isSubmitting ? (
                <>
                  <span className="testimonial-form__spinner"></span>
                  Submitting...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Submit Review
                </>
              )}

            </button>

            <p className="testimonial-form__privacy">
              Your review will be reviewed by
              our team before appearing on the
              website.
            </p>

          </form>

        </div>

        {/* =================================================
            TESTIMONIAL CAROUSEL
        ================================================= */}

        <div className="testimonial-section__carousel">

          {/* PREVIOUS */}

          <button
            type="button"
            className="testimonial-section__nav-btn testimonial-section__nav-btn--prev"
            onClick={handlePrev}
            aria-label="Previous testimonials"
            disabled={
              totalPages <= 1
            }
          >
            <FaChevronLeft />
          </button>

          {/* NEXT */}

          <button
            type="button"
            className="testimonial-section__nav-btn testimonial-section__nav-btn--next"
            onClick={handleNext}
            aria-label="Next testimonials"
            disabled={
              totalPages <= 1
            }
          >
            <FaChevronRight />
          </button>

          {/* LOADING */}

          {loadingTestimonials && (
            <div className="testimonial-section__loading">
              Loading testimonials...
            </div>
          )}

          {/* ERROR */}

          {!loadingTestimonials &&
            testimonialError && (
              <div className="testimonial-section__loading">
                {testimonialError}
              </div>
            )}

          {/* NO PUBLISHED REVIEWS */}

          {!loadingTestimonials &&
            !testimonialError &&
            testimonials.length === 0 && (
              <div className="testimonial-section__loading">
                No published testimonials yet.
              </div>
            )}

          {/* CARDS */}

          {!loadingTestimonials &&
            !testimonialError &&
            currentTestimonials.length >
              0 && (

              <div className="testimonial-section__track">

                {currentTestimonials.map(
                  (item, index) => {

                    const rating =
                      Number(
                        item.rating
                      );

                    return (
                      <div
                        key={item._id}
                        className="testimonial-section__card-wrapper"
                      >

                        <article className="testimonial-section__card">

                          {/* QUOTE */}

                          <FaQuoteRight className="testimonial-section__quote-watermark" />

                          {/* STARS */}

                          <div
                            className="testimonial-section__stars"
                            aria-label={`${rating} star rating`}
                          >

                            {[1, 2, 3, 4, 5].map(
                              (star) => {

                                const isActive =
                                  star <=
                                  rating;

                                return (
                                  <FaStar
                                    key={star}
                                    style={{
                                      color:
                                        isActive
                                          ? "#f4a340"
                                          : "#eadfce",
                                      fill:
                                        isActive
                                          ? "#f4a340"
                                          : "#eadfce",
                                      fontSize:
                                        "16px",
                                      flexShrink:
                                        0,
                                    }}
                                  />
                                );
                              }
                            )}

                          </div>

                          {/* REVIEW */}

                          <p className="testimonial-section__quote">
                            “
                            {
                              item.description
                            }
                            ”
                          </p>

                          {/* AUTHOR */}

                          <div className="testimonial-section__footer">

                            <div className="testimonial-section__avatar">
                              {getInitials(
                                item.name
                              )}
                            </div>

                            <div className="testimonial-section__author">

                              <h3 className="testimonial-section__name">
                                {
                                  item.name
                                }
                              </h3>

                              <span className="testimonial-section__role">
                                {
                                  item.designation
                                }
                              </span>

                            </div>

                          </div>

                        </article>

                        {/* BIRDS */}

                        <div className="testimonial-section__birds-wrapper">

                          <img
                            src={
                              birdImages[
                                (startIndex +
                                  index) %
                                  birdImages.length
                              ]
                            }
                            alt=""
                            className="testimonial-section__birds-image"
                          />

                        </div>

                      </div>
                    );
                  }
                )}

              </div>
            )}

        </div>

        {/* =================================================
            DOTS
        ================================================= */}

        {!loadingTestimonials &&
          !testimonialError &&
          totalPages > 1 && (
            <div className="testimonial-section__dots">

              {Array.from(
                {
                  length: totalPages,
                }
              ).map((_, index) => (

                <button
                  type="button"
                  key={index}
                  className={`testimonial-section__dot ${
                    currentPage ===
                    index
                      ? "testimonial-section__dot--active"
                      : ""
                  }`}
                  onClick={() =>
                    setCurrentPage(
                      index
                    )
                  }
                  aria-label={`Go to testimonial group ${
                    index + 1
                  }`}
                  aria-current={
                    currentPage ===
                    index
                      ? "true"
                      : undefined
                  }
                />

              ))}

            </div>
          )}

        {/* =================================================
            SAFETY HIGHLIGHTS
        ================================================= */}

        <div className="testimonial-section__highlights">

          <div className="testimonial-section__highlight">

            <span className="testimonial-section__highlight-icon">
              🛡️
            </span>

            <div>
              <h3>
                Safe Classrooms
              </h3>

              <p>
                Child-proofed spaces designed
                for little learners.
              </p>
            </div>

          </div>

          <div className="testimonial-section__highlight">

            <span className="testimonial-section__highlight-icon">
              🧼
            </span>

            <div>
              <h3>
                Hygienic Environment
              </h3>

              <p>
                Clean and well-maintained
                facilities for children.
              </p>
            </div>

          </div>

          <div className="testimonial-section__highlight">

            <span className="testimonial-section__highlight-icon">
              🌳
            </span>

            <div>
              <h3>
                Open Play Areas
              </h3>

              <p>
                Room for children to play,
                explore, and stay active.
              </p>
            </div>

          </div>

          <div className="testimonial-section__highlight">

            <span className="testimonial-section__highlight-icon">
              📹
            </span>

            <div>
              <h3>
                CCTV Surveillance
              </h3>

              <p>
                Added security and peace of
                mind for parents.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Testimonial;
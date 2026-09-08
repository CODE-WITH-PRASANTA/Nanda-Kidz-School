import React, { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiArrowRight,
} from "react-icons/fi";
import "./Blogpicture.css";

// Import reference images
import img1 from "../../assets/c-4.webp";
import img2 from "../../assets/c-5.webp";
import img3 from "../../assets/c-7.webp";
import img4 from "../../assets/c-3.webp";
import img5 from "../../assets/c-7.webp";
import img6 from "../../assets/c-1.webp";
import img7 from "../../assets/c-7.webp";
import img8 from "../../assets/c-4.webp";
import img9 from "../../assets/c-9.webp";
import img10 from "../../assets/c-2.webp";
import img11 from "../../assets/c-7.webp";
import img12 from "../../assets/c-5.webp";

// Blog Posts
const allBlogPosts = [
  {
    id: 1,
    image: img1,
    author: "Nanda Kidz",
    date: "25 Dec 2026",
    title: "A Thoughtful Beginning for Every Child",
    excerpt:
      "The early years shape how children see learning, relationships and the world around them. At Nanda Kidz, we focus on creating happy first school experiences.",
  },
  {
    id: 2,
    image: img2,
    author: "Nanda Kidz",
    date: "25 Dec 2026",
    title: "Learning Through Everyday Experiences",
    excerpt:
      "Children learn naturally when they can touch, explore, ask questions and take part in simple activities. Our classroom experiences encourage curiosity and confidence.",
  },
  {
    id: 3,
    image: img3,
    author: "Nanda Kidz",
    date: "25 Dec 2026",
    title: "The Founder’s Vision for Early Learning",
    excerpt:
      "With an educational background and a close understanding of young children, our founder believes that early education should be caring, practical and full of meaningful experiences.",
  },
  {
    id: 4,
    image: img4,
    author: "Nanda Kidz",
    date: "26 Dec 2026",
    title: "Helping Toddlers Feel at Home at School",
    excerpt:
      "Starting school is a big step for a little child. A welcoming routine, familiar faces and patient guidance can help toddlers settle comfortably into their new environment.",
  },
  {
    id: 5,
    image: img5,
    author: "Nanda Kidz",
    date: "26 Dec 2026",
    title: "Why Play Matters in Early Childhood",
    excerpt:
      "Play gives children the freedom to experiment, communicate and solve small problems. It also helps them develop important skills while enjoying the learning process.",
  },
  {
    id: 6,
    image: img6,
    author: "Nanda Kidz",
    date: "26 Dec 2026",
    title: "Building Confidence One Small Step at a Time",
    excerpt:
      "Children grow in confidence when adults listen to them, encourage their efforts and give them opportunities to try things independently.",
  },
  {
    id: 7,
    image: img7,
    author: "Nanda Kidz",
    date: "27 Dec 2026",
    title: "Creative Activities for Curious Minds",
    excerpt:
      "Art, music, storytelling and hands-on activities give children different ways to express themselves and discover what interests them.",
  },
  {
    id: 8,
    image: img8,
    author: "Nanda Kidz",
    date: "27 Dec 2026",
    title: "A Caring Approach to Toddler Development",
    excerpt:
      "Every child develops at their own pace. Our teachers provide patient guidance and encouragement while allowing children the time and space they need to grow.",
  },
  {
    id: 9,
    image: img9,
    author: "Nanda Kidz",
    date: "27 Dec 2026",
    title: "Learning Together Through Group Activities",
    excerpt:
      "Group activities help children learn how to share, communicate, listen and work with others while building positive social habits from an early age.",
  },
  {
    id: 10,
    image: img10,
    author: "Nanda Kidz",
    date: "28 Dec 2026",
    title: "The Importance of a Child-Friendly Environment",
    excerpt:
      "A comfortable environment allows children to feel secure enough to explore and participate. We believe care and learning should go hand in hand.",
  },
  {
    id: 11,
    image: img11,
    author: "Nanda Kidz",
    date: "28 Dec 2026",
    title: "Guidance That Goes Beyond the Classroom",
    excerpt:
      "Our approach is not only about classroom activities. We pay attention to children's interests, behaviour and everyday progress to support their overall development.",
  },
  {
    id: 12,
    image: img12,
    author: "Nanda Kidz",
    date: "28 Dec 2026",
    title: "Choosing the Right First School",
    excerpt:
      "Choosing a school for your little one is an important decision. Look for a place where your child feels safe, respected, encouraged and genuinely happy to learn.",
  },
];

const Blogpicture = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 3;
  const totalPages = Math.ceil(
    allBlogPosts.length / postsPerPage
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = allBlogPosts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  const handlePageChange = (pageNumber) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= totalPages &&
      pageNumber !== currentPage
    ) {
      setCurrentPage(pageNumber);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="Blogpicture">
      <div className="Blogpicture-container">

        {/* =====================================================
            SECTION INTRO
        ===================================================== */}

        <div className="Blogpicture-header">
          <span className="Blogpicture-eyebrow">
            From Our Founder & Teachers
          </span>

          <h1 className="Blogpicture-main-title">
            which school is best for my child?
          </h1>

          <div className="Blogpicture-title-line"></div>

          <p className="Blogpicture-intro">
            Choosing the right first school is an important decision
            for every parent. At Nanda Kidz, our founder brings an
            educational background, a clear vision for early learning
            and hands-on guidance to create a warm beginning for
            toddlers.
          </p>

          <p className="Blogpicture-intro secondary">
            Through play, activities, conversation and personal
            attention, we help children become comfortable, curious
            and confident as they take their first steps into school
            life.
          </p>
        </div>

        {/* =====================================================
            BLOG CARDS
        ===================================================== */}

        <div className="Blogpicture-grid">
          {currentPosts.map((post) => (
            <article
              key={post.id}
              className="Blogpicture-card"
            >
              {/* Image */}
              <div className="Blogpicture-image-wrapper">
                <img
                  src={post.image}
                  alt={post.title}
                  className="Blogpicture-image"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="Blogpicture-content">
                <div className="Blogpicture-meta">
                  <span>
                    <strong className="Blogpicture-accent">
                      By:
                    </strong>{" "}
                    {post.author}
                  </span>

                  <span>
                    <strong className="Blogpicture-accent">
                      Date:
                    </strong>{" "}
                    {post.date}
                  </span>
                </div>

                <h2 className="Blogpicture-title">
                  {post.title}
                </h2>

                <p className="Blogpicture-excerpt">
                  {post.excerpt}
                </p>

                <button
                  type="button"
                  className="Blogpicture-readmore-btn"
                >
                  <span>Read More</span>
                  <FiArrowRight className="Blogpicture-readmore-icon" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* =====================================================
            PAGINATION
        ===================================================== */}

        <div
          className="Blogpicture-pagination"
          aria-label="Blog pagination"
        >
          <button
            type="button"
            className="Blogpicture-page-btn Blogpicture-arrow-btn"
            onClick={() =>
              handlePageChange(currentPage - 1)
            }
            disabled={currentPage === 1}
            aria-label="Previous Page"
          >
            <FiChevronLeft />
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((page) => (
            <button
              type="button"
              key={page}
              className={`Blogpicture-page-btn ${
                currentPage === page ? "active" : ""
              }`}
              onClick={() => handlePageChange(page)}
              aria-label={`Go to page ${page}`}
              aria-current={
                currentPage === page ? "page" : undefined
              }
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            className="Blogpicture-page-btn Blogpicture-arrow-btn"
            onClick={() =>
              handlePageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            aria-label="Next Page"
          >
            <FiChevronRight />
          </button>
        </div>

        {/* =====================================================
            FOUNDER CONTENT
        ===================================================== */}

        <div className="Blogpicture-founder-content">
          <span className="Blogpicture-founder-label">
            A personal approach to early learning
          </span>

          <h2>
            Guidance, Care and a Clear Vision for Little Learners
          </h2>

          <p>
            The founder's educational background plays an important
            role in shaping the learning environment at Nanda Kidz.
            The focus is on giving toddlers a comfortable space where
            they can learn at their own pace while receiving the
            attention and encouragement they need.
          </p>

          <p>
            More than simply following a routine, our team observes
            each child's interests and encourages them through
            everyday activities. This hands-on approach helps make
            learning feel natural while supporting communication,
            creativity, confidence and social development.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Blogpicture;
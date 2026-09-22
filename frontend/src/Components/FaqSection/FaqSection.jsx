import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import "./FaqSection.css";

import faqImage from "../../assets/faq.jpg";

const faqData = [
  {
    id: 1,
    question: "Which school is best for my child?",
    answer:
      "The right school is one where your child feels safe, comfortable and encouraged to learn. Parents can look at the teaching approach, classroom environment, activities, care, communication and safety practices before making a decision. Nanda Kidz focuses on making early learning warm, playful and meaningful for little learners.",
  },
  {
    id: 2,
    question: "What age is suitable for joining a play school?",
    answer:
      "The suitable admission age depends on the child's age and the program available at the school. Parents can contact Nanda Kidz to understand the appropriate class, admission requirements and availability for their child.",
  },
  {
    id: 3,
    question: "How much are play school fees in Bhubaneswar?",
    answer:
      "Play school fees in Bhubaneswar can vary depending on the program, duration, activities and other services included. At Nanda Kidz, parents can contact the school directly for the latest fee details and to understand what is included in the selected program.",
  },
  {
    id: 4,
    question: "Is there a play school near Khandagiri, Bhubaneswar?",
    answer:
      "Nanda Kidz is located in Kalinganagar, Bhubaneswar and is convenient for families looking for a play school near Khandagiri, Bhubaneswar. Parents are welcome to connect with the school to learn more about admissions, location and available programs.",
  },
  {
    id: 5,
    question: "What makes Nanda Kidz a good choice for young children?",
    answer:
      "Nanda Kidz The Little Kingdom A Play School encourages children to learn through play, creativity, interaction and everyday experiences. We give importance to curiosity, kindness, confidence, communication and the overall development of each child.",
  },
  {
    id: 6,
    question: "Do you offer an LKG program in Bhubaneswar?",
    answer:
      "Parents looking for a best school for LKG in Bhubaneswar can speak with the Nanda Kidz team about the available class structure, admission age, learning activities and current admissions.",
  },
  {
    id: 7,
    question: "What safety measures should parents check before admission?",
    answer:
      "Parents should ask about classroom supervision, entry and exit procedures, child pickup arrangements, transport safety, hygiene, emergency support and communication with families. A safe and caring environment is an important part of a positive preschool experience.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(1);

  const toggleAccordion = (id) => {
    setOpenIndex((current) => (current === id ? null : id));
  };

  return (
    <section className="FaqSection" aria-labelledby="faq-main-title">
      <div className="FaqSection-container">

        {/* =========================
            HEADER
        ========================== */}
        <div className="FaqSection-header">
          <span className="FaqSection-subtitle">
            Parents&apos; Questions
          </span>

          <h1
            id="faq-main-title"
            className="FaqSection-title"
          >
            play school near khandagiri, bhubaneswar
          </h1>

          <p className="FaqSection-intro">
            Choosing a preschool is an important first step for your
            child. Here are some practical answers about admissions,
            fees, safety, programs and what families can expect from
            Nanda Kidz – The Little Kingdom.
          </p>
        </div>

        {/* =========================
            CONTENT
        ========================== */}
        <div className="FaqSection-content">

          {/* Image */}
          <div className="FaqSection-image-wrapper">
            <img
              src={faqImage}
              alt="Nanda Kidz preschool learning and play environment"
              className="FaqSection-image"
            />

            <div className="FaqSection-image-caption">
              <span className="FaqSection-caption-small">
                Nanda Kidz
              </span>

              <strong>
                A caring beginning for little learners
              </strong>
            </div>
          </div>

          {/* Accordion */}
          <div className="FaqSection-card">
            <div className="FaqSection-card-heading">
              <span>
                Helpful information for parents
              </span>

              <p>
                Find clear answers before planning your child&apos;s
                preschool journey.
              </p>
            </div>

            <div className="FaqSection-accordion">
              {faqData.map((item) => {
                const isOpen = openIndex === item.id;

                return (
                  <div
                    key={item.id}
                    className={`FaqSection-item ${
                      isOpen ? "active" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="FaqSection-question-btn"
                      onClick={() => toggleAccordion(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${item.id}`}
                    >
                      <span className="FaqSection-question">
                        {item.question}
                      </span>

                      <span
                        className="FaqSection-icon"
                        aria-hidden="true"
                      >
                        {isOpen ? <FiMinus /> : <FiPlus />}
                      </span>
                    </button>

                    {isOpen && (
                      <div
                        id={`faq-answer-${item.id}`}
                        className="FaqSection-answer"
                      >
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================
            SEO CONTENT
        ========================== */}
        <div className="FaqSection-bottom">

          <div className="FaqSection-bottom-label">
            Why families look for the right beginning
          </div>

          <h2>
            Nanda Kidz Best play school in Bhubaneswar
          </h2>

          <p>
            Families searching for a <strong>best play school in
            bhubaneswar</strong> often want more than academics.
            They want a friendly place where children can build
            confidence, develop social skills, discover new interests
            and enjoy learning through play.
          </p>

          <p>
            For parents comparing a <strong>best play school in
            bhubaneswar with fees</strong>, it is helpful to consider
            the complete experience, including learning activities,
            care, safety, communication, classroom support and other
            services. Nanda Kidz aims to provide a balanced and
            welcoming environment for young children.
          </p>

          <div className="FaqSection-keywords">
            <span>Best play school in Kalinganagar</span>
            <span>Best play school for kids in Bhubaneswar</span>
            <span>Top best nursery school in Bhubaneswar</span>
            <span>Best school for LKG in Bhubaneswar</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FaqSection;
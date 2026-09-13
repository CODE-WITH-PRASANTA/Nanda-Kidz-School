import React from 'react';
import './HomeQualityEducation.css';
import studenImg from '../../assets/Education.webp';

const HomeQualityEducation = () => {
  const skillsData = [
    {
      label: 'Education Skills :',
      value: 84,
      color: '#ff8a00',
    },
    {
      label: 'Communication Skills :',
      value: 96,
      color: '#bc00dd',
    },
    {
      label: 'Children Care :',
      value: 81,
      color: '#ff8a00',
    },
  ];

  return (
    <section className="hq-section" aria-labelledby="quality-education-title">
      <div className="hq-container">

        {/* LEFT SIDE - IMAGE */}
        <div className="hq-image-side">
          <div className="hq-image-frame">

            {/* Decorative rotating ring */}
            <div
              className="hq-outline-ring ring-2"
              aria-hidden="true"
            ></div>

            {/* Decorative gradient blob */}
            <div
              className="hq-blob-bg"
              aria-hidden="true"
            ></div>

            {/* Main image */}
            <img
              src={studenImg}
              alt="Children learning and enjoying activities at Nanda Kidz"
              className="hq-student-img"
            />
          </div>
        </div>

        {/* RIGHT SIDE - CONTENT */}
        <div className="hq-content-side">

          <div className="hq-header-group">
            <span className="hq-tagline">
              NANDA KIDZ • QUALITY EARLY EDUCATION
            </span>

            {/* SEO KEYWORD H1 */}
            <h1
              id="quality-education-title"
              className="hq-title"
            >
              best play school in bhubaneswar
            </h1>

            <p className="hq-desc">
              At Nanda Kidz, children learn through play, creativity,
              communication, and everyday experiences. Our caring
              environment gives little learners the confidence to explore
              new ideas while developing important skills for their early
              years.
            </p>

            <p className="hq-desc hq-fee-text">
              Parents searching for information about <strong>
                play school fees in bhubaneswar
              </strong> can connect with Nanda Kidz to understand our
              programs, activities, and admission options. We believe
              quality early education should be engaging, supportive, and
              comfortable for every child.
            </p>
          </div>

          {/* SKILLS */}
          <div className="hq-skills-box">
            {skillsData.map((skill, index) => (
              <div
                key={skill.label}
                className="hq-skill-row"
              >
                <div className="hq-skill-meta">
                  <span className="hq-label">
                    {skill.label}
                  </span>

                  <span className="hq-percentage">
                    {skill.value}%
                  </span>
                </div>

                <div className="hq-meter-track">
                  <div
                    className="hq-meter-fill"
                    style={{
                      '--target-width': `${skill.value}%`,
                      backgroundColor: skill.color,
                      animationDelay: `${0.6 + 0.15 * index}s`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#more"
            className="hq-btn-cta"
            aria-label="Learn more about Nanda Kidz"
          >
            <span>MORE ABOUT US</span>

            <svg
              className="hq-btn-arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <line
                x1="7"
                y1="17"
                x2="17"
                y2="7"
              ></line>

              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </a>

        </div>
      </div>
    </section>
  );
};

export default HomeQualityEducation;
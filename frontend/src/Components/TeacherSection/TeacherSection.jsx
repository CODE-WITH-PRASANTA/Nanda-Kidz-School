import React from "react";
import "./TeacherSection.css";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

// Local teacher images
import teacher1 from "../../assets/p1.jpg";
import teacher2 from "../../assets/p2.jpg";
import teacher3 from "../../assets/p3.jpg";
import teacher4 from "../../assets/p4.jpg";
import teacher5 from "../../assets/p5.jpg";
import teacher6 from "../../assets/p6.jpg";
import teacher7 from "../../assets/p7.jpg";
import teacher8 from "../../assets/p8.jpg";

const teachersData = [
  {
    id: 1,
    name: "Glims Bond",
    role: "Early Learning Teacher",
    image: teacher1,
  },
  {
    id: 2,
    name: "Sherlock Bin",
    role: "Creative Activity Teacher",
    image: teacher2,
  },
  {
    id: 3,
    name: "Priestly Herbart",
    role: "Early Years Educator",
    image: teacher3,
  },
  {
    id: 4,
    name: "Smith Broke",
    role: "Language & Communication Teacher",
    image: teacher4,
  },
  {
    id: 5,
    name: "Sophia Miller",
    role: "Play & Activity Teacher",
    image: teacher5,
  },
  {
    id: 6,
    name: "David Lee",
    role: "Child Development Teacher",
    image: teacher6,
  },
  {
    id: 7,
    name: "Emma Watson",
    role: "Creative Learning Teacher",
    image: teacher7,
  },
  {
    id: 8,
    name: "Alexander Ray",
    role: "Early Childhood Educator",
    image: teacher8,
  },
];

const socialLinks = [
  {
    name: "Facebook",
    icon: <FaFacebookF />,
    url: "#",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedinIn />,
    url: "#",
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    url: "#",
  },
];

const TeacherSection = () => {
  return (
    <section
      className="TeacherSection"
      aria-labelledby="TeacherSection-title"
    >
      <div className="TeacherSection-container">

        {/* =====================================================
            INTRODUCTION
        ====================================================== */}
        <div className="TeacherSection-heading">
          <span className="TeacherSection-label">
            Meet Our Teaching Team
          </span>

          <h1
            id="TeacherSection-title"
            className="TeacherSection-title"
          >
            which school is best for my child?
          </h1>

          <p className="TeacherSection-intro">
            Parents often ask this important question when choosing
            an early learning environment. At Nanda Kidz The Little
            Kingdom A Play School, teachers play an important role in
            helping children feel comfortable, confident and curious
            as they begin their school journey.
          </p>

          <p className="TeacherSection-intro secondary">
            Our team focuses on learning through play, meaningful
            interaction, creative activities and everyday discovery.
            We aim to create a warm environment where every child can
            learn at a comfortable pace.
          </p>
        </div>

        {/* =====================================================
            TEACHER GRID
        ====================================================== */}
        <div className="TeacherSection-grid">
          {teachersData.map((teacher) => (
            <article
              key={teacher.id}
              className="TeacherSection-card"
            >
              <div className="TeacherSection-image-wrapper">
                <div className="TeacherSection-circle">

                  <img
                    src={teacher.image}
                    alt={`${teacher.name} - ${teacher.role} at Nanda Kidz`}
                    className="TeacherSection-image"
                  />

                  {/* Dark image overlay */}
                  <div className="TeacherSection-image-overlay" />

                  {/* Social links */}
                  <div className="TeacherSection-socials">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        className="TeacherSection-icon"
                        aria-label={`${social.name} profile`}
                        onClick={(e) => {
                          if (social.url === "#") {
                            e.preventDefault();
                          }
                        }}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="TeacherSection-info">
                <h2 className="TeacherSection-name">
                  {teacher.name}
                </h2>

                <p className="TeacherSection-role">
                  {teacher.role}
                </p>

                <span className="TeacherSection-card-line" />
              </div>
            </article>
          ))}
        </div>

        {/* =====================================================
            PARENT CONTENT
        ====================================================== */}
        <div className="TeacherSection-bottom">

          <div className="TeacherSection-bottom-content">
            <span className="TeacherSection-bottom-label">
              Learning with care
            </span>

            <h2>
              Best play school for kids in Bhubaneswar
            </h2>

            <p>
              A good early-learning experience depends on more than
              classrooms and activities. Children also need patient
              adults who listen, encourage questions and celebrate
              small achievements. Our teachers work to build
              confidence, kindness, communication and curiosity in
              everyday classroom experiences.
            </p>

            <p>
              For families searching for a{" "}
              <strong>
                play school near Khandagiri, Bhubaneswar
              </strong>{" "}
              or a{" "}
              <strong>
                best play school in Kalinganagar
              </strong>
              , we believe meeting the teaching team can help parents
              understand the atmosphere their child will experience.
            </p>
          </div>

          <div className="TeacherSection-location-card">
            <span className="TeacherSection-location-label">
              Nearby families
            </span>

            <h3>
              Easy to reach from
            </h3>

            <div className="TeacherSection-location-list">
              <span>Khandagiri</span>
              <span>Patrapada</span>
              <span>Ghatikia</span>
              <span>Kalinga Vihar</span>
            </div>

            <p>
              Families from nearby areas can contact Nanda Kidz for
              directions, admission information and school details.
            </p>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Nanda+Kidz+Kalinga+Vihar+Kalinganagar+Bhubaneswar+Odisha+751028"
              target="_blank"
              rel="noopener noreferrer"
              className="TeacherSection-location-button"
            >
              View School Location
              <span>→</span>
            </a>
          </div>

        </div>

        {/* =====================================================
            SCHOOL MESSAGE
        ====================================================== */}
        <div className="TeacherSection-message">
          <span className="TeacherSection-message-label">
            Nanda Kidz – The Little Kingdom
          </span>

          <p>
            Choosing a school is easier when you know who will guide
            your child each day. Our goal is to make those first
            school experiences happy, safe and full of discovery.
          </p>
        </div>

      </div>
    </section>
  );
};

export default TeacherSection;
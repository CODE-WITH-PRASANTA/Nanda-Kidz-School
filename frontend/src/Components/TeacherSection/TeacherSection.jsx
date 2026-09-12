import React, { useState } from "react";
import "./TeacherSection.css";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTimes,
  FaGraduationCap,
  FaHeart,
  FaAward,
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
    experience: "8+ Years Experience",
    bio: "Glims specializes in laying robust cognitive foundations through play-based methodologies, ensuring toddlers transition smoothly into structured learning.",
    image: teacher1,
  },
  {
    id: 2,
    name: "Sherlock Bin",
    role: "Creative Activity Teacher",
    experience: "6+ Years Experience",
    bio: "Passionate about molding young imaginations through arts, crafts, clay modeling, and tactile sensory activities.",
    image: teacher2,
  },
  {
    id: 3,
    name: "Priestly Herbart",
    role: "Early Years Educator",
    experience: "10+ Years Experience",
    bio: "Focuses on emotional regulation, empathy-building, and social integration among preschoolers in a warm climate.",
    image: teacher3,
  },
  {
    id: 4,
    name: "Smith Broke",
    role: "Language & Communication Teacher",
    experience: "7+ Years Experience",
    bio: "Expert in phonics, vocabulary expansion, and expressive storytelling that transforms verbal hesitation into confident speech.",
    image: teacher4,
  },
  {
    id: 5,
    name: "Sophia Miller",
    role: "Play & Activity Teacher",
    experience: "9+ Years Experience",
    bio: "Directs motor skill development games, outdoor coordination exercises, and structured rhythmic movement sessions.",
    image: teacher5,
  },
  {
    id: 6,
    name: "David Lee",
    role: "Child Development Teacher",
    experience: "6+ Years Experience",
    bio: "Monitors developmental milestone trackers and formulates personalized engagement tracks for unique learner pacing.",
    image: teacher6,
  },
  {
    id: 7,
    name: "Emma Watson",
    role: "Creative Learning Teacher",
    experience: "8+ Years Experience",
    bio: "Blends music, basic numeracy games, and visual pattern recognition tools to spark native curiosity.",
    image: teacher7,
  },
  {
    id: 8,
    name: "Alexander Ray",
    role: "Early Childhood Educator",
    experience: "11+ Years Experience",
    bio: "Committed to cultivating inquiry-driven mindsets, teaching children how to ask questions and explore solutions independently.",
    image: teacher8,
  },
];

const socialLinks = [
  { name: "Facebook", icon: <FaFacebookF />, url: "#" },
  { name: "LinkedIn", icon: <FaLinkedinIn />, url: "#" },
  { name: "Instagram", icon: <FaInstagram />, url: "#" },
];

const TeacherSection = () => {
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const openModal = (teacher) => setSelectedTeacher(teacher);
  const closeModal = () => setSelectedTeacher(null);

  return (
    <section className="TeacherSection" aria-labelledby="TeacherSection-title">
      <div className="TeacherSection-container">

        {/* =====================================================
            INTRODUCTION HEADER
        ===================================================== */}
        <div className="TeacherSection-heading">
          <span className="TeacherSection-label">
            Meet Our Teaching Team
          </span>

          <h1 id="TeacherSection-title" className="TeacherSection-title">
            Which school is best for my child?
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
        ===================================================== */}
        <div className="TeacherSection-grid">
          {teachersData.map((teacher) => (
            <article
              key={teacher.id}
              className="TeacherSection-card"
              onClick={() => openModal(teacher)}
              title="Click to view educator philosophy"
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
                  <div className="TeacherSection-socials" onClick={(e) => e.stopPropagation()}>
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        className="TeacherSection-icon"
                        aria-label={`${social.name} profile`}
                        onClick={(e) => {
                          if (social.url === "#") e.preventDefault();
                        }}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="TeacherSection-info">
                <h2 className="TeacherSection-name">{teacher.name}</h2>
                <p className="TeacherSection-role">{teacher.role}</p>
                <span className="TeacherSection-card-line" />
              </div>
            </article>
          ))}
        </div>

        {/* =====================================================
            PARENT CONTENT SECTION
        ===================================================== */}
        <div className="TeacherSection-bottom">
          <div className="TeacherSection-bottom-content">
            <span className="TeacherSection-bottom-label">
              Learning with care
            </span>

            <h2>Best play school for kids in Bhubaneswar</h2>

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
              <strong>play school near Khandagiri, Bhubaneswar</strong>
              or a{" "}
              <strong>best play school in Kalinganagar</strong>
              , we believe meeting the teaching team can help parents
              understand the atmosphere their child will experience.
            </p>
          </div>

          <div className="TeacherSection-location-card">
            <span className="TeacherSection-location-label">
              Nearby families
            </span>

            <h3>Easy to reach from</h3>

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
        ===================================================== */}
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

      {/* =====================================================
          INTERACTIVE TEACHER BIO MODAL (PREMIUM UI)
      ===================================================== */}
      {selectedTeacher && (
        <div className="TeacherModal-backdrop" onClick={closeModal}>
          <div className="TeacherModal-content" onClick={(e) => e.stopPropagation()}>
            <button className="TeacherModal-close" onClick={closeModal} aria-label="Close modal">
              <FaTimes />
            </button>

            <div className="TeacherModal-header">
              <img
                src={selectedTeacher.image}
                alt={selectedTeacher.name}
                className="TeacherModal-img"
              />
              <div>
                <span className="TeacherModal-badge">
                  <FaGraduationCap /> Certified Early Educator
                </span>
                <h3>{selectedTeacher.name}</h3>
                <p className="TeacherModal-role-sub">{selectedTeacher.role}</p>
              </div>
            </div>

            <div className="TeacherModal-body">
              <div className="TeacherModal-meta-row">
                <span><FaAward /> {selectedTeacher.experience}</span>
                <span><FaHeart /> Nanda Kidz Faculty Member</span>
              </div>
              <h4 className="TeacherModal-subheading">Teaching Philosophy & Approach</h4>
              <p className="TeacherModal-bio">{selectedTeacher.bio}</p>
              <p className="TeacherModal-note">
                "Every toddler is a unique universe of potential. Our focus is providing the safe emotional anchor required for them to blossom."
              </p>
            </div>

            <div className="TeacherModal-footer">
              <button className="TeacherModal-action-btn" onClick={closeModal}>
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TeacherSection;
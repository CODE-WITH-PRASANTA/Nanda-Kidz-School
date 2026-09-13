import React, { useState, useEffect } from "react";
import "./TeacherSection.css";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTimes,
  FaGraduationCap,
  FaHeart,
  FaAward,
  FaSpinner,
} from "react-icons/fa";
import API, { IMG_URL } from "../../api/axios";

/* =========================================================
   IMAGE URL HELPER
========================================================= */

const getImageUrl = (image) => {
  if (!image) {
    return "";
  }

  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  return `${IMG_URL}${image.startsWith("/") ? "" : "/"}${image}`;
};

const TeacherSection = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  /* =========================================================
     FETCH TEACHERS FROM BACKEND
  ========================================================= */

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await API.get("/teachers");

      if (response.data?.success) {
        const teacherData = Array.isArray(response.data.data)
          ? response.data.data
          : Array.isArray(response.data.teachers)
          ? response.data.teachers
          : [];

        setTeachers(teacherData);
      } else {
        setTeachers([]);
      }
    } catch (error) {
      console.error("Error fetching teachers for section:", error);
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

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
        {loading ? (
          <div className="TeacherSection-loading" style={{ textAlign: "center", padding: "3rem" }}>
            <FaSpinner className="fa-spin" style={{ fontSize: "2.5rem", color: "#ff6b6b" }} />
            <p style={{ marginTop: "1rem", fontWeight: "600" }}>Loading faculty members...</p>
          </div>
        ) : teachers.length === 0 ? (
          <div className="TeacherSection-no-data" style={{ textAlign: "center", padding: "3rem" }}>
            <p>No faculty members available right now.</p>
          </div>
        ) : (
          <div className="TeacherSection-grid">
            {teachers.map((teacher) => {
              const teacherImage = getImageUrl(teacher.image);

              return (
                <article
                  key={teacher._id}
                  className="TeacherSection-card"
                  onClick={() => openModal(teacher)}
                  title="Click to view educator philosophy"
                >
                  <div className="TeacherSection-image-wrapper">
                    <div className="TeacherSection-circle">
                      <img
                        src={teacherImage}
                        alt={`${teacher.name} - ${teacher.designation || teacher.role} at Nanda Kidz`}
                        className="TeacherSection-image"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      {/* Dark image overlay */}
                      <div className="TeacherSection-image-overlay" />

                      {/* Social links */}
                      <div className="TeacherSection-socials" onClick={(e) => e.stopPropagation()}>
                        <a
                          href={teacher.fb || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="TeacherSection-icon"
                          aria-label="Facebook profile"
                          onClick={(e) => {
                            if (!teacher.fb) e.preventDefault();
                          }}
                        >
                          <FaFacebookF />
                        </a>
                        <a
                          href={teacher.linkedin || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="TeacherSection-icon"
                          aria-label="LinkedIn profile"
                          onClick={(e) => {
                            if (!teacher.linkedin) e.preventDefault();
                          }}
                        >
                          <FaLinkedinIn />
                        </a>
                        <a
                          href={teacher.instagram || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="TeacherSection-icon"
                          aria-label="Instagram profile"
                          onClick={(e) => {
                            if (!teacher.instagram) e.preventDefault();
                          }}
                        >
                          <FaInstagram />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="TeacherSection-info">
                    <h2 className="TeacherSection-name">{teacher.name}</h2>
                    <p className="TeacherSection-role">{teacher.designation || teacher.role}</p>
                    <span className="TeacherSection-card-line" />
                  </div>
                </article>
              );
            })}
          </div>
        )}

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
                src={getImageUrl(selectedTeacher.image)}
                alt={selectedTeacher.name}
                className="TeacherModal-img"
              />
              <div>
                <span className="TeacherModal-badge">
                  <FaGraduationCap /> {selectedTeacher.role || "Certified Early Educator"}
                </span>
                <h3>{selectedTeacher.name}</h3>
                <p className="TeacherModal-role-sub">{selectedTeacher.designation}</p>
              </div>
            </div>

            <div className="TeacherModal-body">
              <div className="TeacherModal-meta-row">
                <span><FaAward /> Status: {selectedTeacher.status || "Active"}</span>
                <span><FaHeart /> Nanda Kidz Faculty Member</span>
              </div>
              <h4 className="TeacherModal-subheading">Teaching Philosophy & Approach</h4>
              <p className="TeacherModal-bio">
                {selectedTeacher.bio || "No description provided for this educator yet."}
              </p>
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
import React, { useState, useEffect } from "react";
import "./OurTeachers.css";
import API, { IMG_URL } from "../../api/axios";

import {
  FaTimes,
  FaQuoteLeft,
  FaSpinner,
  FaBriefcase,
  FaGraduationCap,
  FaBookOpen,
  FaUserGraduate,
} from "react-icons/fa";

/* =========================================================
   IMAGE URL BUILDER (Admin 'photo' field)
========================================================= */
const getImageUrl = (photo) => {
  if (!photo) return "";

  if (
    photo.startsWith("http://") ||
    photo.startsWith("https://") ||
    photo.startsWith("blob:")
  ) {
    return photo;
  }

  return `${IMG_URL}${photo.startsWith("/") ? photo : `/${photo}`}`;
};

/* =========================================================
   PARSE SKILLS HELPER
========================================================= */
const parseSkills = (skills) => {
  if (!skills) return [];
  if (Array.isArray(skills)) return skills;
  if (typeof skills === "string") {
    try {
      const parsed = JSON.parse(skills);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return skills.split(",").map((s) => s.trim()).filter(Boolean);
    }
  }
  return [];
};

const OurTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTeacher, setActiveTeacher] = useState(null);

  /* =========================================================
     FETCH ACTIVE SCHOOL TEACHERS FROM BACKEND
  ========================================================= */
  const fetchTeachers = async () => {
    try {
      setLoading(true);

      const response = await API.get("/school-teachers");
      const resData = response?.data;

      let list = [];
      if (Array.isArray(resData)) {
        list = resData;
      } else if (Array.isArray(resData?.data)) {
        list = resData.data;
      } else if (Array.isArray(resData?.teachers)) {
        list = resData.teachers;
      }

      // Filter only Active records for public view
      const activeList = list.filter(
        (t) => (t.status || "Active").toLowerCase() === "active"
      );

      setTeachers(activeList);
    } catch (error) {
      console.error("Error fetching school teachers:", error);
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <section className="our-teachers" aria-labelledby="our-teachers-heading">
      <div className="our-teachers__container">
        {/* Header Section */}
        <div className="our-teachers__header">
          <span className="our-teachers__subtitle">Our Faculty</span>
          <h1 id="our-teachers-heading" className="our-teachers__title">
            Meet Our Dedicated & Passionate Educators
          </h1>
        </div>

        {/* Loading / Content Grid */}
        {loading ? (
          <div className="our-teachers__loading">
            <FaSpinner className="fa-spin" style={{ fontSize: "2.2rem" }} />
            <p>Loading teachers...</p>
          </div>
        ) : teachers.length === 0 ? (
          <div className="our-teachers__no-data">
            <p>No active teachers listed at this moment.</p>
          </div>
        ) : (
          <div className="our-teachers__grid">
            {teachers.map((teacher) => {
              const teacherId = teacher._id || teacher.id;
              const photoUrl = getImageUrl(teacher.photo);
              const skillsList = parseSkills(teacher.skills);

              return (
                <div className="our-teachers__card" key={teacherId}>
                  <div className="our-teachers__avatar-container">
                    <div className="our-teachers__blob-bg" aria-hidden="true"></div>

                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt={teacher.name}
                        className="our-teachers__image"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="our-teachers__no-image">
                        <FaUserGraduate />
                      </div>
                    )}

                    {/* Quick Profile View Action */}
                    <div className="our-teachers__social-bar">
                      <button
                        type="button"
                        onClick={() => setActiveTeacher(teacher)}
                        className="our-teachers__social-link our-teachers__bio-btn"
                        aria-label="View Teacher Details"
                        title="View Full Profile"
                      >
                        <FaQuoteLeft />
                      </button>
                    </div>
                  </div>

                  {/* Teacher Info */}
                  <div className="our-teachers__info">
                    <h3 className="our-teachers__name">{teacher.name}</h3>

                    <p className="our-teachers__role">
                      {teacher.designation || teacher.subject || "Teacher"}
                    </p>

                    {teacher.subject && (
                      <span className="our-teachers__subject-tag">
                        {teacher.subject}
                      </span>
                    )}

                    {/* Top 2 Skills Pills */}
                    {skillsList.length > 0 && (
                      <div className="our-teachers__skills-preview">
                        {skillsList.slice(0, 2).map((skill, idx) => (
                          <span key={idx} className="our-teachers__skill-pill">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    <button
                      type="button"
                      className="our-teachers__read-more-trigger"
                      onClick={() => setActiveTeacher(teacher)}
                    >
                      View Profile ✨
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Details Popup Modal */}
      {activeTeacher && (
        <div
          className="our-teachers__modal-backdrop"
          onClick={() => setActiveTeacher(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="our-teachers__modal-content animate-popIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="our-teachers__modal-close"
              onClick={() => setActiveTeacher(null)}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>

            <div className="our-teachers__modal-grid">
              {/* Photo & Designation Badge */}
              <div className="our-teachers__modal-img-wrapper">
                {activeTeacher.photo ? (
                  <img
                    src={getImageUrl(activeTeacher.photo)}
                    alt={activeTeacher.name}
                  />
                ) : (
                  <div className="modal-avatar-fallback">
                    <FaUserGraduate />
                  </div>
                )}
                <span className="our-teachers__modal-badge">
                  {activeTeacher.designation || "Educator"}
                </span>
              </div>

              {/* Full Details */}
              <div className="our-teachers__modal-text">
                <h3 className="our-teachers__modal-name">{activeTeacher.name}</h3>

                <div className="our-teachers__modal-meta-grid">
                  {activeTeacher.subject && (
                    <p className="our-teachers__meta-item">
                      <FaBookOpen />
                      <span>
                        <strong>Subject:</strong> {activeTeacher.subject}
                      </span>
                    </p>
                  )}

                  {activeTeacher.experience && (
                    <p className="our-teachers__meta-item">
                      <FaBriefcase />
                      <span>
                        <strong>Experience:</strong> {activeTeacher.experience}
                      </span>
                    </p>
                  )}

                  {activeTeacher.qualification && (
                    <p className="our-teachers__meta-item">
                      <FaGraduationCap />
                      <span>
                        <strong>Qualification:</strong> {activeTeacher.qualification}
                      </span>
                    </p>
                  )}
                </div>

                {/* Biography */}
                <div className="our-teachers__modal-bio-box">
                  <strong>About:</strong>
                  <p className="our-teachers__modal-bio">
                    {activeTeacher.bio || "No biography provided."}
                  </p>
                </div>

                {/* Skills Section */}
                {parseSkills(activeTeacher.skills).length > 0 && (
                  <div className="our-teachers__modal-skills-section">
                    <strong>Teaching Skills & Specializations:</strong>
                    <div className="our-teachers__modal-skills-list">
                      {parseSkills(activeTeacher.skills).map((skill, idx) => (
                        <span key={idx} className="our-teachers__modal-skill-badge">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OurTeachers;
import React, { useState, useEffect } from "react";
import "./OurTeachers.css";
import API, { IMG_URL } from "../../api/axios";

// Import React Icons
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaTimes,
  FaQuoteLeft,
  FaSpinner,
} from "react-icons/fa";

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

const OurTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeBioTeacher, setActiveBioTeacher] = useState(null);

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
      console.error("Error fetching public teachers:", error);
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const openBioModal = (teacher) => {
    setActiveBioTeacher(teacher);
  };

  const closeBioModal = () => {
    setActiveBioTeacher(null);
  };

  return (
    <section className="our-teachers" aria-labelledby="our-teachers-heading">
      <div className="our-teachers__container">
        {/* Header Section */}
        <div className="our-teachers__header">
          <span className="our-teachers__subtitle">Our Core Faculty</span>
          <h1 id="our-teachers-heading" className="our-teachers__title">
            The founder’s educational background, vision, and hands-on guidance for toddlers.
          </h1>
        </div>

        {/* Loading / Teachers Grid */}
        {loading ? (
          <div className="our-teachers__loading">
            <FaSpinner className="fa-spin" style={{ fontSize: "2rem" }} />
            <p>Loading faculty members...</p>
          </div>
        ) : teachers.length === 0 ? (
          <div className="our-teachers__no-data">
            <p>No faculty members found.</p>
          </div>
        ) : (
          <div className="our-teachers__grid">
            {teachers.map((teacher) => {
              const teacherImage = getImageUrl(teacher.image);

              return (
                <div className="our-teachers__card" key={teacher._id}>
                  {/* Avatar / Blob / Social Container */}
                  <div className="our-teachers__avatar-container">
                    <div className="our-teachers__blob-bg" aria-hidden="true"></div>

                    <img
                      src={teacherImage}
                      alt={teacher.name || "Teacher"}
                      className="our-teachers__image"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />

                    {/* Sliding Social Icons Bar */}
                    <div className="our-teachers__social-bar">
                      <a
                        href={teacher.fb || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="our-teachers__social-link"
                        aria-label="Facebook"
                        onClick={(e) => {
                          if (!teacher.fb) e.preventDefault();
                        }}
                      >
                        <FaFacebookF />
                      </a>
                      <a
                        href={teacher.twitter || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="our-teachers__social-link"
                        aria-label="Twitter"
                        onClick={(e) => {
                          if (!teacher.twitter) e.preventDefault();
                        }}
                      >
                        <FaTwitter />
                      </a>
                      <a
                        href={teacher.linkedin || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="our-teachers__social-link"
                        aria-label="LinkedIn"
                        onClick={(e) => {
                          if (!teacher.linkedin) e.preventDefault();
                        }}
                      >
                        <FaLinkedinIn />
                      </a>
                      <a
                        href={teacher.instagram || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="our-teachers__social-link"
                        aria-label="Instagram"
                        onClick={(e) => {
                          if (!teacher.instagram) e.preventDefault();
                        }}
                      >
                        <FaInstagram />
                      </a>

                      {/* Bio Details Trigger Button */}
                      <button
                        type="button"
                        onClick={() => openBioModal(teacher)}
                        className="our-teachers__social-link our-teachers__bio-btn"
                        aria-label="View Bio Description"
                        title="View Bio & Description"
                      >
                        <FaQuoteLeft />
                      </button>
                    </div>
                  </div>

                  {/* Info Text */}
                  <div className="our-teachers__info">
                    <h3 className="our-teachers__name">{teacher.name}</h3>
                    <p className="our-teachers__role">{teacher.designation || teacher.role}</p>
                    <button
                      type="button"
                      className="our-teachers__read-more-trigger"
                      onClick={() => openBioModal(teacher)}
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

      {/* Interactive Cartoon Bio Popup Modal */}
      {activeBioTeacher && (
        <div
          className="our-teachers__modal-backdrop"
          onClick={closeBioModal}
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
              onClick={closeBioModal}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>

            <div className="our-teachers__modal-grid">
              <div className="our-teachers__modal-img-wrapper">
                <img
                  src={getImageUrl(activeBioTeacher.image)}
                  alt={activeBioTeacher.name}
                />
                <span className="our-teachers__modal-badge">
                  {activeBioTeacher.role || "Faculty"}
                </span>
              </div>
              <div className="our-teachers__modal-text">
                <span className="our-teachers__modal-subtitle">
                  {activeBioTeacher.designation}
                </span>
                <h3 className="our-teachers__modal-name">{activeBioTeacher.name}</h3>
                <p className="our-teachers__modal-specialty">
                  🎯 <strong>Status:</strong> {activeBioTeacher.status}
                </p>
                <p className="our-teachers__modal-bio">
                  {activeBioTeacher.bio || "No biography provided yet."}
                </p>

                <div className="our-teachers__modal-socials-row">
                  <a
                    href={activeBioTeacher.fb || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="modal-soc"
                    aria-label="Facebook"
                    onClick={(e) => {
                      if (!activeBioTeacher.fb) e.preventDefault();
                    }}
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href={activeBioTeacher.twitter || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="modal-soc"
                    aria-label="Twitter"
                    onClick={(e) => {
                      if (!activeBioTeacher.twitter) e.preventDefault();
                    }}
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href={activeBioTeacher.linkedin || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="modal-soc"
                    aria-label="LinkedIn"
                    onClick={(e) => {
                      if (!activeBioTeacher.linkedin) e.preventDefault();
                    }}
                  >
                    <FaLinkedinIn />
                  </a>
                  <a
                    href={activeBioTeacher.instagram || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="modal-soc"
                    aria-label="Instagram"
                    onClick={(e) => {
                      if (!activeBioTeacher.instagram) e.preventDefault();
                    }}
                  >
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OurTeachers;
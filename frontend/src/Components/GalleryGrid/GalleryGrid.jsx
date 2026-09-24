import React, { useEffect, useState } from "react";
import "./GalleryGrid.css";
import API from "../../api/axios";

const GalleryGrid = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch gallery items from backend on component mount
  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await API.get("/gallery");

      let fetchedData = [];
      if (Array.isArray(response.data)) {
        fetchedData = response.data;
      } else if (Array.isArray(response.data?.data)) {
        fetchedData = response.data.data;
      }

      setImages(fetchedData);
    } catch (err) {
      console.error("FETCH GALLERY GRID ERROR:", err);
      setError("Failed to load gallery moments.");
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (image) => {
    if (!image) return "";
    if (
      image.startsWith("blob:") ||
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }
    return `http://localhost:5000${image.startsWith("/") ? "" : "/"}${image}`;
  };

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const goToPrevious = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Keyboard controls for the gallery lightbox
  useEffect(() => {
    if (!isOpen || images.length === 0) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
      }

      if (event.key === "ArrowRight") {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, images.length]);

  return (
    <section className="GalleryGrid-section">
      <div className="GalleryGrid-wrapper">

        {/* =========================
            SECTION INTRO
        ========================= */}
        <div className="GalleryGrid-heading">
          <span className="GalleryGrid-label">
            Nanda Kidz Moments
          </span>

          <div className="GalleryGrid-title-row">
            <div className="GalleryGrid-title-line" />

            <h1 className="GalleryGrid-title">
              best kids school in bhubaneswar
            </h1>

            <div className="GalleryGrid-title-line" />
          </div>

          <p className="GalleryGrid-description">
            At Nanda Kidz – The Little Kingdom, every day brings a new
            opportunity for children to learn, explore and grow. Our
            approach gives importance to emotional intelligence,
            kindness, curiosity and holistic growth, helping children
            become confident and caring individuals.
          </p>

          <p className="GalleryGrid-description secondary">
            From joyful classroom activities to creative moments and
            friendly interactions, our gallery captures the little
            experiences that make childhood special. We believe that
            children learn best when they feel happy, respected and
            encouraged to discover the world around them.
          </p>
        </div>

        {/* =========================
            GALLERY GRID
        ========================= */}
        <div className="GalleryGrid-container">
          {loading ? (
            <p className="GalleryGrid-loading-text">Loading gallery moments...</p>
          ) : error ? (
            <p className="GalleryGrid-error-text">{error}</p>
          ) : images.length > 0 ? (
            images.map((item, index) => (
              <button
                type="button"
                key={item._id || index}
                className="GalleryGrid-item"
                onClick={() => openLightbox(index)}
                aria-label={`View Nanda Kidz gallery image ${index + 1}`}
              >
                <img
                  src={getImageUrl(item.image)}
                  alt={item.title || `Nanda Kidz activity ${index + 1}`}
                  className="GalleryGrid-image"
                />

                <div className="GalleryGrid-overlay">
                  <div className="GalleryGrid-overlay-content">
                    <span className="GalleryGrid-view-text">
                      {item.title || "View Moment"}
                    </span>

                    <span className="GalleryGrid-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line
                          x1="21"
                          y1="21"
                          x2="16.65"
                          y2="16.65"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <p className="GalleryGrid-no-images">No gallery moments found.</p>
          )}
        </div>

        {/* =========================
            BOTTOM CONTENT
        ========================= */}
        <div className="GalleryGrid-bottom">
          <div className="GalleryGrid-bottom-badge">
            Little moments, lasting memories
          </div>

          <h2>
            Growing with kindness, confidence and curiosity
          </h2>

          <p>
            Our children are encouraged to express their feelings,
            care for others, ask questions and enjoy learning at
            their own pace. Through play, stories, activities and
            meaningful interactions, we support their emotional,
            social, physical and creative development.
          </p>
        </div>
      </div>

      {/* =========================
          LIGHTBOX
      ========================= */}
      {isOpen && images.length > 0 && (
        <div
          className="GalleryGrid-modal"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image viewer"
        >
          {/* Close */}
          <button
            type="button"
            className="GalleryGrid-modal-close"
            onClick={closeLightbox}
            aria-label="Close gallery"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Previous */}
          <button
            type="button"
            className="GalleryGrid-modal-prev"
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="GalleryGrid-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={getImageUrl(images[currentIndex]?.image)}
              alt={images[currentIndex]?.title || `Gallery image ${currentIndex + 1}`}
              className="GalleryGrid-modal-img"
            />

            <div className="GalleryGrid-counter">
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          {/* Next */}
          <button
            type="button"
            className="GalleryGrid-modal-next"
            onClick={goToNext}
            aria-label="Next image"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default GalleryGrid;
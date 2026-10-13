
import React, { useCallback, useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  Images,
  Sparkles,
  GraduationCap,
  Palette,
  Music2,
  Waves,
  Trees,
  Puzzle,
  Leaf,
  Camera,
  ZoomIn,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";

import API, { IMG_URL } from "../../api/axios";
import "./Activites.css";

const ACTIVITIES_PER_PAGE = 6;

const FALLBACK_IMAGE =
  "https://placehold.co/800x800/f1f4f9/243858?text=Activity+Photo";

const getActivityIcon = (category = "") => {
  const value = category.toLowerCase();

  if (value.includes("sport") || value.includes("swim")) return Waves;
  if (value.includes("art") || value.includes("creat")) return Palette;
  if (value.includes("music") || value.includes("dance")) return Music2;
  if (value.includes("outdoor") || value.includes("adventure")) return Trees;
  if (value.includes("nature") || value.includes("discovery")) return Leaf;
  if (value.includes("game") || value.includes("play")) return Puzzle;
  if (value.includes("graduation") || value.includes("celebrat")) {
    return GraduationCap;
  }

  return Sparkles;
};

// Supports absolute URLs and images saved as relative upload paths.
const getImageUrl = (image) => {
  if (!image) return FALLBACK_IMAGE;

  const imagePath =
    typeof image === "string"
      ? image
      : image.url || image.path || image.filename || image.image || "";

  if (!imagePath) return FALLBACK_IMAGE;

  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://") ||
    imagePath.startsWith("data:")
  ) {
    return imagePath;
  }

  const baseUrl = String(IMG_URL || "").replace(/\/+$/, "");
  const normalizedPath = imagePath.replace(/\\/g, "/");

  if (normalizedPath.startsWith("/")) {
    return `${baseUrl}${normalizedPath}`;
  }

  return `${baseUrl}/${normalizedPath}`;
};

const normalizeActivity = (activity, index) => {
  const rawImages = Array.isArray(activity.images)
    ? activity.images
    : activity.image
      ? [activity.image]
      : [];

  const photos = rawImages.map((image, imageIndex) => ({
    src: getImageUrl(image),
    alt:
      typeof image === "object" && image?.alt
        ? image.alt
        : `${activity.title || "Activity"} photo ${imageIndex + 1}`,
  }));

  return {
    ...activity,
    id: activity._id || activity.id || `activity-${index}`,
    title: activity.title || "Untitled Activity",
    category: activity.category || "Activities",
    description: activity.description || "",
    status: activity.status || "Active",
    photos: photos.length
      ? photos
      : [{ src: FALLBACK_IMAGE, alt: activity.title || "Activity" }],
  };
};

const Activites = () => {
  const [activities, setActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch activities from the backend.
  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/activities");

      // Supports common Express response formats:
      // { activities: [...] }, { data: [...] }, or [...]
      const payload = response.data;

      const activityList = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.activities)
          ? payload.activities
          : Array.isArray(payload?.data)
            ? payload.data
            : Array.isArray(payload?.data?.activities)
              ? payload.data.activities
              : [];

      // Public page displays active activities only.
      const activeActivities = activityList
        .filter(
          (activity) =>
            !activity.status ||
            String(activity.status).toLowerCase() === "active"
        )
        .map(normalizeActivity);

      setActivities(activeActivities);
      setCurrentPage(1);
    } catch (err) {
      console.error(
        "Failed to fetch activities:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
          "Unable to load activities. Please check your connection and try again."
      );
      setActivities([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const totalPages = Math.max(
    1,
    Math.ceil(activities.length / ACTIVITIES_PER_PAGE)
  );

  const startIndex = (currentPage - 1) * ACTIVITIES_PER_PAGE;

  const visibleActivities = activities.slice(
    startIndex,
    startIndex + ACTIVITIES_PER_PAGE
  );

  const openGallery = (activity) => {
    setSelectedActivity(activity);
    setActiveImageIndex(0);
  };

  const closeGallery = useCallback(() => {
    setSelectedActivity(null);
    setActiveImageIndex(0);
  }, []);

  const showNextImage = useCallback(() => {
    if (!selectedActivity?.photos?.length) return;

    setActiveImageIndex(
      (index) => (index + 1) % selectedActivity.photos.length
    );
  }, [selectedActivity]);

  const showPreviousImage = useCallback(() => {
    if (!selectedActivity?.photos?.length) return;

    setActiveImageIndex(
      (index) =>
        (index - 1 + selectedActivity.photos.length) %
        selectedActivity.photos.length
    );
  }, [selectedActivity]);

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    document
      .querySelector(".activites-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Keyboard controls and modal scroll locking.
  useEffect(() => {
    if (!selectedActivity) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowRight") showNextImage();
      if (event.key === "ArrowLeft") showPreviousImage();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    selectedActivity,
    closeGallery,
    showNextImage,
    showPreviousImage,
  ]);

  const photoCount = activities.reduce(
    (total, activity) =>
      total +
      activity.photos.filter((photo) => photo.src !== FALLBACK_IMAGE).length,
    0
  );

  return (
    <section className="activites-section">
      <div className="activites-container">
        <div className="activites-decoration activites-decoration-one">
          ✦
        </div>

        <div className="activites-decoration activites-decoration-two">
          ✿
        </div>

        <header className="activites-header">
          <div className="activites-eyebrow">
            <Sparkles size={16} />
            <span>FUN BEYOND LEARNING</span>
          </div>

          <h1 className="activites-title">
            Exciting Activities
            <br />
            for <span>Happy Growth</span>
          </h1>

          <p className="activites-subtitle">
            Little adventures, wonderful discoveries, and big smiles.
            Every activity helps our young learners grow, explore, and shine.
          </p>

          <div className="activites-header-stats">
            <div className="activites-stat">
              <span className="activites-stat-icon">
                <Images size={19} />
              </span>
              <span>
                <strong>{String(activities.length).padStart(2, "0")}</strong>
                <small>Activities</small>
              </span>
            </div>

            <span className="activites-stat-divider" />

            <div className="activites-stat">
              <span className="activites-stat-icon activites-stat-icon-pink">
                <Camera size={19} />
              </span>
              <span>
                <strong>{String(photoCount).padStart(2, "0")}</strong>
                <small>Photo moments</small>
              </span>
            </div>
          </div>
        </header>

        {/* Loading state */}
        {loading && (
          <div className="activites-state" role="status">
            <LoaderCircle className="activites-loading-icon" size={38} />
            <h3>Loading activities...</h3>
            <p>Fetching the latest activities from our school.</p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="activites-state activites-error-state" role="alert">
            <h3>Unable to load activities</h3>
            <p>{error}</p>

            <button
              type="button"
              className="activites-explore-button"
              onClick={fetchActivities}
            >
              <RefreshCw size={17} />
              Try again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && activities.length === 0 && (
          <div className="activites-state">
            <Images size={38} />
            <h3>No activities available</h3>
            <p>New activities will appear here when they are published.</p>
          </div>
        )}

        {/* Activities from the backend */}
        {!loading && !error && activities.length > 0 && (
          <>
            <div className="activites-grid">
              {visibleActivities.map((activity, index) => {
                const ActivityIcon = getActivityIcon(activity.category);
                const firstPhoto = activity.photos[0];

                return (
                  <article
                    className="activites-card"
                    key={activity.id}
                    style={{
                      "--activites-accent": "#ff6685",
                      "--activites-tint": "#fff0f4",
                      "--activites-delay": `${index * 70}ms`,
                    }}
                  >
                    <button
                      type="button"
                      className="activites-image-button"
                      onClick={() => openGallery(activity)}
                      aria-label={`Open ${activity.title} gallery`}
                    >
                      <img
                        className="activites-card-image"
                        src={firstPhoto.src}
                        alt={firstPhoto.alt}
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = FALLBACK_IMAGE;
                        }}
                      />

                      <span className="activites-image-overlay" />

                      <span className="activites-image-top-label">
                        <Sparkles size={13} />
                        Little moments
                      </span>

                      <span className="activites-image-count">
                        <Images size={15} />
                        {activity.photos.length}{" "}
                        {activity.photos.length === 1 ? "photo" : "photos"}
                      </span>

                      <span className="activites-zoom-icon">
                        <ZoomIn size={20} />
                      </span>
                    </button>

                    <div className="activites-card-content">
                      <div className="activites-card-heading">
                        <span className="activites-card-icon">
                          <ActivityIcon size={23} />
                        </span>

                        <div className="activites-card-title-wrap">
                          <span className="activites-category">
                            {activity.category}
                          </span>

                          <h2 className="activites-card-title">
                            {activity.title}
                          </h2>
                        </div>
                      </div>

                      <p className="activites-card-description">
                        {activity.description || "Explore this school activity."}
                      </p>

                      <button
                        type="button"
                        className="activites-explore-button"
                        onClick={() => openGallery(activity)}
                      >
                        Explore gallery
                        <ArrowRight size={17} />
                      </button>
                    </div>

                    <span className="activites-card-bottom-accent" />
                  </article>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                className="activites-pagination"
                aria-label="Activity pagination"
              >
                <button
                  type="button"
                  className="activites-page-arrow"
                  disabled={currentPage === 1}
                  onClick={() => changePage(currentPage - 1)}
                >
                  <ChevronLeft size={20} />
                  <span>Previous</span>
                </button>

                <div className="activites-page-numbers">
                  {Array.from({ length: totalPages }, (_, index) => {
                    const page = index + 1;

                    return (
                      <button
                        type="button"
                        key={page}
                        className={`activites-page-number ${
                          currentPage === page
                            ? "activites-page-number-active"
                            : ""
                        }`}
                        onClick={() => changePage(page)}
                        aria-current={
                          currentPage === page ? "page" : undefined
                        }
                      >
                        {String(page).padStart(2, "0")}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  className="activites-page-arrow"
                  disabled={currentPage === totalPages}
                  onClick={() => changePage(currentPage + 1)}
                >
                  <span>Next</span>
                  <ChevronRight size={20} />
                </button>
              </nav>
            )}

            <p className="activites-pagination-info">
              Showing <strong>{startIndex + 1}</strong>–
              <strong>
                {Math.min(
                  startIndex + ACTIVITIES_PER_PAGE,
                  activities.length
                )}
              </strong>{" "}
              of <strong>{activities.length}</strong> activities
            </p>
          </>
        )}

        <div className="activites-footer-banner">
          <div className="activites-footer-icon">
            <Camera size={28} />
          </div>

          <div className="activites-footer-copy">
            <h3>Every little moment becomes a big memory!</h3>
            <p>
              Discover the joy, creativity, and wonder in every adventure.
            </p>
          </div>

          <div className="activites-footer-sparkle">✨</div>
        </div>
      </div>

      {/* Image gallery modal */}
      {selectedActivity && (
        <div
          className="activites-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedActivity.title} image viewer`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeGallery();
          }}
        >
          <div className="activites-modal-panel">
            <button
              type="button"
              className="activites-modal-close"
              onClick={closeGallery}
              aria-label="Close image viewer"
              title="Close"
            >
              <X size={25} strokeWidth={2.5} />
            </button>

            <div className="activites-viewer">
              <img
                key={
                  selectedActivity.photos[activeImageIndex]?.src ||
                  activeImageIndex
                }
                className="activites-viewer-image"
                src={
                  selectedActivity.photos[activeImageIndex]?.src ||
                  FALLBACK_IMAGE
                }
                alt={
                  selectedActivity.photos[activeImageIndex]?.alt ||
                  selectedActivity.title
                }
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = FALLBACK_IMAGE;
                }}
              />

              {selectedActivity.photos.length > 1 && (
                <>
                  <button
                    type="button"
                    className="activites-viewer-arrow activites-viewer-prev"
                    onClick={showPreviousImage}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={28} />
                  </button>

                  <button
                    type="button"
                    className="activites-viewer-arrow activites-viewer-next"
                    onClick={showNextImage}
                    aria-label="Next image"
                  >
                    <ChevronRight size={28} />
                  </button>
                </>
              )}

              <div className="activites-viewer-counter">
                {String(activeImageIndex + 1).padStart(2, "0")}
                <span>/</span>
                {String(selectedActivity.photos.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Activites;

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import "./VideoMain.css";

/* ------------------------------------------------------------------
   BACKEND CONFIG
------------------------------------------------------------------- */
const API_BASE = "http://localhost:5000";
const VIDEOS_ENDPOINT = `${API_BASE}/api/videos`;
const PER_PAGE = 6;

/* ------------------------------ HELPERS ---------------------------- */
const ICON_CYCLE = ["palette", "sprout", "book", "puzzle", "music", "users"];

const toAbsolute = (url) => {
  if (!url) return "";
  if (/^(https?:)?\/\//i.test(url) || url.startsWith("data:") || url.startsWith("blob:")) return url;
  return `${API_BASE}${url.startsWith("/") ? "" : "/"}${url}`;
};

const formatTime = (value) => {
  if (value === undefined || value === null || value === "") return "";
  if (typeof value === "string" && value.includes(":")) return value;
  const total = Math.round(Number(value));
  if (!Number.isFinite(total) || total <= 0) return "";
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
};

const normalizeVideo = (item, index) => ({
  id: item._id || item.id,
  title: item.title || "Untitled video",
  icon: item.icon || ICON_CYCLE[index % ICON_CYCLE.length],
  thumbnail: toAbsolute(item.thumbnailUrl || item.thumbnail || ""),
  src: toAbsolute(item.videoUrl || item.video || item.src || ""),
  duration: formatTime(item.duration),
  status: item.status || "published",
});

/* ------------------------------ ICONS ------------------------------ */
const Icon = ({ name }) => {
  const common = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true };
  switch (name) {
    case "palette":
      return (
        <svg {...common}>
          <path d="M12 2a10 10 0 1 0 0 20c1.4 0 2-1 2-1.8 0-.5-.2-.9-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1 .8-1.8 1.8-1.8H17a5 5 0 0 0 5-5C22 6 17.5 2 12 2Zm-5.5 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
        </svg>
      );
    case "sprout":
      return (
        <svg {...common}>
          <path d="M11 21v-8.1C8.2 12.8 6 10.5 6 7.5V4a1 1 0 0 1 1-1h.5C10.5 3 13 5.2 13 8.2v1.3C14.1 7.4 16.2 6 18.7 6H19a1 1 0 0 1 1 1v.3c0 3.8-2.9 6.9-6.6 7.1-.2 0-.4 0-.4 0V21h-2Z" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M3 5.5C5.5 4.3 8.5 4 11 5.3v13.4C8.5 17.4 5.5 17.7 3 18.9V5.5Zm18 0v13.4c-2.5-1.2-5.5-1.5-8-.2V5.3c2.5-1.3 5.5-1 8 .2Z" />
        </svg>
      );
    case "puzzle":
      return (
        <svg {...common}>
          <path d="M20.5 11H19V7a2 2 0 0 0-2-2h-4V3.5a2.5 2.5 0 0 0-5 0V5H4a2 2 0 0 0-2 2v3.8h1.5a2.7 2.7 0 0 1 0 5.4H2V20a2 2 0 0 0 2 2h3.8v-1.5a2.7 2.7 0 0 1 5.4 0V22H17a2 2 0 0 0 2-2v-4h1.5a2.5 2.5 0 0 0 0-5Z" />
        </svg>
      );
    case "music":
      return (
        <svg {...common}>
          <path d="M9 18V5l11-2v13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="17" cy="16" r="3" />
        </svg>
      );
    case "users":
    default:
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3.5" />
          <circle cx="17.5" cy="9" r="2.5" />
          <path d="M2 20c0-3.3 3-6 7-6s7 2.7 7 6H2Zm14.5-5.5c3 0 5.5 2 5.5 4.5h-4.2c-.2-1.8-.8-3.3-1.9-4.4.2-.1.4-.1.6-.1Z" />
        </svg>
      );
  }
};

const PlayIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" fill="currentColor" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    <path d="m15 5-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    <path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------------------------- DECORATIONS --------------------------- */
const Decorations = () => (
  <>
    <svg className="VideoMain__deco VideoMain__deco--plane" viewBox="0 0 320 120" aria-hidden="true">
      <path d="M0 62c40 10 70 40 110 36 30-3 50-22 70-40" fill="none" stroke="#e5a24a" strokeWidth="2" strokeDasharray="6 7" strokeLinecap="round" />
      <circle cx="118" cy="92" r="5" fill="none" stroke="#e5a24a" strokeWidth="1.6" />
      <path d="M170 38 258 8l-30 54-22-20-36 18 6-16 56-34-52 38Z" fill="#fbf1e0" stroke="#b9743a" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="m206 42 22 20 30-54" fill="none" stroke="#b9743a" strokeWidth="2.4" strokeLinejoin="round" />
    </svg>

    <svg className="VideoMain__deco VideoMain__deco--sun" viewBox="0 0 120 120" aria-hidden="true">
      <g stroke="#f0a323" strokeWidth="4" strokeLinecap="round">
        <path d="M60 8v14M60 98v14M8 60h14M98 60h14M23 23l10 10M87 87l10 10M97 23 87 33M33 87 23 97" />
      </g>
      <path d="M60 36c14-2 26 10 22 24-4 15-22 20-33 10-10-9-7-25 5-30 9-4 19 1 21 9 2 7-4 13-11 12-6-1-8-8-4-11" fill="none" stroke="#f0a323" strokeWidth="4" strokeLinecap="round" />
    </svg>

    <svg className="VideoMain__deco VideoMain__deco--heart" viewBox="0 0 160 70" aria-hidden="true">
      <path d="M160 6c-30 4-50 30-78 40-18 6-40 4-60 14" fill="none" stroke="#79b99a" strokeWidth="1.6" strokeDasharray="5 6" strokeLinecap="round" />
      <path d="M26 30c-8-9-22 2-14 12l14 14 14-14c8-10-6-21-14-12Z" fill="#0f6a47" transform="translate(-4 -4) scale(.9)" />
    </svg>

    <svg className="VideoMain__deco VideoMain__deco--leafLeft" viewBox="0 0 120 220" aria-hidden="true">
      <path d="M10 210C0 140 30 70 70 20c10 60-6 130-60 190Z" fill="#cfe6b8" />
      <path d="M40 215c-8-50 6-100 40-135 8 50-6 100-40 135Z" fill="#a9d28a" opacity=".85" />
    </svg>

    <svg className="VideoMain__deco VideoMain__deco--leafRight" viewBox="0 0 120 220" aria-hidden="true">
      <path d="M110 210c10-70-20-140-60-190-10 60 6 130 60 190Z" fill="#cfe6b8" />
      <path d="M80 215c8-50-6-100-40-135-8 50 6 100 40 135Z" fill="#8fc66b" opacity=".85" />
    </svg>

    <span className="VideoMain__blob VideoMain__blob--one" aria-hidden="true" />
    <span className="VideoMain__blob VideoMain__blob--two" aria-hidden="true" />
  </>
);

/* ------------------------------ CARD ------------------------------- */
const VideoMainCard = ({ video, onOpen }) => {
  const [imgOk, setImgOk] = useState(Boolean(video.thumbnail));
  const [autoDuration, setAutoDuration] = useState("");
  const duration = video.duration || autoDuration;

  return (
    <button
      type="button"
      className="VideoMain__card"
      onClick={() => onOpen(video)}
      aria-label={`Play video: ${video.title}${duration ? `, duration ${duration}` : ""}`}
    >
      <span className="VideoMain__thumb">
        {imgOk ? (
          <img
            className="VideoMain__thumbImg"
            src={video.thumbnail}
            alt={video.title}
            loading="lazy"
            onError={() => setImgOk(false)}
          />
        ) : (
          video.src && (
            <video
              className="VideoMain__thumbImg"
              src={`${video.src}#t=0.8`}
              muted
              playsInline
              preload="metadata"
              tabIndex={-1}
              onLoadedMetadata={(e) => setAutoDuration(formatTime(e.currentTarget.duration))}
            />
          )
        )}
      </span>

      {duration && <span className="VideoMain__duration">{duration}</span>}

      <span className="VideoMain__playWrap">
        <span className="VideoMain__playBtn">
          <PlayIcon />
        </span>
      </span>

      <span className="VideoMain__caption">
        <span className="VideoMain__captionIcon">
          <Icon name={video.icon} />
        </span>
        <span className="VideoMain__captionTitle">{video.title}</span>
      </span>
    </button>
  );
};

const VideoMainSkeleton = () => (
  <div className="VideoMain__card VideoMain__card--skeleton" aria-hidden="true">
    <span className="VideoMain__skeletonBar" />
  </div>
);

/* ------------------------------ MODAL ------------------------------ */
const VideoMainModal = ({ video, onClose, onPrev, onNext, hasPrev, hasNext }) => {
  const closeRef = useRef(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return createPortal(
    <div
      className="VideoMain__modal"
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="VideoMain__modalBox">
        <div className="VideoMain__modalHead">
          <div className="VideoMain__modalMeta">
            <span className="VideoMain__modalBadge">Nanda Kidz Moments</span>
            <h3 className="VideoMain__modalTitle">{video.title}</h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="VideoMain__modalClose"
            onClick={onClose}
            aria-label="Close video"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="VideoMain__player">
          <video
            key={video.id}
            className="VideoMain__video"
            src={video.src}
            poster={video.thumbnail || undefined}
            controls
            autoPlay
            playsInline
            controlsList="nodownload"
          />
        </div>

        <div className="VideoMain__modalFoot">
          <button type="button" className="VideoMain__navBtn" onClick={onPrev} disabled={!hasPrev}>
            <ChevronLeft />
            <span className="VideoMain__navLabel">Previous</span>
          </button>
          {video.duration && <span className="VideoMain__modalDuration">{video.duration}</span>}
          <button type="button" className="VideoMain__navBtn" onClick={onNext} disabled={!hasNext}>
            <span className="VideoMain__navLabel">Next</span>
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

/* ---------------------------- PAGINATION --------------------------- */
const getPages = (current, total) => {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("…l");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("…r");
  pages.push(total);
  return pages;
};

/* ------------------------------ MAIN ------------------------------- */
const VideoMain = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const loadVideos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(VIDEOS_ENDPOINT, {
          cancelToken: source.token,
        });

        const rawList = Array.isArray(response.data)
          ? response.data
          : response.data?.data || [];

        // Exclusively fetch real videos saved in database that have status = 'published'
        const liveVideos = rawList
          .map(normalizeVideo)
          .filter((v) => v.src && v.status === "published");

        setVideos(liveVideos);
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error("Failed to fetch videos from server:", err);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();

    return () => {
      source.cancel("Component unmounted");
    };
  }, []);

  const totalPages = Math.max(1, Math.ceil(videos.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const visible = videos.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages || p === currentPage) return;
    setPage(p);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openVideo = (video) => setActiveIndex(videos.findIndex((v) => v.id === video.id));
  const closeVideo = useCallback(() => setActiveIndex(null), []);
  const prevVideo = useCallback(() => setActiveIndex((i) => (i > 0 ? i - 1 : i)), []);
  const nextVideo = useCallback(
    () => setActiveIndex((i) => (i < videos.length - 1 ? i + 1 : i)),
    [videos.length]
  );

  return (
    <section className="VideoMain" ref={sectionRef}>
      <Decorations />

      <div className="VideoMain__container">
        <header className="VideoMain__header">
          <span className="VideoMain__pill">Nanda Kidz Moments</span>

          <div className="VideoMain__titleRow">
            <span className="VideoMain__line" />
            <h2 className="VideoMain__title">Little Moments, Big Memories</h2>
            <span className="VideoMain__line" />
          </div>

          <p className="VideoMain__subtitle">
            At Nanda Kidz – The Little Kingdom, every day is filled with laughter, learning and love.
            <br className="VideoMain__br" /> Watch our little learners explore, play and grow together
            in a safe, happy and nurturing environment.
          </p>
        </header>

        {loading ? (
          <div className="VideoMain__grid">
            {Array.from({ length: PER_PAGE }, (_, i) => (
              <VideoMainSkeleton key={i} />
            ))}
          </div>
        ) : videos.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#666" }}>
            <p style={{ fontSize: "1.1rem" }}>No videos uploaded yet. Check back soon!</p>
          </div>
        ) : (
          <div className="VideoMain__grid">
            {visible.map((video) => (
              <VideoMainCard key={video.id} video={video} onOpen={openVideo} />
            ))}
          </div>
        )}

        {totalPages > 1 && !loading && (
          <nav className="VideoMain__pagination" aria-label="Video pages">
            <button
              type="button"
              className="VideoMain__pageBtn VideoMain__pageBtn--arrow"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <ChevronLeft />
            </button>

            {getPages(currentPage, totalPages).map((p) =>
              typeof p === "string" ? (
                <span key={p} className="VideoMain__dots">…</span>
              ) : (
                <button
                  key={p}
                  type="button"
                  className={`VideoMain__pageBtn${p === currentPage ? " VideoMain__pageBtn--active" : ""}`}
                  onClick={() => goToPage(p)}
                  aria-label={`Page ${p}`}
                  aria-current={p === currentPage ? "page" : undefined}
                >
                  {p}
                </button>
              )
            )}

            <button
              type="button"
              className="VideoMain__pageBtn VideoMain__pageBtn--arrow"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <ChevronRight />
            </button>
          </nav>
        )}
      </div>

      {activeIndex !== null && videos[activeIndex] && (
        <VideoMainModal
          video={videos[activeIndex]}
          onClose={closeVideo}
          onPrev={prevVideo}
          onNext={nextVideo}
          hasPrev={activeIndex > 0}
          hasNext={activeIndex < videos.length - 1}
        />
      )}
    </section>
  );
};

export default VideoMain;
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import API, { IMG_URL } from "../../api/axios"; // adjust path to your axios file
import "./VideoManagement.css";

/* ====================================================================
   CONFIG
==================================================================== */
const MAX_VIDEO_MB = 100;
const MAX_THUMB_MB = 5;
const VIDEO_EXT = ["mp4", "mov", "avi", "webm"];
const THUMB_TYPES = ["image/jpeg", "image/png", "image/webp"];
const PER_PAGE_LIST = 4;
const PER_PAGE_GRID = 8;

/* ====================================================================
   API SERVICE (uses your shared axios instance)
==================================================================== */
// Pull a readable message out of any axios error
const getErrorMessage = (err, fallback = "Something went wrong") => {
  if (axios.isCancel(err)) return null;
  if (err.response) {
    return err.response.data?.message || err.response.data?.error || `${fallback} (${err.response.status})`;
  }
  if (err.code === "ECONNABORTED") return "Request timed out. Please try again.";
  if (err.request) return "Cannot reach the server. Check that the backend is running.";
  return err.message || fallback;
};

// Make sure every video always has `_id`
const normalize = (v) => ({ ...v, _id: v._id || v.id });

const videoApi = {
  getAll: async (signal) => {
    const { data } = await API.get("/videos", { signal });
    if (data && data.success === false) throw new Error(data.message || "Failed to load videos");
    const list = Array.isArray(data) ? data : data.data || [];
    return list.map(normalize);
  },

  create: async (formData, { onProgress, signal } = {}) => {
    const { data } = await API.post("/videos", formData, {
      signal,
      timeout: 0, // no timeout for large uploads
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      onUploadProgress: (e) => {
        if (onProgress && e.total) onProgress(Math.round((e.loaded * 100) / e.total));
      },
    });
    if (data && data.success === false) throw new Error(data.message || "Failed to upload video");
    return normalize(data.data);
  },

  update: async (id, formData, { signal } = {}) => {
    const { data } = await API.put(`/videos/${id}`, formData, { signal, timeout: 60000 });
    if (data && data.success === false) throw new Error(data.message || "Failed to update video");
    return normalize(data.data);
  },

  remove: async (id, { signal } = {}) => {
    const { data } = await API.delete(`/videos/${id}`, { signal });
    if (data && data.success === false) throw new Error(data.message || "Failed to delete video");
    return true;
  },
};

/* ====================================================================
   HELPERS
==================================================================== */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

const fmtDuration = (sec) => {
  const total = Math.max(0, Math.round(Number(sec) || 0));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
};

const fmtSize = (mb) => {
  if (!mb) return "0 MB";
  if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`;
  return `${mb.toFixed(mb < 10 ? 1 : 0)} MB`;
};

const fmtDate = (d) => {
  if (!d) return "";
  const date = new Date(d);
  let h = date.getHours();
  const ampm = h >= 12 ? "pm" : "am";
  h = h % 12 || 12;
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${String(date.getDate()).padStart(2, "0")} ${MONTHS[date.getMonth()]} ${date.getFullYear()}, ${String(h).padStart(2, "0")}:${min} ${ampm}`;
};

const hashOf = (value) =>
  String(value)
    .split("")
    .reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

const TONES = ["violet", "blue", "pink", "teal", "amber", "green"];
const toneOf = (category = "") => TONES[hashOf(category.toLowerCase()) % TONES.length];

const extOf = (name = "") => (name.split(".").pop() || "").toLowerCase();

const readVideoMeta = (url) =>
  new Promise((resolve) => {
    const video = document.createElement("video");
    let done = false;
    const finish = (frame = "") => {
      if (done) return;
      done = true;
      resolve({ duration: Number.isFinite(video.duration) ? video.duration : 0, frame });
      video.removeAttribute("src");
      video.load();
    };

    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;
    video.onloadedmetadata = () => {
      video.currentTime = Math.min(1, (video.duration || 2) / 2);
    };
    video.onseeked = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 480;
        canvas.height = Math.round(480 * ((video.videoHeight || 9) / (video.videoWidth || 16)));
        canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
        finish(canvas.toDataURL("image/jpeg", 0.8));
      } catch (e) {
        finish("");
      }
    };
    video.onerror = () => finish("");
    setTimeout(() => finish(""), 5000);
    video.src = url;
  });

/* ====================================================================
   ICONS
==================================================================== */
const ICONS = {
  play: <polygon points="6 4 20 12 6 20 6 4" fill="currentColor" />,
  playCircle: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
    </>
  ),
  check: <polyline points="20 6 9 17 4 12" />,
  file: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </>
  ),
  plus: (
    <>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </>
  ),
  cloud: (
    <>
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  list: (
    <>
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </>
  ),
  eye: (
    <>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  edit: (
    <>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </>
  ),
  trash: (
    <>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </>
  ),
  trend: (
    <>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </>
  ),
  left: <polyline points="15 18 9 12 15 6" />,
  right: <polyline points="9 18 15 12 9 6" />,
  x: (
    <>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </>
  ),
  tag: (
    <>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </>
  ),
  drive: (
    <>
      <line x1="22" y1="12" x2="2" y2="12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      <line x1="6" y1="16" x2="6.01" y2="16" />
    </>
  ),
  alert: (
    <>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </>
  ),
};

const Icon = ({ name, size = 18, className = "" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {ICONS[name]}
  </svg>
);

const getFullUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("blob:") || path.startsWith("data:"))
    return path;
  return `${IMG_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};

/* ====================================================================
   SMALL COMPONENTS
==================================================================== */
const Thumb = ({ video, withDuration = true }) => {
  const [imgOk, setImgOk] = useState(true);
  const hue = (hashOf(video._id || video.id) * 47) % 360;
  const thumbUrl = getFullUrl(video.thumbnailUrl || video.thumbnail);
  const videoUrl = getFullUrl(video.videoUrl || video.src);

  // reset error flag when the thumbnail source changes (e.g. after edit)
  useEffect(() => {
    setImgOk(true);
  }, [thumbUrl]);

  return (
    <span className="VideoManagement__thumb" style={{ "--vmg-hue": hue }}>
      {thumbUrl && imgOk ? (
        <img src={thumbUrl} alt="" loading="lazy" onError={() => setImgOk(false)} />
      ) : (
        videoUrl && <video src={`${videoUrl}#t=0.8`} muted playsInline preload="metadata" tabIndex={-1} />
      )}
      {withDuration && <span className="VideoManagement__thumbTime">{fmtDuration(video.duration)}</span>}
    </span>
  );
};

const StatusBadge = ({ status }) => (
  <span className={`VideoManagement__status VideoManagement__status--${status}`}>
    <i className="VideoManagement__statusDot" />
    {status === "published" ? "Published" : "Draft"}
  </span>
);

const CategoryPill = ({ name }) => (
  <span className={`VideoManagement__pill VideoManagement__pill--${toneOf(name)}`}>{name}</span>
);

const Modal = ({ onClose, className = "", label, children }) => {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="VideoManagement__overlay"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`VideoManagement__modal ${className}`}>{children}</div>
    </div>,
    document.body
  );
};

const ModalHead = ({ icon, title, subtitle, onClose }) => (
  <div className="VideoManagement__modalHead">
    <span className="VideoManagement__modalIcon">
      <Icon name={icon} size={20} />
    </span>
    <div className="VideoManagement__modalHeadText">
      <h3 className="VideoManagement__modalTitle">{title}</h3>
      {subtitle && <p className="VideoManagement__modalSub">{subtitle}</p>}
    </div>
    <button type="button" className="VideoManagement__modalClose" onClick={onClose} aria-label="Close">
      <Icon name="x" size={18} />
    </button>
  </div>
);

const Toasts = ({ items, onDismiss }) =>
  createPortal(
    <div className="VideoManagement__toasts" aria-live="polite">
      {items.map((t) => (
        <div key={t.id} className={`VideoManagement__toast VideoManagement__toast--${t.type}`}>
          <Icon name={t.type === "error" ? "alert" : t.type === "info" ? "info" : "check"} size={18} />
          <span className="VideoManagement__toastText">{t.text}</span>
          <button
            type="button"
            className="VideoManagement__toastClose"
            onClick={() => onDismiss(t.id)}
            aria-label="Dismiss"
          >
            <Icon name="x" size={14} />
          </button>
        </div>
      ))}
    </div>,
    document.body
  );

const DropZone = ({ accept, onFile, disabled, children, className = "" }) => {
  const [over, setOver] = useState(false);
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setOver(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(file);
  };

  return (
    <div
      className={`VideoManagement__drop ${className}${over ? " VideoManagement__drop--over" : ""}`}
      role="button"
      tabIndex={0}
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && !disabled && inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
          e.target.value = "";
        }}
      />
      {children}
    </div>
  );
};

/* ====================================================================
   MODALS
==================================================================== */
const ViewModal = ({ video, onClose, onEdit }) => (
  <Modal onClose={onClose} className="VideoManagement__modal--view" label={`Preview ${video.title}`}>
    <ModalHead icon="playCircle" title={video.title} subtitle="Video preview" onClose={onClose} />
    <div className="VideoManagement__player">
      <video
        key={video._id}
        className="VideoManagement__playerVideo"
        src={getFullUrl(video.videoUrl)}
        poster={getFullUrl(video.thumbnailUrl) || undefined}
        controls
        autoPlay
        playsInline
        controlsList="nodownload"
      />
    </div>
    <div className="VideoManagement__details">
      <div className="VideoManagement__detail">
        <span className="VideoManagement__detailLabel"><Icon name="tag" size={14} /> Category</span>
        <CategoryPill name={video.category} />
      </div>
      <div className="VideoManagement__detail">
        <span className="VideoManagement__detailLabel"><Icon name="check" size={14} /> Status</span>
        <StatusBadge status={video.status} />
      </div>
      <div className="VideoManagement__detail">
        <span className="VideoManagement__detailLabel"><Icon name="clock" size={14} /> Duration</span>
        <strong className="VideoManagement__detailValue">{fmtDuration(video.duration)}</strong>
      </div>
      <div className="VideoManagement__detail">
        <span className="VideoManagement__detailLabel"><Icon name="drive" size={14} /> File size</span>
        <strong className="VideoManagement__detailValue">{fmtSize(video.sizeMB)}</strong>
      </div>
      <div className="VideoManagement__detail VideoManagement__detail--wide">
        <span className="VideoManagement__detailLabel"><Icon name="calendar" size={14} /> Uploaded on</span>
        <strong className="VideoManagement__detailValue">{fmtDate(video.createdAt)}</strong>
      </div>
    </div>
    <div className="VideoManagement__modalFoot">
      <button type="button" className="VideoManagement__btn VideoManagement__btn--ghost" onClick={onClose}>
        Close
      </button>
      <button type="button" className="VideoManagement__btn VideoManagement__btn--primary" onClick={onEdit}>
        <Icon name="edit" size={16} /> Edit video
      </button>
    </div>
  </Modal>
);

const EditModal = ({ video, onClose, onSave, onError, saving }) => {
  const [title, setTitle] = useState(video.title);
  const [category, setCategory] = useState(video.category);
  const [status, setStatus] = useState(video.status);
  const [thumb, setThumb] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => () => thumb && URL.revokeObjectURL(thumb.url), [thumb]);

  const pickThumb = (file) => {
    if (!THUMB_TYPES.includes(file.type)) return onError("Thumbnail must be JPG, PNG or WebP.");
    if (file.size > MAX_THUMB_MB * 1048576) return onError(`Thumbnail must be under ${MAX_THUMB_MB} MB.`);
    setThumb({ file, url: URL.createObjectURL(file) });
  };

  const submit = (e) => {
    e.preventDefault();
    if (saving) return;
    const next = {};
    if (!title.trim()) next.title = "Video title is required";
    if (!category.trim()) next.category = "Category is required";
    setErrors(next);
    if (Object.keys(next).length) return;

    onSave({
      title: title.trim(),
      category: category.trim(),
      status,
      thumbFile: thumb ? thumb.file : null,
    });
  };

  return (
    <Modal onClose={saving ? () => {} : onClose} className="VideoManagement__modal--edit" label="Edit video">
      <ModalHead icon="edit" title="Edit video" subtitle="Update video details" onClose={onClose} />
      <form className="VideoManagement__editForm" onSubmit={submit} noValidate>
        <div className="VideoManagement__field">
          <label className="VideoManagement__label" htmlFor="vmg-edit-title">
            Video Title <em>*</em>
          </label>
          <input
            id="vmg-edit-title"
            className={`VideoManagement__input${errors.title ? " VideoManagement__input--error" : ""}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={80}
            placeholder="Enter video title"
            disabled={saving}
          />
          {errors.title && <span className="VideoManagement__error">{errors.title}</span>}
        </div>

        <div className="VideoManagement__field">
          <label className="VideoManagement__label" htmlFor="vmg-edit-category">
            Category <em>*</em>
          </label>
          <input
            id="vmg-edit-category"
            className={`VideoManagement__input${errors.category ? " VideoManagement__input--error" : ""}`}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            maxLength={30}
            placeholder="Type your own category"
            disabled={saving}
          />
          {errors.category && <span className="VideoManagement__error">{errors.category}</span>}
        </div>

        <div className="VideoManagement__field">
          <span className="VideoManagement__label">Status</span>
          <div className="VideoManagement__segment" role="radiogroup">
            {["published", "draft"].map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={status === s}
                disabled={saving}
                className={`VideoManagement__segmentBtn${status === s ? " VideoManagement__segmentBtn--active" : ""}`}
                onClick={() => setStatus(s)}
              >
                <i className={`VideoManagement__statusDot VideoManagement__statusDot--${s}`} />
                {s === "published" ? "Published" : "Draft"}
              </button>
            ))}
          </div>
        </div>

        <div className="VideoManagement__field">
          <span className="VideoManagement__label">Thumbnail (Optional)</span>
          <div className="VideoManagement__editThumb">
            <span className="VideoManagement__editThumbPreview">
              <Thumb video={{ ...video, thumbnailUrl: thumb ? thumb.url : video.thumbnailUrl }} withDuration={false} />
            </span>
            <DropZone
              accept={THUMB_TYPES.join(",")}
              onFile={pickThumb}
              disabled={saving}
              className="VideoManagement__drop--compact"
            >
              <Icon name="image" size={20} />
              <span className="VideoManagement__dropText">{thumb ? thumb.file.name : "Replace thumbnail"}</span>
              <span className="VideoManagement__dropHint">JPG, PNG, WEBP (Max {MAX_THUMB_MB}MB)</span>
            </DropZone>
          </div>
        </div>

        <div className="VideoManagement__modalFoot">
          <button
            type="button"
            className="VideoManagement__btn VideoManagement__btn--ghost"
            onClick={onClose}
            disabled={saving}
          >
            Cancel
          </button>
          <button type="submit" className="VideoManagement__btn VideoManagement__btn--primary" disabled={saving}>
            <Icon name="check" size={16} /> {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

const DeleteModal = ({ video, onClose, onConfirm, deleting }) => (
  <Modal onClose={deleting ? () => {} : onClose} className="VideoManagement__modal--delete" label="Delete video">
    <div className="VideoManagement__deleteBody">
      <span className="VideoManagement__deleteIcon">
        <Icon name="trash" size={28} />
      </span>
      <h3 className="VideoManagement__deleteTitle">Delete this video?</h3>
      <p className="VideoManagement__deleteText">
        You are about to delete <strong>“{video.title}”</strong>. This action cannot be undone.
      </p>
      <div className="VideoManagement__deleteMeta">
        <Thumb video={video} />
        <div>
          <CategoryPill name={video.category} />
          <span className="VideoManagement__deleteSize">{fmtSize(video.sizeMB)} will be freed</span>
        </div>
      </div>
    </div>
    <div className="VideoManagement__modalFoot VideoManagement__modalFoot--center">
      <button
        type="button"
        className="VideoManagement__btn VideoManagement__btn--ghost"
        onClick={onClose}
        disabled={deleting}
      >
        Cancel
      </button>
      <button
        type="button"
        className="VideoManagement__btn VideoManagement__btn--danger"
        onClick={onConfirm}
        disabled={deleting}
      >
        <Icon name="trash" size={16} /> {deleting ? "Deleting..." : "Yes, delete"}
      </button>
    </div>
  </Modal>
);

const getPages = (current, total) => {
  if (total <= 6) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) pages.push("…l");
  for (let i = start; i <= end; i++) pages.push(i);
  if (end < total - 1) pages.push("…r");
  pages.push(total);
  return pages;
};

/* ====================================================================
   MAIN COMPONENT
==================================================================== */
const VideoManagement = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  /* Form */
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [publish, setPublish] = useState(true);
  const [videoFile, setVideoFile] = useState(null);
  const [thumbFile, setThumbFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(null);

  /* Request state */
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  /* Controls */
  const [query, setQuery] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [view, setView] = useState("list");
  const [page, setPage] = useState(1);

  /* Modals + Toasts */
  const [modal, setModal] = useState(null);
  const [toasts, setToasts] = useState([]);

  /* Refs (cleanup safety) */
  const uploadAbortRef = useRef(null);
  const videoFileRef = useRef(null);
  const thumbFileRef = useRef(null);
  videoFileRef.current = videoFile;
  thumbFileRef.current = thumbFile;

  const notify = useCallback((text, type = "success") => {
    if (!text) return;
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((list) => [...list, { id, text, type }]);
    setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), 3600);
  }, []);

  const dismissToast = (id) => setToasts((list) => list.filter((t) => t.id !== id));

  /* Fetch videos */
  const fetchVideos = useCallback(
    async (signal) => {
      try {
        setLoading(true);
        setLoadError("");
        const list = await videoApi.getAll(signal);
        setVideos(list);
      } catch (err) {
        const msg = getErrorMessage(err, "Failed to load videos");
        if (msg) {
          setLoadError(msg);
          notify(msg, "error");
        }
      } finally {
        if (!signal || !signal.aborted) setLoading(false);
      }
    },
    [notify]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchVideos(controller.signal);
    return () => controller.abort();
  }, [fetchVideos]);

  /* Cleanup on unmount: abort running upload + free blob URLs */
  useEffect(
    () => () => {
      uploadAbortRef.current?.abort();
      if (videoFileRef.current) URL.revokeObjectURL(videoFileRef.current.url);
      if (thumbFileRef.current) URL.revokeObjectURL(thumbFileRef.current.url);
    },
    []
  );

  const categories = useMemo(() => [...new Set(videos.map((v) => v.category))].filter(Boolean).sort(), [videos]);

  const stats = useMemo(() => {
    const published = videos.filter((v) => v.status === "published").length;
    const storage = videos.reduce((a, v) => a + (v.sizeMB || 0), 0);
    return {
      total: videos.length,
      published,
      drafts: videos.length - published,
      storage,
    };
  }, [videos]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return videos
      .filter((v) => (q ? (v.title || "").toLowerCase().includes(q) : true))
      .filter((v) => (catFilter === "all" ? true : v.category === catFilter))
      .filter((v) => (statusFilter === "all" ? true : v.status === statusFilter))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [videos, query, catFilter, statusFilter]);

  const perPage = view === "grid" ? PER_PAGE_GRID : PER_PAGE_LIST;
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * perPage;
  const visible = filtered.slice(startIndex, startIndex + perPage);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages || p === currentPage) return;
    setPage(p);
  };

  /* Picker handlers */
  const pickVideo = async (file) => {
    const okType = file.type.startsWith("video/") || VIDEO_EXT.includes(extOf(file.name));
    if (!okType) {
      setErrors((e) => ({ ...e, video: "Unsupported format. Use MP4, MOV, AVI or WebM." }));
      return;
    }
    if (file.size > MAX_VIDEO_MB * 1048576) {
      setErrors((e) => ({ ...e, video: `File is too large. Max ${MAX_VIDEO_MB}MB allowed.` }));
      return;
    }
    if (videoFile) URL.revokeObjectURL(videoFile.url);
    const url = URL.createObjectURL(file);
    setErrors((e) => ({ ...e, video: undefined }));
    setVideoFile({ file, url, duration: 0, frame: "" });
    const meta = await readVideoMeta(url);
    setVideoFile((cur) => (cur && cur.url === url ? { ...cur, ...meta } : cur));
  };

  const pickThumb = (file) => {
    if (!THUMB_TYPES.includes(file.type)) {
      setErrors((e) => ({ ...e, thumb: "Thumbnail must be JPG, PNG or WebP." }));
      return;
    }
    if (file.size > MAX_THUMB_MB * 1048576) {
      setErrors((e) => ({ ...e, thumb: `Thumbnail must be under ${MAX_THUMB_MB}MB.` }));
      return;
    }
    if (thumbFile) URL.revokeObjectURL(thumbFile.url);
    setErrors((e) => ({ ...e, thumb: undefined }));
    setThumbFile({ file, url: URL.createObjectURL(file) });
  };

  /* CREATE (upload with progress) */
  const handleUpload = async (e) => {
    e.preventDefault();
    if (progress !== null) return;

    const next = {};
    if (!title.trim()) next.title = "Video title is required";
    if (!category.trim()) next.category = "Category is required";
    if (!videoFile) next.video = "Please choose a video file";
    setErrors(next);
    if (Object.keys(next).length) return;

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("category", category.trim());
    formData.append("status", publish ? "published" : "draft");
    formData.append("duration", Math.round(videoFile.duration || 0));
    formData.append("video", videoFile.file);
    if (thumbFile) formData.append("thumbnail", thumbFile.file);

    const controller = new AbortController();
    uploadAbortRef.current = controller;
    setProgress(0);

    try {
      const created = await videoApi.create(formData, {
        signal: controller.signal,
        onProgress: setProgress,
      });

      setVideos((prev) => [created, ...prev]);
      if (videoFile) URL.revokeObjectURL(videoFile.url);
      if (thumbFile) URL.revokeObjectURL(thumbFile.url);
      setTitle("");
      setCategory("");
      setPublish(true);
      setVideoFile(null);
      setThumbFile(null);
      setErrors({});
      setPage(1);
      notify(`“${created.title}” uploaded successfully`);
    } catch (err) {
      notify(getErrorMessage(err, "Failed to upload video"), "error");
    } finally {
      uploadAbortRef.current = null;
      setProgress(null);
    }
  };

  /* UPDATE */
  const saveEdit = async (changes) => {
    if (!modal || saving) return;
    const formData = new FormData();
    formData.append("title", changes.title);
    formData.append("category", changes.category);
    formData.append("status", changes.status);
    if (changes.thumbFile) formData.append("thumbnail", changes.thumbFile);

    try {
      setSaving(true);
      const updated = await videoApi.update(modal.id, formData);
      setVideos((list) => list.map((v) => (v._id === modal.id ? { ...v, ...updated } : v)));
      setModal(null);
      notify("Video updated successfully");
    } catch (err) {
      notify(getErrorMessage(err, "Error updating video"), "error");
    } finally {
      setSaving(false);
    }
  };

  /* DELETE */
  const confirmDelete = async () => {
    if (!modal || deleting) return;
    try {
      setDeleting(true);
      await videoApi.remove(modal.id);
      setVideos((list) => list.filter((v) => v._id !== modal.id));
      setModal(null);
      notify("Video deleted successfully");
    } catch (err) {
      notify(getErrorMessage(err, "Could not delete video"), "error");
    } finally {
      setDeleting(false);
    }
  };

  const activeVideo = modal ? videos.find((v) => v._id === modal.id) : null;
  const closeModal = useCallback(() => setModal(null), []);
  const uploading = progress !== null;

  const renderActions = (video) => (
    <div className="VideoManagement__actions">
      <button
        type="button"
        className="VideoManagement__action VideoManagement__action--view"
        onClick={() => setModal({ type: "view", id: video._id })}
        aria-label={`View ${video.title}`}
        title="View"
      >
        <Icon name="eye" size={16} />
      </button>
      <button
        type="button"
        className="VideoManagement__action VideoManagement__action--edit"
        onClick={() => setModal({ type: "edit", id: video._id })}
        aria-label={`Edit ${video.title}`}
        title="Edit"
      >
        <Icon name="edit" size={16} />
      </button>
      <button
        type="button"
        className="VideoManagement__action VideoManagement__action--delete"
        onClick={() => setModal({ type: "delete", id: video._id })}
        aria-label={`Delete ${video.title}`}
        title="Delete"
      >
        <Icon name="trash" size={16} />
      </button>
    </div>
  );

  return (
    <div className="VideoManagement">
      <div className="VideoManagement__container">
        {/* STATS */}
        <section className="VideoManagement__stats" aria-label="Video statistics">
          <article className="VideoManagement__stat">
            <span className="VideoManagement__statIcon VideoManagement__statIcon--violet">
              <Icon name="playCircle" size={26} />
            </span>
            <div className="VideoManagement__statBody">
              <span className="VideoManagement__statLabel">Total Videos</span>
              <strong className="VideoManagement__statValue">{stats.total}</strong>
            </div>
          </article>

          <article className="VideoManagement__stat">
            <span className="VideoManagement__statIcon VideoManagement__statIcon--green">
              <Icon name="check" size={26} />
            </span>
            <div className="VideoManagement__statBody">
              <span className="VideoManagement__statLabel">Published</span>
              <strong className="VideoManagement__statValue">{stats.published}</strong>
            </div>
          </article>

          <article className="VideoManagement__stat">
            <span className="VideoManagement__statIcon VideoManagement__statIcon--orange">
              <Icon name="file" size={26} />
            </span>
            <div className="VideoManagement__statBody">
              <span className="VideoManagement__statLabel">Drafts</span>
              <strong className="VideoManagement__statValue">{stats.drafts}</strong>
            </div>
          </article>

          <article className="VideoManagement__stat">
            <span className="VideoManagement__statIcon VideoManagement__statIcon--indigo">
              <Icon name="database" size={26} />
            </span>
            <div className="VideoManagement__statBody">
              <span className="VideoManagement__statLabel">Storage Used</span>
              <strong className="VideoManagement__statValue">{fmtSize(stats.storage)}</strong>
            </div>
          </article>
        </section>

        {/* ADD NEW VIDEO FORM */}
        <section className="VideoManagement__card VideoManagement__add">
          <header className="VideoManagement__cardHead">
            <span className="VideoManagement__cardIcon">
              <Icon name="plus" size={18} />
            </span>
            <h2 className="VideoManagement__cardTitle">Add New Video</h2>
          </header>

          <form className="VideoManagement__form" onSubmit={handleUpload} noValidate>
            <div className="VideoManagement__formTop">
              <div className="VideoManagement__field">
                <label className="VideoManagement__label" htmlFor="vmg-title">
                  Video Title <em>*</em>
                </label>
                <input
                  id="vmg-title"
                  className={`VideoManagement__input${errors.title ? " VideoManagement__input--error" : ""}`}
                  type="text"
                  placeholder="Enter video title"
                  value={title}
                  maxLength={80}
                  disabled={uploading}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setErrors((er) => ({ ...er, title: undefined }));
                  }}
                />
                {errors.title && <span className="VideoManagement__error">{errors.title}</span>}
              </div>

              <div className="VideoManagement__field">
                <label className="VideoManagement__label" htmlFor="vmg-category">
                  Category <em>*</em>
                </label>
                <input
                  id="vmg-category"
                  className={`VideoManagement__input${errors.category ? " VideoManagement__input--error" : ""}`}
                  type="text"
                  placeholder="Type your own category"
                  value={category}
                  maxLength={30}
                  disabled={uploading}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setErrors((er) => ({ ...er, category: undefined }));
                  }}
                />
                {errors.category && <span className="VideoManagement__error">{errors.category}</span>}
              </div>

              <label className="VideoManagement__switch">
                <input
                  type="checkbox"
                  className="VideoManagement__switchInput"
                  checked={publish}
                  disabled={uploading}
                  onChange={(e) => setPublish(e.target.checked)}
                />
                <span className="VideoManagement__switchTrack" aria-hidden="true">
                  <span className="VideoManagement__switchThumb" />
                </span>
                <span className="VideoManagement__switchText">
                  <strong>Publish immediately</strong>
                  <small>{publish ? "Make it visible on website" : "It will be saved as a draft"}</small>
                </span>
              </label>
            </div>

            <div className="VideoManagement__formBottom">
              <div className="VideoManagement__field">
                <span className="VideoManagement__label">
                  Video File <em>*</em>
                </span>
                <DropZone
                  accept=".mp4,.mov,.avi,.webm,video/*"
                  onFile={pickVideo}
                  disabled={uploading}
                  className={errors.video ? "VideoManagement__drop--error" : ""}
                >
                  {videoFile ? (
                    <div className="VideoManagement__picked">
                      <span className="VideoManagement__pickedThumb">
                        {videoFile.frame ? <img src={videoFile.frame} alt="" /> : <Icon name="playCircle" size={26} />}
                      </span>
                      <span className="VideoManagement__pickedInfo">
                        <strong className="VideoManagement__pickedName">{videoFile.file.name}</strong>
                        <small>
                          {fmtSize(videoFile.file.size / 1048576)}
                          {videoFile.duration > 0 && ` • ${fmtDuration(videoFile.duration)}`}
                        </small>
                      </span>
                      {!uploading && (
                        <button
                          type="button"
                          className="VideoManagement__pickedRemove"
                          onClick={(e) => {
                            e.stopPropagation();
                            URL.revokeObjectURL(videoFile.url);
                            setVideoFile(null);
                          }}
                        >
                          <Icon name="x" size={14} />
                        </button>
                      )}
                    </div>
                  ) : (
                    <>
                      <Icon name="cloud" size={34} className="VideoManagement__dropIcon" />
                      <span className="VideoManagement__dropText">Click to upload or drag and drop</span>
                      <span className="VideoManagement__dropHint">
                        Supports: MP4, MOV, AVI, WebM (Max {MAX_VIDEO_MB}MB)
                      </span>
                    </>
                  )}
                </DropZone>
                {errors.video && <span className="VideoManagement__error">{errors.video}</span>}
              </div>

              <div className="VideoManagement__field">
                <span className="VideoManagement__label">Thumbnail Image (Optional)</span>
                <DropZone
                  accept={THUMB_TYPES.join(",")}
                  onFile={pickThumb}
                  disabled={uploading}
                  className={`VideoManagement__drop--thumb${errors.thumb ? " VideoManagement__drop--error" : ""}`}
                >
                  {thumbFile ? (
                    <div className="VideoManagement__picked VideoManagement__picked--thumb">
                      <span className="VideoManagement__pickedThumb VideoManagement__pickedThumb--big">
                        <img src={thumbFile.url} alt="" />
                      </span>
                      <span className="VideoManagement__pickedInfo">
                        <strong className="VideoManagement__pickedName">{thumbFile.file.name}</strong>
                        <small>{fmtSize(thumbFile.file.size / 1048576)}</small>
                      </span>
                      {!uploading && (
                        <button
                          type="button"
                          className="VideoManagement__pickedRemove"
                          onClick={(e) => {
                            e.stopPropagation();
                            URL.revokeObjectURL(thumbFile.url);
                            setThumbFile(null);
                          }}
                        >
                          <Icon name="x" size={14} />
                        </button>
                      )}
                    </div>
                  ) : (
                    <>
                      <Icon
                        name="image"
                        size={30}
                        className="VideoManagement__dropIcon VideoManagement__dropIcon--muted"
                      />
                      <span className="VideoManagement__dropText VideoManagement__dropText--dark">
                        Upload thumbnail image
                      </span>
                      <span className="VideoManagement__dropHint">JPG, PNG, WEBP (Max {MAX_THUMB_MB}MB)</span>
                    </>
                  )}
                </DropZone>
                {errors.thumb && <span className="VideoManagement__error">{errors.thumb}</span>}
              </div>

              <div className="VideoManagement__submitWrap">
                <button type="submit" className="VideoManagement__upload" disabled={uploading}>
                  {uploading && <span className="VideoManagement__uploadFill" style={{ width: `${progress}%` }} />}
                  <span className="VideoManagement__uploadLabel">
                    <Icon name="cloud" size={20} />
                    {uploading ? (progress >= 100 ? "Processing..." : `Uploading ${progress}%`) : "Upload Video"}
                  </span>
                </button>
              </div>
            </div>
          </form>
        </section>

        {/* VIDEO LIST */}
        <section className="VideoManagement__card VideoManagement__list">
          <header className="VideoManagement__listHead">
            <div className="VideoManagement__listTitleWrap">
              <span className="VideoManagement__cardIcon VideoManagement__cardIcon--dark">
                <Icon name="playCircle" size={18} />
              </span>
              <h2 className="VideoManagement__cardTitle">
                Video List <small>({videos.length} videos)</small>
              </h2>
            </div>

            <div className="VideoManagement__tools">
              <label className="VideoManagement__search">
                <Icon name="search" size={16} />
                <input
                  type="search"
                  placeholder="Search by title..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                />
              </label>

              <select
                className="VideoManagement__select"
                value={catFilter}
                onChange={(e) => {
                  setCatFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <select
                className="VideoManagement__select VideoManagement__select--status"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>

              <div className="VideoManagement__viewToggle">
                <button
                  type="button"
                  className={`VideoManagement__viewBtn${view === "grid" ? " VideoManagement__viewBtn--active" : ""}`}
                  onClick={() => {
                    setView("grid");
                    setPage(1);
                  }}
                >
                  <Icon name="grid" size={16} />
                </button>
                <button
                  type="button"
                  className={`VideoManagement__viewBtn${view === "list" ? " VideoManagement__viewBtn--active" : ""}`}
                  onClick={() => {
                    setView("list");
                    setPage(1);
                  }}
                >
                  <Icon name="list" size={16} />
                </button>
              </div>
            </div>
          </header>

          {loading ? (
            <div className="VideoManagement__empty">
              <p className="VideoManagement__emptyText">Loading videos...</p>
            </div>
          ) : loadError && videos.length === 0 ? (
            <div className="VideoManagement__empty">
              <span className="VideoManagement__emptyIcon">
                <Icon name="alert" size={28} />
              </span>
              <h3 className="VideoManagement__emptyTitle">Could not load videos</h3>
              <p className="VideoManagement__emptyText">{loadError}</p>
              <button
                type="button"
                className="VideoManagement__btn VideoManagement__btn--primary"
                onClick={() => fetchVideos()}
              >
                Try again
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="VideoManagement__empty">
              <span className="VideoManagement__emptyIcon">
                <Icon name="search" size={28} />
              </span>
              <h3 className="VideoManagement__emptyTitle">No videos found</h3>
              <p className="VideoManagement__emptyText">Try a different search or clear the filters.</p>
            </div>
          ) : view === "list" ? (
            <div className="VideoManagement__tableWrap">
              <table className="VideoManagement__table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Thumbnail</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Uploaded On</th>
                    <th className="VideoManagement__thActions">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((v, i) => (
                    <tr key={v._id}>
                      <td>{startIndex + i + 1}</td>
                      <td><Thumb video={v} /></td>
                      <td className="VideoManagement__cellTitle">{v.title}</td>
                      <td><CategoryPill name={v.category} /></td>
                      <td>{fmtDuration(v.duration)}</td>
                      <td><StatusBadge status={v.status} /></td>
                      <td className="VideoManagement__cellDate">{fmtDate(v.createdAt)}</td>
                      <td>{renderActions(v)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="VideoManagement__gridView">
              {visible.map((v) => (
                <article className="VideoManagement__gridCard" key={v._id}>
                  <button
                    type="button"
                    className="VideoManagement__gridMedia"
                    onClick={() => setModal({ type: "view", id: v._id })}
                  >
                    <Thumb video={v} />
                    <span className="VideoManagement__gridPlay">
                      <Icon name="play" size={20} />
                    </span>
                  </button>
                  <div className="VideoManagement__gridBody">
                    <h3 className="VideoManagement__gridTitle">{v.title}</h3>
                    <div className="VideoManagement__gridMeta">
                      <CategoryPill name={v.category} />
                      <StatusBadge status={v.status} />
                    </div>
                    <span className="VideoManagement__gridDate">
                      <Icon name="calendar" size={13} /> {fmtDate(v.createdAt)}
                    </span>
                    {renderActions(v)}
                  </div>
                </article>
              ))}
            </div>
          )}

          {filtered.length > 0 && (
            <footer className="VideoManagement__listFoot">
              <p className="VideoManagement__showing">
                Showing {startIndex + 1} to {Math.min(startIndex + perPage, filtered.length)} of {filtered.length} videos
              </p>

              <nav className="VideoManagement__pagination">
                <button
                  type="button"
                  className="VideoManagement__pageBtn"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <Icon name="left" size={16} />
                </button>
                {getPages(currentPage, totalPages).map((p, idx) =>
                  typeof p === "string" ? (
                    <span key={`${p}-${idx}`} className="VideoManagement__dots">…</span>
                  ) : (
                    <button
                      key={p}
                      type="button"
                      className={`VideoManagement__pageBtn${p === currentPage ? " VideoManagement__pageBtn--active" : ""}`}
                      onClick={() => goToPage(p)}
                    >
                      {p}
                    </button>
                  )
                )}
                <button
                  type="button"
                  className="VideoManagement__pageBtn"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <Icon name="right" size={16} />
                </button>
              </nav>
            </footer>
          )}
        </section>
      </div>

      {modal && activeVideo && modal.type === "view" && (
        <ViewModal
          video={activeVideo}
          onClose={closeModal}
          onEdit={() => setModal({ type: "edit", id: activeVideo._id })}
        />
      )}
      {modal && activeVideo && modal.type === "edit" && (
        <EditModal
          video={activeVideo}
          onClose={closeModal}
          onSave={saveEdit}
          onError={(msg) => notify(msg, "error")}
          saving={saving}
        />
      )}
      {modal && activeVideo && modal.type === "delete" && (
        <DeleteModal video={activeVideo} onClose={closeModal} onConfirm={confirmDelete} deleting={deleting} />
      )}

      <Toasts items={toasts} onDismiss={dismissToast} />
    </div>
  );
};

export default VideoManagement;
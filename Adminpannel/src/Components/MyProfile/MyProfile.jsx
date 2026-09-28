import React, { useState, useRef, useEffect } from "react";
import "./MyProfile.css";

const API_BASE_URL = "http://localhost:5000";
const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80";

const CITY_SUGGESTIONS = [
  "Bhubaneswar, Odisha",
  "Cuttack, Odisha",
  "Puri, Odisha",
  "Rourkela, Odisha",
  "Berhampur, Odisha",
  "Sambalpur, Odisha",
  "Balasore, Odisha",
  "Baripada, Odisha",
  "Angul, Odisha",
  "Jharsuguda, Odisha",
  "Kolkata, West Bengal",
  "Delhi, India",
  "Mumbai, Maharashtra",
  "Bengaluru, Karnataka",
  "Hyderabad, Telangana",
];

const TRAVEL_STYLE_SUGGESTIONS = [
  "Solo Backpacker",
  "Luxury Escapes",
  "Roadtripper & Camping",
  "Cultural Heritage Explorer",
  "Eco & Sustainable Traveler",
  "Digital Nomad & Workation",
  "Adventure Sports Enthusiast",
  "Culinary & Wine Tourist",
];

const EMAIL_DOMAINS = ["pureflow.com", "gmail.com", "outlook.com", "yahoo.com"];

const MyProfile = () => {
  const [profiles, setProfiles] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [travelStyle, setTravelStyle] = useState("");
  const [baseLocation, setBaseLocation] = useState("");
  const [bio, setBio] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(DEFAULT_AVATAR);
  const [avatarFile, setAvatarFile] = useState(null);
  const [notification, setNotification] = useState("");

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState(null);

  // Suggestion visibility
  const [showEmailSuggestions, setShowEmailSuggestions] = useState(false);
  const [showStyleSuggestions, setShowStyleSuggestions] = useState(false);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);

  const emailRef = useRef(null);
  const styleRef = useRef(null);
  const cityRef = useRef(null);
  const fileInputRef = useRef(null);

  const formatImageUrl = (url) => {
    if (!url) return DEFAULT_AVATAR;
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("blob:")) {
      return url;
    }
    return `${API_BASE_URL}${url}`;
  };

  const triggerNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3500);
  };

  // Broadcasts event to Topbar
  const broadcastAvatarUpdate = (avatarUrl) => {
    window.dispatchEvent(
      new CustomEvent("profileAvatarUpdated", {
        detail: { avatarUrl: formatImageUrl(avatarUrl) },
      })
    );
  };

  // Fetch all profiles from backend
  const fetchProfiles = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/profiles`);
      const data = await res.json();
      if (data.success && Array.isArray(data.profiles)) {
        setProfiles(data.profiles);
        if (data.profiles.length > 0) {
          broadcastAvatarUpdate(data.profiles[0].avatar);
          if (!editingId) {
            setAvatarPreview(formatImageUrl(data.profiles[0].avatar));
          }
        }
      }
    } catch {
      triggerNotification("Failed to load profiles from server.");
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (emailRef.current && !emailRef.current.contains(e.target)) setShowEmailSuggestions(false);
      if (styleRef.current && !styleRef.current.contains(e.target)) setShowStyleSuggestions(false);
      if (cityRef.current && !cityRef.current.contains(e.target)) setShowCitySuggestions(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle avatar file selection
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const localUrl = URL.createObjectURL(file);
      setAvatarPreview(localUrl);
      broadcastAvatarUpdate(localUrl); // Instant preview in topbar
      triggerNotification("Profile picture selected!");
    }
  };

  // Email suggestions
  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    setShowEmailSuggestions(val.length > 0);
  };

  const getEmailSuggestions = () => {
    if (!email) return [];
    if (email.includes("@")) {
      const [username, domainPart] = email.split("@");
      if (!username) return [];
      return EMAIL_DOMAINS.filter((d) =>
        d.toLowerCase().startsWith((domainPart || "").toLowerCase())
      ).map((d) => `${username}@${d}`);
    }
    return EMAIL_DOMAINS.map((d) => `${email}@${d}`);
  };

  const filteredCities = baseLocation.trim()
    ? CITY_SUGGESTIONS.filter((c) =>
        c.toLowerCase().includes(baseLocation.trim().toLowerCase())
      )
    : [];

  const filteredStyles = travelStyle.trim()
    ? TRAVEL_STYLE_SUGGESTIONS.filter((s) =>
        s.toLowerCase().includes(travelStyle.trim().toLowerCase())
      )
    : [];

  // Submit / Update
  const handleSaveProfile = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      triggerNotification("Please fill in Admin Name and Email Address.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("travelStyle", travelStyle || "Solo Backpacker");
    formData.append("baseLocation", baseLocation || "Bhubaneswar, Odisha");
    formData.append("bio", bio);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    try {
      const url = editingId
        ? `${API_BASE_URL}/api/profiles/${editingId}`
        : `${API_BASE_URL}/api/profiles`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, { method, body: formData });
      const data = await res.json();

      if (data.success) {
        triggerNotification(editingId ? "Profile updated successfully!" : "Profile saved successfully!");
        fetchProfiles();
        if (data.profile?.avatar) {
          broadcastAvatarUpdate(data.profile.avatar);
          setAvatarPreview(formatImageUrl(data.profile.avatar));
        }
        handleResetForm();
      } else {
        triggerNotification(data.message || "Failed to save profile.");
      }
    } catch {
      triggerNotification("Network error. Backend not responding.");
    }
  };

  const handleEdit = (profile) => {
    setEditingId(profile._id);
    setName(profile.name);
    setEmail(profile.email);
    setTravelStyle(profile.travelStyle);
    setBaseLocation(profile.baseLocation);
    setBio(profile.bio || "");
    const imgUrl = formatImageUrl(profile.avatar);
    setAvatarPreview(imgUrl);
    setAvatarFile(null);
    broadcastAvatarUpdate(profile.avatar);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleStatus = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/profiles/${id}/status`, { method: "PATCH" });
      const data = await res.json();
      if (data.success) {
        setProfiles((prev) => prev.map((p) => (p._id === id ? data.profile : p)));
      }
    } catch {
      triggerNotification("Failed to update status.");
    }
  };

  const initiateDelete = (profile) => {
    setProfileToDelete(profile);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!profileToDelete) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/profiles/${profileToDelete._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setProfiles((prev) => prev.filter((p) => p._id !== profileToDelete._id));
        triggerNotification(`Profile "${profileToDelete.name}" deleted.`);
        if (editingId === profileToDelete._id) handleResetForm();
      }
    } catch {
      triggerNotification("Failed to delete profile.");
    }
    setIsDeleteModalOpen(false);
    setProfileToDelete(null);
  };

  const handleResetForm = () => {
    setEditingId(null);
    setName("");
    setEmail("");
    setTravelStyle("");
    setBaseLocation("");
    setBio("");
    setAvatarFile(null);
    setShowEmailSuggestions(false);
    setShowStyleSuggestions(false);
    setShowCitySuggestions(false);
  };

  return (
    <div className="MyProfile-container">
      {/* Background Banner */}
      <div className="MyProfile-hero-banner">
        <div className="MyProfile-header-nav">
          <div className="MyProfile-top-pill">
            <svg className="MyProfile-pill-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Account Settings</span>
          </div>
        </div>
      </div>

      <div className="MyProfile-content-wrapper">
        {notification && <div className="MyProfile-toast">{notification}</div>}

        {/* Form Card */}
        <section className="MyProfile-card MyProfile-form-card">
          <div className="MyProfile-card-header">
            <div className="MyProfile-avatar-wrapper">
              <img
                src={avatarPreview}
                alt="Profile Avatar"
                className="MyProfile-avatar-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = DEFAULT_AVATAR;
                }}
              />
              <button
                type="button"
                className="MyProfile-avatar-badge-btn"
                title="Change Photo"
                onClick={() => fileInputRef.current?.click()}
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="MyProfile-pen-icon">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
              />
            </div>

            <div className="MyProfile-title-group">
              <h2 className="MyProfile-heading">{editingId ? "Edit Profile" : "Profile Settings"}</h2>
              <p className="MyProfile-subheading">Manage personal details, preferences, and account info</p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="MyProfile-form">
            <div className="MyProfile-grid-2">
              <div className="MyProfile-field-group">
                <label className="MyProfile-label" htmlFor="admin-name">
                  Admin Name <span className="MyProfile-required">*</span>
                </label>
                <input
                  id="admin-name"
                  type="text"
                  className="MyProfile-input"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="MyProfile-field-group MyProfile-autocomplete" ref={emailRef}>
                <label className="MyProfile-label" htmlFor="email-address">
                  Email Address <span className="MyProfile-required">*</span>
                </label>
                <div className="MyProfile-input-with-icon">
                  <input
                    id="email-address"
                    type="email"
                    className="MyProfile-input"
                    placeholder="e.g. admin@pureflow.com"
                    value={email}
                    onChange={handleEmailChange}
                    onFocus={() => email.length > 0 && setShowEmailSuggestions(true)}
                    required
                  />
                  <span className="MyProfile-input-hint">✉️</span>
                </div>
                {showEmailSuggestions && getEmailSuggestions().length > 0 && (
                  <ul className="MyProfile-suggestions-menu">
                    {getEmailSuggestions().map((suggestion, idx) => (
                      <li
                        key={idx}
                        className="MyProfile-suggestion-item"
                        onClick={() => {
                          setEmail(suggestion);
                          setShowEmailSuggestions(false);
                        }}
                      >
                        <span className="MyProfile-suggest-bullet">📧</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="MyProfile-grid-2">
              <div className="MyProfile-field-group MyProfile-autocomplete" ref={styleRef}>
                <label className="MyProfile-label">Travel Style / Explorer Category</label>
                <div className="MyProfile-input-with-icon">
                  <input
                    type="text"
                    className="MyProfile-input"
                    placeholder="e.g. Solo Backpacker, Roadtripper"
                    value={travelStyle}
                    onChange={(e) => {
                      setTravelStyle(e.target.value);
                      setShowStyleSuggestions(e.target.value.trim().length > 0);
                    }}
                    onFocus={() => setShowStyleSuggestions(travelStyle.trim().length > 0)}
                  />
                  <span className="MyProfile-input-hint dropdown-arrow">▾</span>
                </div>
                {showStyleSuggestions && filteredStyles.length > 0 && (
                  <ul className="MyProfile-suggestions-menu">
                    {filteredStyles.map((item, idx) => (
                      <li
                        key={idx}
                        className="MyProfile-suggestion-item"
                        onClick={() => {
                          setTravelStyle(item);
                          setShowStyleSuggestions(false);
                        }}
                      >
                        <span className="MyProfile-suggest-bullet">✨</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="MyProfile-field-group MyProfile-autocomplete" ref={cityRef}>
                <label className="MyProfile-label">Base Location / City</label>
                <div className="MyProfile-input-with-icon">
                  <input
                    type="text"
                    className="MyProfile-input"
                    placeholder="Type city (e.g. bhuba...)"
                    value={baseLocation}
                    onChange={(e) => {
                      setBaseLocation(e.target.value);
                      setShowCitySuggestions(e.target.value.trim().length > 0);
                    }}
                    onFocus={() => setShowCitySuggestions(baseLocation.trim().length > 0)}
                  />
                  <span className="MyProfile-input-hint">📍</span>
                </div>
                {showCitySuggestions && filteredCities.length > 0 && (
                  <ul className="MyProfile-suggestions-menu">
                    {filteredCities.map((city, idx) => (
                      <li
                        key={idx}
                        className="MyProfile-suggestion-item"
                        onClick={() => {
                          setBaseLocation(city);
                          setShowCitySuggestions(false);
                        }}
                      >
                        <span className="MyProfile-suggest-bullet">🏢</span>
                        {city}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="MyProfile-field-group">
              <label className="MyProfile-label">Traveler Bio & Exploration Highlights</label>
              <textarea
                className="MyProfile-textarea"
                rows={3}
                placeholder="Write a brief intro about your journeys..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div className="MyProfile-form-actions">
              {editingId && (
                <button type="button" onClick={handleResetForm} className="MyProfile-btn-secondary">
                  Cancel Edit
                </button>
              )}
              <button type="submit" className="MyProfile-btn-primary">
                {editingId ? "Update Profile" : "Save Profile"}
              </button>
            </div>
          </form>
        </section>

        {/* Profile Table Card */}
        <section className="MyProfile-card MyProfile-table-card">
          <div className="MyProfile-table-topbar">
            <h3 className="MyProfile-table-title">Profile Details</h3>
            <button
              type="button"
              className="MyProfile-btn-add"
              onClick={() => {
                handleResetForm();
                document.getElementById("admin-name")?.focus();
              }}
            >
              + Add New
            </button>
          </div>

          <div className="MyProfile-table-container">
            <table className="MyProfile-table">
              <thead>
                <tr>
                  <th style={{ width: "60px" }}>S.No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Travel Style</th>
                  <th>Base Location</th>
                  <th>Status</th>
                  <th style={{ textAlign: "right", paddingRight: "24px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {profiles.length > 0 ? (
                  profiles.map((item, index) => (
                    <tr key={item._id} className="MyProfile-row">
                      <td className="MyProfile-td-num">{String(index + 1).padStart(2, "0")}</td>
                      <td>
                        <div className="MyProfile-user-cell">
                          <img
                            src={formatImageUrl(item.avatar)}
                            alt={item.name}
                            className="MyProfile-cell-avatar"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = DEFAULT_AVATAR;
                            }}
                          />
                          <span className="MyProfile-user-name">{item.name}</span>
                        </div>
                      </td>
                      <td className="MyProfile-td-email">{item.email}</td>
                      <td>
                        <span className="MyProfile-pill-tag">{item.travelStyle}</span>
                      </td>
                      <td className="MyProfile-td-location">{item.baseLocation}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(item._id)}
                          className={`MyProfile-status-pill ${
                            item.status === "Active"
                              ? "MyProfile-status-active"
                              : "MyProfile-status-inactive"
                          }`}
                        >
                          <span className="MyProfile-dot" />
                          {item.status}
                        </button>
                      </td>
                      <td style={{ textAlign: "right", paddingRight: "20px" }}>
                        <div className="MyProfile-action-buttons">
                          <button
                            type="button"
                            className="MyProfile-icon-action-btn edit"
                            onClick={() => handleEdit(item)}
                            title="Edit"
                          >
                            ✎
                          </button>
                          <button
                            type="button"
                            className="MyProfile-icon-action-btn delete"
                            onClick={() => initiateDelete(item)}
                            title="Delete"
                          >
                            🗑
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="MyProfile-empty-state">
                      No profiles found. Click "+ Add New" to add one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="MyProfile-table-footer">
            <span className="MyProfile-entries-count">
              Showing 1 to {profiles.length} of {profiles.length} entries
            </span>
          </div>
        </section>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="MyProfile-modal-backdrop" onClick={() => setIsDeleteModalOpen(false)}>
          <div className="MyProfile-modal-card" onClick={(e) => e.stopPropagation()}>
            <h3 className="MyProfile-modal-title">Delete Profile?</h3>
            <p className="MyProfile-modal-desc">
              Are you sure you want to delete profile for {profileToDelete?.name}?
            </p>
            <div className="MyProfile-modal-actions">
              <button
                type="button"
                className="MyProfile-modal-btn-cancel"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button type="button" className="MyProfile-modal-btn-delete" onClick={confirmDelete}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
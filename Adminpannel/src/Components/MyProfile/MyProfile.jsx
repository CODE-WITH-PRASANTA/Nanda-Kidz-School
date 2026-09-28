import React, { useState, useRef, useEffect } from "react";
import "./MyProfile.css";

const INITIAL_PROFILES = [
  {
    id: 1,
    name: "Alex Morgan",
    email: "alex.morgan@pureflow.com",
    travelStyle: "Solo Backpacker",
    baseLocation: "Kyoto, Japan",
    bio: "Passionate photographer chasing mountain sunrises and hidden alleyways across East Asia.",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Sophia Chen",
    email: "sophia.c@pureflow.com",
    travelStyle: "Luxury Escapes",
    baseLocation: "Zurich, Switzerland",
    bio: "Curating high-end retreat itineraries, culinary tours, and alpine adventures.",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Liam O'Connor",
    email: "liam.oc@pureflow.com",
    travelStyle: "Roadtripper & Camping",
    baseLocation: "Reykjavik, Iceland",
    bio: "Van-life enthusiast mapping out rugged routes and off-grid wild spots.",
    status: "Inactive",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
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

const CITY_SUGGESTIONS = [
  "Kyoto, Japan",
  "Zurich, Switzerland",
  "Reykjavik, Iceland",
  "New York, USA",
  "Bali, Indonesia",
  "Barcelona, Spain",
  "Cape Town, South Africa",
  "Vancouver, Canada",
  "Bhubaneswar, India",
];

const EMAIL_DOMAINS = [
  "pureflow.com",
  "gmail.com",
  "outlook.com",
  "yahoo.com",
];

const MyProfile = () => {
  const [profiles, setProfiles] = useState(INITIAL_PROFILES);

  // Form states
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [travelStyle, setTravelStyle] = useState("");
  const [baseLocation, setBaseLocation] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
  );
  const [notification, setNotification] = useState("");

  // Delete Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [profileToDelete, setProfileToDelete] = useState(null);

  // Dropdown States
  const [showEmailSuggestions, setShowEmailSuggestions] = useState(false);
  const [showStyleSuggestions, setShowStyleSuggestions] = useState(false);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);

  // Container refs for clicking outside
  const emailRef = useRef(null);
  const styleRef = useRef(null);
  const cityRef = useRef(null);
  const fileInputRef = useRef(null);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (emailRef.current && !emailRef.current.contains(e.target)) {
        setShowEmailSuggestions(false);
      }
      if (styleRef.current && !styleRef.current.contains(e.target)) {
        setShowStyleSuggestions(false);
      }
      if (cityRef.current && !cityRef.current.contains(e.target)) {
        setShowCitySuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const triggerNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3200);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatar(url);
      triggerNotification("Profile picture updated!");
    }
  };

  // Email logic & domain suggestions
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

  // Travel style suggestions
  const filteredStyles = travelStyle.trim()
    ? TRAVEL_STYLE_SUGGESTIONS.filter((s) =>
        s.toLowerCase().includes(travelStyle.toLowerCase())
      )
    : TRAVEL_STYLE_SUGGESTIONS;

  // City suggestions
  const filteredCities = baseLocation.trim()
    ? CITY_SUGGESTIONS.filter((c) =>
        c.toLowerCase().includes(baseLocation.toLowerCase())
      )
    : CITY_SUGGESTIONS;

  // Save / Update
  const handleSaveProfile = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      triggerNotification("Please fill in Admin Name and Email Address.");
      return;
    }

    if (editingId) {
      setProfiles((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? {
                ...p,
                name,
                email,
                travelStyle: travelStyle || "Explorer",
                baseLocation: baseLocation || "Global Citizen",
                bio,
                avatar,
              }
            : p
        )
      );
      triggerNotification("Profile successfully updated!");
    } else {
      const newEntry = {
        id: Date.now(),
        name,
        email,
        travelStyle: travelStyle || "Solo Traveler",
        baseLocation: baseLocation || "Not Specified",
        bio,
        status: "Active",
        avatar:
          avatar ||
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      };
      setProfiles([newEntry, ...profiles]);
      triggerNotification("New profile created successfully!");
    }

    handleResetForm();
  };

  const handleEdit = (profile) => {
    setEditingId(profile.id);
    setName(profile.name);
    setEmail(profile.email);
    setTravelStyle(profile.travelStyle);
    setBaseLocation(profile.baseLocation);
    setBio(profile.bio || "");
    setAvatar(profile.avatar);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleStatus = (id) => {
    setProfiles((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" }
          : p
      )
    );
  };

  const initiateDelete = (profile) => {
    setProfileToDelete(profile);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (profileToDelete) {
      setProfiles((prev) => prev.filter((p) => p.id !== profileToDelete.id));
      triggerNotification(`Profile "${profileToDelete.name}" deleted.`);
      if (editingId === profileToDelete.id) {
        handleResetForm();
      }
    }
    setIsDeleteModalOpen(false);
    setProfileToDelete(null);
  };

  const cancelDelete = () => {
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
            <svg
              className="MyProfile-pill-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span>Account Settings</span>
          </div>
        </div>
      </div>

      <div className="MyProfile-content-wrapper">
        {notification && (
          <div className="MyProfile-toast">
            <svg
              className="MyProfile-toast-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            {notification}
          </div>
        )}

        {/* Form Card */}
        <section className="MyProfile-card MyProfile-form-card">
          <div className="MyProfile-card-header">
            <div className="MyProfile-avatar-wrapper">
              <img
                src={avatar}
                alt="Profile Avatar"
                className="MyProfile-avatar-img"
              />
              <button
                type="button"
                className="MyProfile-avatar-badge-btn"
                title="Change Photo"
                onClick={() => fileInputRef.current?.click()}
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="MyProfile-pen-icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
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
              <h2 className="MyProfile-heading">
                {editingId ? "Edit Profile" : "Profile Settings"}
              </h2>
              <p className="MyProfile-subheading">
                Manage your personal details, travel preferences, and account
                information
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveProfile} className="MyProfile-form">
            <div className="MyProfile-grid-2">
              {/* Admin Name */}
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

              {/* Email Address with Domain Autocomplete */}
              <div
                className="MyProfile-field-group MyProfile-autocomplete"
                ref={emailRef}
              >
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
                    onFocus={() => email && setShowEmailSuggestions(true)}
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
              {/* Travel Style with Suggestion Dropdown */}
              <div
                className="MyProfile-field-group MyProfile-autocomplete"
                ref={styleRef}
              >
                <label className="MyProfile-label">
                  Travel Style / Explorer Category
                </label>
                <div
                  className="MyProfile-input-with-icon"
                  onClick={() => setShowStyleSuggestions(true)}
                >
                  <input
                    type="text"
                    className="MyProfile-input"
                    placeholder="e.g. Solo Backpacker, Roadtripper"
                    value={travelStyle}
                    onChange={(e) => {
                      setTravelStyle(e.target.value);
                      setShowStyleSuggestions(true);
                    }}
                    onFocus={() => setShowStyleSuggestions(true)}
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

              {/* Base Location / City with Suggestion Dropdown */}
              <div
                className="MyProfile-field-group MyProfile-autocomplete"
                ref={cityRef}
              >
                <label className="MyProfile-label">Base Location / City</label>
                <div
                  className="MyProfile-input-with-icon"
                  onClick={() => setShowCitySuggestions(true)}
                >
                  <input
                    type="text"
                    className="MyProfile-input"
                    placeholder="e.g. Kyoto, Japan"
                    value={baseLocation}
                    onChange={(e) => {
                      setBaseLocation(e.target.value);
                      setShowCitySuggestions(true);
                    }}
                    onFocus={() => setShowCitySuggestions(true)}
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

            {/* Traveler Bio */}
            <div className="MyProfile-field-group">
              <label className="MyProfile-label">
                Traveler Bio & Exploration Highlights
              </label>
              <textarea
                className="MyProfile-textarea"
                rows={3}
                placeholder="Write a brief intro about your journeys..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            {/* Actions */}
            <div className="MyProfile-form-actions">
              {editingId && (
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="MyProfile-btn-secondary"
                >
                  Cancel Edit
                </button>
              )}
              <button type="submit" className="MyProfile-btn-primary">
                <svg
                  className="MyProfile-btn-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {editingId ? "Update Profile" : "Save Profile"}
              </button>
            </div>
          </form>
        </section>

        {/* Details Table Card */}
        <section className="MyProfile-card MyProfile-table-card">
          <div className="MyProfile-table-topbar">
            <div className="MyProfile-table-header-left">
              <div className="MyProfile-table-icon-badge">
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="MyProfile-badge-svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="MyProfile-table-title">Profile Details</h3>
            </div>
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
                  <th style={{ textAlign: "right", paddingRight: "24px" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {profiles.length > 0 ? (
                  profiles.map((item, index) => (
                    <tr key={item.id} className="MyProfile-row">
                      <td className="MyProfile-td-num">
                        {String(index + 1).padStart(2, "0")}
                      </td>
                      <td>
                        <div className="MyProfile-user-cell">
                          <img
                            src={item.avatar}
                            alt={item.name}
                            className="MyProfile-cell-avatar"
                          />
                          <span className="MyProfile-user-name">
                            {item.name}
                          </span>
                        </div>
                      </td>
                      <td className="MyProfile-td-email">{item.email}</td>
                      <td>
                        <span className="MyProfile-pill-tag">
                          {item.travelStyle}
                        </span>
                      </td>
                      <td className="MyProfile-td-location">
                        {item.baseLocation}
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(item.id)}
                          className={`MyProfile-status-pill ${
                            item.status === "Active"
                              ? "MyProfile-status-active"
                              : "MyProfile-status-inactive"
                          }`}
                          title="Click to toggle status"
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
                            title="Edit Profile"
                            onClick={() => handleEdit(item)}
                          >
                            <svg
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="MyProfile-icon-action-btn delete"
                            title="Delete Profile"
                            onClick={() => initiateDelete(item)}
                          >
                            <svg
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
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
        <div className="MyProfile-modal-backdrop" onClick={cancelDelete}>
          <div
            className="MyProfile-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="MyProfile-modal-close-btn"
              onClick={cancelDelete}
              aria-label="Close"
            >
              ✕
            </button>

            <div className="MyProfile-modal-icon-circle">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                className="MyProfile-modal-icon-svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>

            <h3 className="MyProfile-modal-title">Delete Profile?</h3>
            <p className="MyProfile-modal-desc">
              Are you sure you want to permanently remove this profile? This
              action cannot be reversed.
            </p>

            {profileToDelete && (
              <div className="MyProfile-modal-preview">
                <img
                  src={profileToDelete.avatar}
                  alt={profileToDelete.name}
                  className="MyProfile-modal-preview-avatar"
                />
                <div className="MyProfile-modal-preview-info">
                  <span className="MyProfile-modal-preview-name">
                    {profileToDelete.name}
                  </span>
                  <span className="MyProfile-modal-preview-email">
                    {profileToDelete.email}
                  </span>
                </div>
              </div>
            )}

            <div className="MyProfile-modal-actions">
              <button
                type="button"
                className="MyProfile-modal-btn-cancel"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                type="button"
                className="MyProfile-modal-btn-delete"
                onClick={confirmDelete}
              >
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
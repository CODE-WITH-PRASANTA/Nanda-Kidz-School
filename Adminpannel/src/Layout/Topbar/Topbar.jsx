import React, { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  FaBars,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaUserCircle,
  FaChevronRight,
  FaChevronDown,
  FaExternalLinkAlt,
  FaThLarge,
  FaBox,
} from "react-icons/fa";
import "./Topbar.css";

// Route configuration mapping paths to title & icons
const PAGE_CONFIG = {
  "/dashboard": {
    icon: FaThLarge,
    title: "Dashboard",
    crumbs: ["Dashboard"],
  },
  "/shop/products/add": {
    icon: FaBox,
    title: "Add New Product",
    crumbs: ["Dashboard", "Shop / Products", "Add New Product"],
  },
};

const toTitleCase = (segment) =>
  segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const getPageInfo = (pathname) => {
  if (PAGE_CONFIG[pathname]) return PAGE_CONFIG[pathname];

  const parts = pathname.split("/").filter(Boolean);
  const last = parts[parts.length - 1] || "dashboard";
  const title = toTitleCase(last);
  return {
    icon: FaThLarge,
    title,
    crumbs: parts.length > 1 ? ["Dashboard", title] : ["Dashboard"],
  };
};

const Topbar = ({
  toggleSidebar,
  toggleMobileSidebar,
  websiteUrl = "#",
  adminName = "Admin",
  notificationCount = 5,
  avatarUrl = null,
  onLogout,
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();

  const { icon: PageIcon, title, crumbs } = getPageInfo(location.pathname);

  // Close profile dropdown on outside click
  useEffect(() => {
    const closeDropdown = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);

  // Handle robust responsive sidebar toggle
  const handleToggle = () => {
    if (window.innerWidth <= 992) {
      if (typeof toggleMobileSidebar === "function") {
        toggleMobileSidebar();
      }
    } else {
      if (typeof toggleSidebar === "function") {
        toggleSidebar();
      }
    }
  };

  return (
    <header className="Topbar">
      {/* Left Section: Toggle, Icon, Title & Breadcrumbs */}
      <div className="Topbar-left">
        <button
          className="Topbar-toggle"
          onClick={handleToggle}
          aria-label="Toggle Sidebar"
          type="button"
        >
          <FaBars />
        </button>

        <div className="Topbar-pageIconWrapper">
          <PageIcon className="Topbar-pageMainIcon" />
        </div>

        <div className="Topbar-pageInfo">
          <h1 className="Topbar-pageTitle">{title}</h1>
          <nav className="Topbar-breadcrumb" aria-label="breadcrumb">
            {crumbs.map((crumb, idx) => {
              const isLast = idx === crumbs.length - 1;
              return (
                <React.Fragment key={crumb + idx}>
                  {idx === 0 ? (
                    <Link to="/dashboard" className="Topbar-crumb">
                      {crumb}
                    </Link>
                  ) : (
                    <span className={`Topbar-crumb ${isLast ? "current" : ""}`}>
                      {crumb}
                    </span>
                  )}
                  {!isLast && <FaChevronRight className="Topbar-crumb-sep" size={10} />}
                </React.Fragment>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Right Section: Website Link, Notifications & Profile Menu */}
      <div className="Topbar-right">
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="Topbar-visitBtn"
        >
          <span>Visit Website</span>
          <FaExternalLinkAlt size={11} />
        </a>

        <button className="Topbar-notification" aria-label="Notifications" type="button">
          <FaBell />
          {notificationCount > 0 && (
            <span className="Topbar-badge">{notificationCount}</span>
          )}
        </button>

        <div className="Topbar-profile" ref={profileRef}>
          <button
            className={`Topbar-profileInfo ${profileOpen ? "active" : ""}`}
            onClick={() => setProfileOpen((prev) => !prev)}
            aria-expanded={profileOpen}
            type="button"
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt={adminName} className="Topbar-profileImage" />
            ) : (
              <FaUserCircle className="Topbar-profileImagePlaceholder" />
            )}
            <span className="Topbar-profileName">{adminName}</span>
            <FaChevronDown className={`Topbar-profileChevron ${profileOpen ? "open" : ""}`} />
          </button>

          <div className={`Topbar-dropdown ${profileOpen ? "show" : ""}`}>
            <button
              className="Topbar-dropdownItem"
              onClick={() => setProfileOpen(false)}
              type="button"
            >
              <FaUserCircle />
              Profile
            </button>
            <button
              className="Topbar-dropdownItem"
              onClick={() => setProfileOpen(false)}
              type="button"
            >
              <FaCog />
              Settings
            </button>
            <div className="Topbar-dropdownDivider" />
            <button
              className="Topbar-dropdownItem logout"
              onClick={() => {
                setProfileOpen(false);
                if (onLogout) onLogout();
              }}
              type="button"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
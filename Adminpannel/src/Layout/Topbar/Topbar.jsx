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
  FaBoxOpen,
} from "react-icons/fa";
import "./Topbar.css";

// Maps a route to the page icon / title / breadcrumb trail shown on the left.
// Add an entry per route; anything not listed falls back to a generic
// title derived from the last URL segment.
const PAGE_CONFIG = {
  "/dashboard": {
    icon: FaThLarge,
    title: "Dashboard",
    crumbs: ["Dashboard"],
  },
  "/shop/products/add": {
    icon: FaBoxOpen,
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
  onLogout,
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();

  const { icon: PageIcon, title, crumbs } = getPageInfo(location.pathname);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  const handleToggle = () => {
    if (window.innerWidth <= 992) {
      toggleMobileSidebar();
    } else {
      toggleSidebar();
    }
  };

  return (
    <header className="Topbar">
      <div className="Topbar-left">
        <button className="Topbar-toggle" onClick={handleToggle} aria-label="Toggle sidebar">
          <FaBars />
        </button>

        <div className="Topbar-pageIcon">
          <PageIcon />
        </div>

        <div className="Topbar-pageInfo">
          <h1 className="Topbar-pageTitle">{title}</h1>
          <div className="Topbar-breadcrumb">
            {crumbs.map((crumb, idx) => {
              const isLast = idx === crumbs.length - 1;
              return (
                <React.Fragment key={crumb + idx}>
                  {idx === 0 ? (
                    <Link to="/dashboard" className="Topbar-crumb">{crumb}</Link>
                  ) : (
                    <span className={`Topbar-crumb ${isLast ? "current" : ""}`}>{crumb}</span>
                  )}
                  {!isLast && <FaChevronRight className="Topbar-crumb-sep" />}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      <div className="Topbar-right">
        <a
          href={websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="Topbar-visitBtn"
        >
          Visit Website <FaExternalLinkAlt size={12} />
        </a>

        <button className="Topbar-notification" aria-label="Notifications">
          <FaBell />
          <span className="Topbar-badge">1</span>
        </button>

        <div className="Topbar-profile" ref={profileRef}>
          <div
            className="Topbar-profileInfo"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <FaUserCircle className="Topbar-profileImage" size={40} />
            <div className="Topbar-profileText">
              <span>{adminName}</span>
            </div>
            <FaChevronDown className={`Topbar-profileChevron ${profileOpen ? "open" : ""}`} />
          </div>

          <div className={`Topbar-dropdown ${profileOpen ? "show" : ""}`}>
            <button className="Topbar-dropdownItem" onClick={() => setProfileOpen(false)}>
              <FaUserCircle />
              Profile
            </button>

            <button className="Topbar-dropdownItem" onClick={() => setProfileOpen(false)}>
              <FaCog />
              Settings
            </button>

            <button
              className="Topbar-dropdownItem logout"
              onClick={() => {
                setProfileOpen(false);
                onLogout && onLogout();
              }}
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
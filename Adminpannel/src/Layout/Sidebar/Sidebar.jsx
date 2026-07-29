import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserGraduate,
  FaClipboardList,
  FaUserFriends,
  FaChalkboardTeacher,
  FaDoorOpen,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaFileAlt,
  FaCalendarAlt,
  FaBook,
  FaBookOpen,
  FaBus,
  FaImages,
  FaBlog,
  FaStore,
  FaBoxOpen,
  FaPlusCircle,
  FaBullhorn,
  FaEnvelope,
  FaGlobe,
  FaCog,
  FaChartBar,
  FaTimes,
  FaChevronDown,
  FaPhoneAlt,
  FaIdBadge,
  FaPowerOff,
} from "react-icons/fa";

import "./Sidebar.css";

const Sidebar = ({
  collapsed,
  mobileSidebar,
  toggleMobileSidebar,
  onLogout,
  onViewProfile,
}) => {
  const location = useLocation();
  const [shopOpen, setShopOpen] = useState(location.pathname.startsWith("/shop"));
  const [blogOpen, setBlogOpen] = useState(location.pathname.startsWith("/blog"));

  const showLabel = !collapsed || mobileSidebar;

  const menuItems = [
    { title: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { title: "Students", icon: <FaUserGraduate />, path: "/students" },
    { title: "Admissions", icon: <FaClipboardList />, path: "/admissions" },
    { title: "Parents", icon: <FaUserFriends />, path: "/parents" },
    { title: "Teachers", icon: <FaChalkboardTeacher />, path: "/teachers" },
    { title: "Classes", icon: <FaDoorOpen />, path: "/classes" },
    { title: "Attendance", icon: <FaCalendarCheck />, path: "/attendance" },
    { title: "Fees & Payments", icon: <FaMoneyBillWave />, path: "/fees-payments" },
    { title: "Examinations", icon: <FaFileAlt />, path: "/examinations" },
    { title: "Events", icon: <FaCalendarAlt />, path: "/events" },
    { title: "Homework", icon: <FaBook />, path: "/homework" },
    { title: "Library", icon: <FaBookOpen />, path: "/library" },
    { title: "Transport", icon: <FaBus />, path: "/transport" },
    { title: "Gallery Management", icon: <FaImages />, path: "/gallery-management" },
  ];

  const shopSubItems = [
    { title: "Shop Products", path: "/shop/products", icon: <FaBoxOpen /> },
    { title: "Add New Product", path: "/shop/products/add", icon: <FaPlusCircle />, highlight: true },
  ];

  const blogSubItems = [
    { title: "Blog Post", path: "/blog-management/posts", icon: <FaFileAlt /> },
    { title: "Blog Management", path: "/blog-management", icon: <FaBlog /> },
  ];

  const bottomMenuItems = [
    { title: "Notice Board", icon: <FaBullhorn />, path: "/notice-board" },
    { title: "Contact Messages", icon: <FaEnvelope />, path: "/contact-messages" },
    { title: "Website Manage", icon: <FaGlobe />, path: "/website-manage" },
    { title: "Settings", icon: <FaCog />, path: "/settings" },
    { title: "Reports", icon: <FaChartBar />, path: "/reports" },
  ];

  const handleShopToggle = () => {
    if (collapsed && !mobileSidebar) return;
    setShopOpen((v) => !v);
  };

  const handleBlogToggle = () => {
    if (collapsed && !mobileSidebar) return;
    setBlogOpen((v) => !v);
  };

  const closeOnMobile = () => mobileSidebar && toggleMobileSidebar();

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`Sidebar-overlay ${mobileSidebar ? "show" : ""}`}
        onClick={toggleMobileSidebar}
      />

      <aside
        className={`
          Sidebar
          ${collapsed ? "collapsed" : ""}
          ${mobileSidebar ? "mobile-open" : ""}
        `}
      >
        {/* Logo Section */}
        <div className="Sidebar-logoSection">
          <div className="Sidebar-logo">
            <svg viewBox="0 0 60 60" className="Sidebar-logo-svg">
              <defs>
                <linearGradient id="rainbowArc1" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f87171" />
                  <stop offset="25%" stopColor="#fbbf24" />
                  <stop offset="50%" stopColor="#34d399" />
                  <stop offset="75%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
              </defs>
              <path d="M6 40 A24 24 0 0 1 54 40" fill="none" stroke="url(#rainbowArc1)" strokeWidth="6" strokeLinecap="round" />
              <circle cx="44" cy="16" r="7" fill="#fde047" />
              <path d="M18 44 h24 l-4 10 h-16 Z" fill="#f8fafc" opacity="0.15" />
            </svg>
          </div>

          {showLabel && (
            <div className="Sidebar-logoText">
              <h2 className="Sidebar-logoTitle">Kids School</h2>
              <span className="Sidebar-logoTagline">Admin Panel</span>
            </div>
          )}

          <button
            className="Sidebar-close"
            onClick={toggleMobileSidebar}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>

        {/* Menu */}
        <div className="Sidebar-menu">
          {menuItems.map((item, index) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={{ "--i": index }}
              onClick={closeOnMobile}
              className={({ isActive }) =>
                isActive ? "Sidebar-link active" : "Sidebar-link"
              }
              title={collapsed && !mobileSidebar ? item.title : undefined}
            >
              <div className="Sidebar-icon">{item.icon}</div>
              {showLabel && <span className="Sidebar-title">{item.title}</span>}
              {collapsed && !mobileSidebar && (
                <div className="Sidebar-tooltip">{item.title}</div>
              )}
            </NavLink>
          ))}

          {/* Shop dropdown */}
          <div className="Sidebar-dropdown-wrapper">
            <button
              type="button"
              className={`Sidebar-link Sidebar-dropdown-toggle ${shopOpen ? "open" : ""} ${location.pathname.startsWith("/shop") ? "active" : ""}`}
              onClick={handleShopToggle}
              style={{ "--i": menuItems.length }}
              title={collapsed && !mobileSidebar ? "Shop" : undefined}
            >
              <div className="Sidebar-icon"><FaStore /></div>
              {showLabel && <span className="Sidebar-title">Shop</span>}
              {showLabel && (
                <FaChevronDown className={`Sidebar-chevron ${shopOpen ? "rotated" : ""}`} />
              )}
              {collapsed && !mobileSidebar && (
                <div className="Sidebar-tooltip">Shop</div>
              )}
            </button>

            {showLabel && (
              <div className={`Sidebar-submenu ${shopOpen ? "expanded" : ""}`}>
                {shopSubItems.map((sub) => (
                  <NavLink
                    key={sub.path}
                    to={sub.path}
                    onClick={closeOnMobile}
                    className={({ isActive }) =>
                      isActive ? "Sidebar-submenu-link active" : "Sidebar-submenu-link"
                    }
                  >
                    <span className="Sidebar-submenu-icon">{sub.icon}</span>
                    <span className="Sidebar-submenu-text">{sub.title}</span>
                    {sub.highlight && <span className="Sidebar-submenu-badge">New</span>}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Blog dropdown */}
          <div className="Sidebar-dropdown-wrapper">
            <button
              type="button"
              className={`Sidebar-link Sidebar-dropdown-toggle ${blogOpen ? "open" : ""} ${location.pathname.startsWith("/blog") ? "active" : ""}`}
              onClick={handleBlogToggle}
              style={{ "--i": menuItems.length + 1 }}
              title={collapsed && !mobileSidebar ? "Blog" : undefined}
            >
              <div className="Sidebar-icon"><FaBlog /></div>
              {showLabel && <span className="Sidebar-title">Blog</span>}
              {showLabel && (
                <FaChevronDown className={`Sidebar-chevron ${blogOpen ? "rotated" : ""}`} />
              )}
              {collapsed && !mobileSidebar && (
                <div className="Sidebar-tooltip">Blog</div>
              )}
            </button>

            {showLabel && (
              <div className={`Sidebar-submenu ${blogOpen ? "expanded" : ""}`}>
                {blogSubItems.map((sub) => (
                  <NavLink
                    key={sub.path}
                    to={sub.path}
                    onClick={closeOnMobile}
                    className={({ isActive }) =>
                      isActive ? "Sidebar-submenu-link active" : "Sidebar-submenu-link"
                    }
                  >
                    <span className="Sidebar-submenu-icon">{sub.icon}</span>
                    <span className="Sidebar-submenu-text">{sub.title}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {bottomMenuItems.map((item, index) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={{ "--i": menuItems.length + 2 + index }}
              onClick={closeOnMobile}
              className={({ isActive }) =>
                isActive ? "Sidebar-link active" : "Sidebar-link"
              }
              title={collapsed && !mobileSidebar ? item.title : undefined}
            >
              <div className="Sidebar-icon">{item.icon}</div>
              {showLabel && <span className="Sidebar-title">{item.title}</span>}
              {collapsed && !mobileSidebar && (
                <div className="Sidebar-tooltip">{item.title}</div>
              )}
            </NavLink>
          ))}
        </div>

        {/* Admin footer */}
        <div className="Sidebar-footer">
          <button
            type="button"
            className="Sidebar-profile"
            onClick={onViewProfile}
          >
            <div className="Sidebar-avatar">
              <span>AU</span>
              <span className="Sidebar-avatar-dot" />
            </div>
            {showLabel && (
              <div className="Sidebar-profile-info">
                <span className="Sidebar-profile-name">Admin User</span>
                <span className="Sidebar-profile-role">Super Admin</span>
              </div>
            )}
          </button>

          {showLabel && (
            <div className="Sidebar-quick-icons">
              <a href="tel:+919876543210" className="Sidebar-quick-btn" aria-label="Call support">
                <FaPhoneAlt size={13} />
              </a>
              <button
                type="button"
                className="Sidebar-quick-btn"
                aria-label="View profile"
                onClick={onViewProfile}
              >
                <FaIdBadge size={14} />
              </button>
              <button
                type="button"
                className="Sidebar-quick-btn Sidebar-quick-btn-danger"
                aria-label="Logout"
                onClick={onLogout}
              >
                <FaPowerOff size={13} />
              </button>
            </div>
          )}

          {/* Illustration banner */}
          {showLabel && (
            <div className="Sidebar-illustration">
              <svg viewBox="0 0 260 110" preserveAspectRatio="xMidYMax meet" className="Sidebar-illustration-svg">
                <defs>
                  <linearGradient id="skySunset" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#fb923c" />
                  </linearGradient>
                </defs>
                <circle cx="60" cy="26" r="16" fill="url(#skySunset)" opacity="0.85" className="Sidebar-illustration-sun" />
                <path d="M0 92 h260 v18 h-260 Z" fill="#0b3d2e" />
                <rect x="95" y="46" width="70" height="46" fill="#fb923c" />
                <path d="M90 46 L130 22 L170 46 Z" fill="#ea580c" />
                <rect x="118" y="66" width="24" height="26" fill="#7c2d12" />
                <rect x="100" y="54" width="12" height="12" fill="#fde68a" />
                <rect x="148" y="54" width="12" height="12" fill="#fde68a" />
                <circle cx="30" cy="80" r="14" fill="#16a34a" />
                <rect x="27" y="86" width="6" height="14" fill="#78350f" />
                <circle cx="230" cy="76" r="16" fill="#16a34a" />
                <rect x="227" y="84" width="6" height="16" fill="#78350f" />
                <circle cx="70" cy="96" r="4" fill="#fde68a" />
                <circle cx="190" cy="96" r="4" fill="#fde68a" />
              </svg>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
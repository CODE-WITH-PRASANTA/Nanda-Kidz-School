import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  LayoutGrid,
  ChevronRight,
  ExternalLink,
  Bell,
  ChevronDown,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ShoppingBag,
  UserPlus,
  CheckCircle,
} from 'lucide-react';
import './Topbar.css';

const notificationsData = [
  { id: 1, title: 'New product added', time: '2 min ago', icon: ShoppingBag, color: '#7C5CFF' },
  { id: 2, title: 'New user registered', time: '5 min ago', icon: UserPlus, color: '#22C55E' },
  { id: 3, title: 'Order confirmed', time: '20 min ago', icon: CheckCircle, color: '#F59E0B' },
];

const Topbar = ({
  toggleSidebar,
  icon: PageIcon = LayoutGrid,
  title = 'Dashboard',
  breadcrumbs = ['Dashboard'],
  websiteUrl = '#',
  userName = 'Admin',
  profilePath = '/myprofile',
  settingsPath = '/settings',
  helpPath = '/help',
  onLogout,
  onNavigateProfile,
  onNavigateSettings,
  onNavigateHelp,
}) => {
  const navigate = useNavigate();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Close menus on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setNotificationOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleProfileClick = () => {
    setProfileOpen(false);
    if (onNavigateProfile) {
      onNavigateProfile();
    } else {
      navigate(profilePath);
    }
  };

  const handleSettingsClick = () => {
    setProfileOpen(false);
    if (onNavigateSettings) {
      onNavigateSettings();
    } else {
      navigate(settingsPath);
    }
  };

  const handleHelpClick = () => {
    setProfileOpen(false);
    if (onNavigateHelp) {
      onNavigateHelp();
    } else {
      navigate(helpPath);
    }
  };

  const handleLogout = () => {
    setProfileOpen(false);
    if (onLogout) {
      onLogout();
      return;
    }
    localStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <header className="Topbar">
      <div className="Topbar-left">
        <button
          className="Topbar-toggleBtn"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
          type="button"
        >
          <Menu size={20} />
        </button>

        <div className="Topbar-pageIcon">
          <PageIcon size={18} />
        </div>

        <div className="Topbar-pageInfo">
          <h1 className="Topbar-pageTitle">{title}</h1>
          <div className="Topbar-breadcrumb">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <ChevronRight size={12} className="Topbar-breadcrumb-sep" />}
                <span
                  className={`Topbar-breadcrumb-item ${
                    index === breadcrumbs.length - 1 ? 'current' : ''
                  }`}
                >
                  {crumb}
                </span>
              </React.Fragment>
            ))}
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
          <span>Visit Website</span>
          <ExternalLink size={14} />
        </a>

        {/* Notifications Dropdown */}
        <div className="Notification" ref={notificationRef}>
          <button
            className="Topbar-iconBtn"
            onClick={() => {
              setNotificationOpen((prev) => !prev);
              setProfileOpen(false);
            }}
            aria-label="Notifications"
            type="button"
          >
            <Bell size={19} />
            {notificationsData.length > 0 && (
              <span className="Topbar-badge">{notificationsData.length}</span>
            )}
          </button>

          <AnimatePresence>
            {notificationOpen && (
              <motion.div
                className="Topbar-popup"
                initial={{ opacity: 0, scale: 0.94, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -6 }}
                transition={{ duration: 0.16, ease: 'easeOut' }}
              >
                <div className="Topbar-popup-header">
                  <h3>Notifications</h3>
                </div>
                <div className="Topbar-popup-list">
                  {notificationsData.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.id} className="Topbar-notification-row">
                        <div
                          className="Topbar-notification-icon"
                          style={{ backgroundColor: `${item.color}18`, color: item.color }}
                        >
                          <Icon size={16} />
                        </div>
                        <div className="Topbar-notification-content">
                          <p>{item.title}</p>
                          <span>{item.time}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="Topbar-popup-footer">
                  <button type="button">View All</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Profile Dropdown */}
        <div className="ProfileMenu" ref={profileRef}>
          <button
            className="ProfileMenu-trigger"
            onClick={() => {
              setProfileOpen((prev) => !prev);
              setNotificationOpen(false);
            }}
            aria-expanded={profileOpen}
            aria-haspopup="true"
            type="button"
          >
            <div className="ProfileMenu-avatar">
              <User size={16} />
            </div>
            <span className="ProfileMenu-name">{userName}</span>
            <ChevronDown
              size={15}
              className={`ProfileMenu-chevron ${profileOpen ? 'open' : ''}`}
            />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                className="Topbar-popup ProfileMenu-dropdown"
                initial={{ opacity: 0, scale: 0.94, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -6 }}
                transition={{ duration: 0.16, ease: 'easeOut' }}
              >
                <button
                  type="button"
                  className="ProfileMenu-item"
                  onClick={handleProfileClick}
                >
                  <User size={16} /> My Profile
                </button>

                <button
                  type="button"
                  className="ProfileMenu-item"
                  onClick={handleSettingsClick}
                >
                  <Settings size={16} /> Settings
                </button>

                <button
                  type="button"
                  className="ProfileMenu-item"
                  onClick={handleHelpClick}
                >
                  <HelpCircle size={16} /> Help
                </button>

                <div className="ProfileMenu-divider" />

                <button
                  type="button"
                  className="ProfileMenu-item danger"
                  onClick={handleLogout}
                >
                  <LogOut size={16} /> Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
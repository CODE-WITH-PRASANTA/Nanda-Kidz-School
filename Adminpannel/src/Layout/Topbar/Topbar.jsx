import React, { useState, useRef, useEffect, useCallback } from 'react';
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

const API_BASE_URL = 'http://localhost:5000';
const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80';

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
  loginPath = '/login',
  onLogout,
  onNavigateProfile,
  onNavigateSettings,
  onNavigateHelp,
}) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userAvatar, setUserAvatar] = useState(DEFAULT_AVATAR);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const formatImageUrl = useCallback((url) => {
    if (!url) return DEFAULT_AVATAR;
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('blob:')) {
      return url;
    }
    return `${API_BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
  }, []);

  // Initial fetch for topbar avatar & name
  useEffect(() => {
    let isMounted = true;

    const loadProfileAvatar = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const res = await fetch(`${API_BASE_URL}/api/profiles`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await res.json();
        if (isMounted && data.success && Array.isArray(data.profiles) && data.profiles.length > 0) {
          const activeUser = data.profiles[0];
          if (activeUser?.avatar) {
            setUserAvatar(formatImageUrl(activeUser.avatar));
          }
        }
      } catch (err) {
        console.error('Failed to load topbar profile avatar:', err);
      }
    };

    loadProfileAvatar();

    const handleAvatarUpdate = (e) => {
      if (e.detail?.avatarUrl) {
        setUserAvatar(formatImageUrl(e.detail.avatarUrl));
      }
    };

    window.addEventListener('profileAvatarUpdated', handleAvatarUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('profileAvatarUpdated', handleAvatarUpdate);
    };
  }, [formatImageUrl]);

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
      window.location.href = profilePath;
    }
  };

  const handleSettingsClick = () => {
    setProfileOpen(false);
    if (onNavigateSettings) {
      onNavigateSettings();
    } else {
      window.location.href = settingsPath;
    }
  };

  const handleHelpClick = () => {
    setProfileOpen(false);
    if (onNavigateHelp) {
      onNavigateHelp();
    } else {
      window.location.href = helpPath;
    }
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    setProfileOpen(false);

    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1500);

      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        signal: controller.signal,
      }).catch(() => {});

      clearTimeout(timeoutId);
    } catch (err) {
      console.warn('Backend logout skipped or failed:', err);
    }

    // 1. Wipe all storages completely
    localStorage.clear();
    sessionStorage.clear();

    // 2. Clear cookies
    document.cookie.split(';').forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });

    // 3. Parent callback
    if (typeof onLogout === 'function') {
      try {
        await onLogout();
      } catch (err) {
        console.error('Error in onLogout callback:', err);
      }
    }

    // 4. Force browser navigation to login page
    window.location.href = loginPath;
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
              <img
                src={userAvatar}
                alt="Profile"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = DEFAULT_AVATAR;
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
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
                  disabled={isLoggingOut}
                >
                  <LogOut size={16} /> {isLoggingOut ? 'Logging out...' : 'Logout'}
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
import React, { useState, useRef, useEffect } from 'react';
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
  title = 'Add New Product',
  breadcrumbs = ['Dashboard', 'Shop / Products', 'Add New Product'],
  websiteUrl = '#',
}) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="Topbar">
      <div className="Topbar-left">
        <button className="Topbar-toggleBtn" onClick={toggleSidebar} aria-label="Toggle Sidebar">
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
                <span className={`Topbar-breadcrumb-item ${index === breadcrumbs.length - 1 ? 'current' : ''}`}>
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="Topbar-right">
        <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="Topbar-visitBtn">
          <span>Visit Website</span>
          <ExternalLink size={14} />
        </a>

        <div className="Notification" ref={notificationRef}>
          <button
            className="Topbar-iconBtn"
            onClick={() => setNotificationOpen(!notificationOpen)}
            aria-label="Notifications"
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
                initial={{ opacity: 0, scale: 0.92, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -8 }}
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
                  <button>View All</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="ProfileMenu" ref={profileRef}>
          <button className="ProfileMenu-trigger" onClick={() => setProfileOpen(!profileOpen)}>
            <div className="ProfileMenu-avatar">
              <User size={16} />
            </div>
            <span className="ProfileMenu-name">Admin</span>
            <ChevronDown size={15} className={`ProfileMenu-chevron ${profileOpen ? 'open' : ''}`} />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                className="Topbar-popup ProfileMenu-dropdown"
                initial={{ opacity: 0, scale: 0.92, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -8 }}
                transition={{ duration: 0.16, ease: 'easeOut' }}
              >
                <button className="ProfileMenu-item">
                  <User size={16} /> My Profile
                </button>
                <button className="ProfileMenu-item">
                  <Settings size={16} /> Settings
                </button>
                <button className="ProfileMenu-item">
                  <HelpCircle size={16} /> Help
                </button>
                <div className="ProfileMenu-divider" />
                <button className="ProfileMenu-item danger">
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
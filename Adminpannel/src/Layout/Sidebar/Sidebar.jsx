// Sidebar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  GraduationCap,
  UserPlus,
  Users,
  UserCheck,
  BookOpen,
  CalendarCheck,
  Wallet,
  ClipboardList,
  CalendarDays,
  NotebookPen,
  Library,
  Bus,
  Image as ImageIcon,
  FileText,
  Bell,
  Mail,
  Globe,
  Store,
  Settings,
  BarChart3,
  ChevronRight,
  ChevronDown,
  Phone,
  Maximize2,
  Power,
  X,
} from 'lucide-react';
import './Sidebar.css';

// Controlled by the parent layout — isCollapsed/isMobileOpen/onMobileClose
// keep this in sync with the Topbar toggle and the layout's content offset.
const Sidebar = ({ isCollapsed = false, isMobileOpen = false, onMobileClose = () => {} }) => {
  const [openDropdowns, setOpenDropdowns] = useState({});
  // Labels must show whenever the mobile drawer is open, no matter what the
  // desktop "collapsed" rail state happens to be — otherwise React never
  // renders the text/arrow/submenu elements into the DOM at all on mobile,
  // and no CSS override can bring back something that was never rendered.
  const showLabels = !isCollapsed || isMobileOpen;

  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const menuItems = [
    { type: 'link', icon: Home, text: 'Dashboard', path: '/dashboard' },
    { type: 'link', icon: GraduationCap, text: 'Students', path: '/students' },
    { type: 'link', icon: UserPlus, text: 'Admissions', path: '/admissions' },
    { type: 'link', icon: Users, text: 'Parents', path: '/parents' },
    { type: 'link', icon: UserCheck, text: 'Teachers', path: '/teachers' },
    { type: 'link', icon: BookOpen, text: 'Classes', path: '/classes' },
    { type: 'link', icon: CalendarCheck, text: 'Attendance', path: '/attendance' },
    { type: 'link', icon: Wallet, text: 'Fees & Payments', path: '/fees-payments' },
    { type: 'link', icon: ClipboardList, text: 'Examinations', path: '/examinations' },
    { type: 'link', icon: CalendarDays, text: 'Events', path: '/events' },
    { type: 'link', icon: NotebookPen, text: 'Homework', path: '/homework' },
    { type: 'link', icon: Library, text: 'Library', path: '/library' },
    { type: 'link', icon: Bus, text: 'Transport', path: '/transport' },
    { type: 'link', icon: ImageIcon, text: 'Gallery Management', path: '/gallery-management' },

    {
      type: 'dropdown',
      key: 'blog',
      icon: FileText,
      text: 'Blog Posting',
      subItems: [
        { text: 'Blog Post', path: '/blog/post' },
        { text: 'Blog Management', path: '/blog/management' },
      ],
    },

    { type: 'link', icon: Bell, text: 'Notice Board', path: '/notice-board' },
    { type: 'link', icon: Mail, text: 'Contact Messages', path: '/contact-messages' },
    { type: 'link', icon: Globe, text: 'Website Manage', path: '/website-manage' },

    {
      type: 'dropdown',
      key: 'shop',
      icon: Store,
      text: 'Shop',
      subItems: [
        { text: 'Shop', path: '/shop' },
        { text: 'Add to Shop', path: '/shop/add' },
      ],
    },

    { type: 'link', icon: Settings, text: 'Settings', path: '/settings' },
    { type: 'link', icon: BarChart3, text: 'Reports', path: '/reports' },
  ];

  return (
    <>
      {isMobileOpen && <div className="Sidebar-overlay" onClick={onMobileClose} />}

      <aside className={`Sidebar ${isCollapsed ? 'collapsed' : 'expanded'} ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Logo header */}
        <div className="Sidebar-header">
          <div className="Sidebar-logoMark" aria-hidden="true">
            <svg viewBox="0 0 40 40" width="26" height="26">
              <defs>
                <linearGradient id="kidsSchoolLogoGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FDE68A" />
                  <stop offset="35%" stopColor="#F472B6" />
                  <stop offset="70%" stopColor="#818CF8" />
                  <stop offset="100%" stopColor="#38BDF8" />
                </linearGradient>
              </defs>
              <path
                d="M20 5 C 27 5, 33 11, 33 18 C 33 27, 27 32, 20 35 C 13 32, 7 27, 7 18 C 7 11, 13 5, 20 5 Z"
                fill="url(#kidsSchoolLogoGrad)"
              />
              <path d="M13 18 L20 14 L27 18 L20 22 Z" fill="#1E1B4B" opacity="0.85" />
            </svg>
          </div>

          {showLabels && (
            <div className="Sidebar-brandText">
              <h1>Kids School</h1>
              <span>Admin Panel</span>
            </div>
          )}

          <button className="Sidebar-mobile-close" onClick={onMobileClose} aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="Sidebar-nav">
          <ul className="Sidebar-menu">
            {menuItems.map((item, index) => {
              if (item.type === 'link') {
                const Icon = item.icon;
                return (
                  <li key={index} className="SidebarItem">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `SidebarItem-link ${isActive ? 'active' : ''}`}
                      title={!showLabels ? item.text : ''}
                      onClick={onMobileClose}
                    >
                      <span className="SidebarItem-icon">
                        <Icon size={18} />
                      </span>
                      {showLabels && <span className="SidebarItem-text">{item.text}</span>}
                      {showLabels && <ChevronRight className="SidebarItem-arrow" size={15} />}
                    </NavLink>
                  </li>
                );
              }

              // Dropdown
              const Icon = item.icon;
              const isOpen = !!openDropdowns[item.key];
              return (
                <li key={index} className={`SidebarItem SidebarItem-dropdown ${isOpen ? 'is-open' : ''}`}>
                  <button
                    className="SidebarItem-link SidebarItem-toggle"
                    onClick={() => showLabels && toggleDropdown(item.key)}
                    title={!showLabels ? item.text : ''}
                  >
                    <span className="SidebarItem-icon">
                      <Icon size={18} />
                    </span>
                    {showLabels && <span className="SidebarItem-text">{item.text}</span>}
                    {showLabels && (
                      <ChevronDown className={`SidebarItem-chevron ${isOpen ? 'rotated' : ''}`} size={15} />
                    )}
                  </button>

                  {showLabels && (
                    <ul className="SidebarItem-submenu">
                      {item.subItems.map((sub, subIndex) => (
                        <li key={subIndex}>
                          <NavLink
                            to={sub.path}
                            className={({ isActive }) => `SidebarItem-subLink ${isActive ? 'active' : ''}`}
                            onClick={onMobileClose}
                          >
                            {sub.text}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User footer */}
        <div className="Sidebar-userCard">
          <div className="Sidebar-userTop">
            <div className="Sidebar-avatar">
              <Users size={16} />
            </div>
            {showLabels && (
              <div className="Sidebar-userInfo">
                <span className="Sidebar-userName">Admin User</span>
                <span className="Sidebar-userRole">Super Admin</span>
              </div>
            )}
          </div>

          {showLabels && (
            <div className="Sidebar-userActions">
              <button className="Sidebar-userActionBtn" aria-label="Support">
                <Phone size={15} />
              </button>
              <button className="Sidebar-userActionBtn" aria-label="Full screen">
                <Maximize2 size={15} />
              </button>
              <button className="Sidebar-userActionBtn Sidebar-userActionBtn-danger" aria-label="Log out">
                <Power size={15} />
              </button>
            </div>
          )}
        </div>

        {/* Bottom illustration banner */}
        {showLabels && (
          <div className="Sidebar-illustration" aria-hidden="true">
            <svg viewBox="0 0 260 110" preserveAspectRatio="xMidYMax meet">
              <circle cx="215" cy="26" r="16" fill="#FDE68A" opacity="0.9" />
              <rect x="0" y="94" width="260" height="16" fill="#312E81" />
              <rect x="70" y="46" width="120" height="48" rx="4" fill="#F8FAFC" />
              <polygon points="60,46 130,18 200,46" fill="#EF4444" />
              <rect x="118" y="66" width="24" height="28" fill="#6366F1" />
              <rect x="82" y="60" width="16" height="16" fill="#93C5FD" />
              <rect x="162" y="60" width="16" height="16" fill="#93C5FD" />
              <circle cx="34" cy="88" r="12" fill="#34D399" />
              <circle cx="228" cy="88" r="10" fill="#34D399" />
              <circle cx="40" cy="94" r="6" fill="#FBBF24" />
              <circle cx="55" cy="96" r="5" fill="#FB923C" />
              <circle cx="205" cy="96" r="5" fill="#F472B6" />
            </svg>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
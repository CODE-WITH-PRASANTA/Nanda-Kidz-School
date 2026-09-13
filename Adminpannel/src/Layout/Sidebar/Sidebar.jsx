import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

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
  BookMarked,
  Clock,
  Award,
  Send, // Icon for teacher posts
  HelpCircle, // Icon for floating enquiries
} from 'lucide-react';

import './Sidebar.css';

const Sidebar = ({
  isCollapsed = false,
  isMobileOpen = false,
  onMobileClose = () => {},
}) => {
  const location = useLocation();

  const [openDropdowns, setOpenDropdowns] = useState({});

  const showLabels = !isCollapsed || isMobileOpen;

  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // =====================================================
  // SIDEBAR MENU
  // =====================================================

  const menuCategories = [
    // =====================================================
    // MAIN MENU
    // =====================================================

    {
      category: 'Main Menu',

      items: [
        {
          type: 'link',
          icon: Home,
          text: 'Dashboard',
          path: '/dashboard',
        },
      ],
    },

    // =====================================================
    // ACADEMIC MANAGEMENT
    // =====================================================

    {
      category: 'Academic Management',

      items: [
        {
          type: 'dropdown',
          key: 'academics',
          icon: BookOpen,
          text: 'Class & Subjects',

          subItems: [
            {
              text: 'Class Management',
              path: '/classes',
            },
            {
              text: 'Subject Management',
              path: '/subjects',
            },
            {
              text: 'Schedules & Routines',
              path: '/class-schedules',
            },
          ],
        },

        {
          type: 'link',
          icon: CalendarCheck,
          text: 'Attendance',
          path: '/teacher-attendance',
        },

        {
          type: 'dropdown',
          key: 'examinations',
          icon: ClipboardList,
          text: 'Examinations',

          subItems: [
            {
              text: 'Exam Schedules',
              path: '/examinations',
            },
            {
              text: 'Marks & Grades',
              path: '/marks-management',
            },
          ],
        },

        {
          type: 'link',
          icon: NotebookPen,
          text: 'Homework',
          path: '/homework',
        },
      ],
    },

    // =====================================================
    // ADMINISTRATION
    // =====================================================

    {
      category: 'Administration',

      items: [
        {
          type: 'dropdown',
          key: 'people',
          icon: Users,
          text: 'Users & Staff',

          subItems: [
            {
              text: 'Students',
              path: '/students',
            },
            {
              text: 'Admissions',
              path: '/admissions',
            },
            {
              text: 'Parents',
              path: '/parents',
            },
            {
              text: 'Teachers List',
              path: '/teachers',
            },
          ],
        },
<<<<<<< HEAD
        { type: 'link', icon: Wallet, text: 'Fees & Payments', path: '/fees-payments' },
        { type: 'link', icon: Bus, text: 'Transport', path: '/transport' },
        { type: 'link', icon: Library, text: 'Library', path: '/library' },
        { type: 'link', icon: Bus, text: 'Cold Lead', path: '/coldlead' },
        { type: 'link', icon: Library, text: 'Order', path: '/order' },
=======

        {
          type: 'link',
          icon: Wallet,
          text: 'Fees & Payments',
          path: '/fees-payments',
        },

        {
          type: 'link',
          icon: Bus,
          text: 'Transport',
          path: '/transport',
        },

        {
          type: 'link',
          icon: Library,
          text: 'Library',
          path: '/library',
        },

        {
          type: 'link',
          icon: Bus,
          text: 'Cold Lead',
          path: '/coldlead',
        },

        {
          type: 'link',
          icon: Library,
          text: 'Order',
          path: '/order',
        },
>>>>>>> b9039e9 (pull)
      ],
    },

    // =====================================================
    // CONTENT & COMMUNICATION
    // =====================================================

    {
      category: 'Content & Communication',

      items: [
        {
          type: 'dropdown',
          key: 'blog',
          icon: FileText,
          text: 'Blog Posting',

          subItems: [
            {
              text: 'Create Post',
              path: '/blog/post',
            },
            {
              text: 'Manage Posts',
              path: '/blog/management',
            },
          ],
        },
<<<<<<< HEAD
        { type: 'link', icon: Send, text: 'Teacher Post', path: '/teacher-posts' },
        { type: 'link', icon: ImageIcon, text: 'Gallery Management', path: '/gallery-management' },
        { type: 'link', icon: CalendarDays, text: 'Events', path: '/events' },
        { type: 'link', icon: Bell, text: 'Notice Board', path: '/notice-board' },
        { type: 'link', icon: Mail, text: 'Contact Messages', path: '/contact-messages' },
        { type: 'link', icon: Globe, text: 'Website Manage', path: '/website-manage' },
=======

        {
          type: 'link',
          icon: ImageIcon,
          text: 'Gallery Management',
          path: '/gallery-management',
        },

        {
          type: 'link',
          icon: CalendarDays,
          text: 'Events',
          path: '/events',
        },

        {
          type: 'link',
          icon: Bell,
          text: 'Notice Board',
          path: '/notice-board',
        },

        {
          type: 'link',
          icon: Mail,
          text: 'Contact Messages',
          path: '/contact-messages',
        },

        {
          type: 'link',
          icon: Globe,
          text: 'Website Manage',
          path: '/website-manage',
        },

        // =================================================
        // ⭐ TESTIMONIALS - NORMAL SIDEBAR ITEM
        // =================================================

        {
          type: 'link',
          icon: FileText,
          text: 'Testimonials',
          path: '/testimonials',
        },
>>>>>>> b9039e9 (pull)
      ],
    },

    // =====================================================
    // SYSTEM & COMMERCE
    // =====================================================

    {
      category: 'Enquiries',
      items: [
        { type: 'link', icon: HelpCircle, text: 'Floating Enquiries', path: '/floating-enquiries' },
      ],
    },
    {
      category: 'System & Commerce',

      items: [
        {
          type: 'dropdown',
          key: 'shop',
          icon: Store,
          text: 'Store & Products',

          subItems: [
            {
              text: 'Shop Overview',
              path: '/shop',
            },
            {
              text: 'Add Product',
              path: '/shop/add',
            },
          ],
        },

        {
          type: 'link',
          icon: BarChart3,
          text: 'Reports',
          path: '/reports',
        },

        {
          type: 'link',
          icon: Settings,
          text: 'Settings',
          path: '/settings',
        },
      ],
    },
  ];

  // =====================================================
  // AUTO OPEN ACTIVE DROPDOWN
  // =====================================================

  useEffect(() => {
    menuCategories.forEach((section) => {
      section.items.forEach((item) => {
        if (item.type === 'dropdown') {
          const hasActiveChild = item.subItems.some(
            (sub) => sub.path === location.pathname
          );

          if (hasActiveChild) {
            setOpenDropdowns((prev) => ({
              ...prev,
              [item.key]: true,
            }));
          }
        }
      });
    });
  }, [location.pathname]);

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="Sidebar-overlay"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`Sidebar ${
          isCollapsed ? 'collapsed' : 'expanded'
        } ${isMobileOpen ? 'mobile-open' : ''}`}
      >

        {/* =================================================
            BRAND HEADER
        ================================================= */}

        <div className="Sidebar-header">

          <div
            className="Sidebar-logoMark"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 40 40"
              width="26"
              height="26"
            >
              <defs>
                <linearGradient
                  id="kidsSchoolLogoGrad"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#FDE68A"
                  />

                  <stop
                    offset="35%"
                    stopColor="#F472B6"
                  />

                  <stop
                    offset="70%"
                    stopColor="#818CF8"
                  />

                  <stop
                    offset="100%"
                    stopColor="#38BDF8"
                  />
                </linearGradient>
              </defs>

              <path
                d="M20 5 C 27 5, 33 11, 33 18 C 33 27, 27 32, 20 35 C 13 32, 7 27, 7 18 C 7 11, 13 5, 20 5 Z"
                fill="url(#kidsSchoolLogoGrad)"
              />

              <path
                d="M13 18 L20 14 L27 18 L20 22 Z"
                fill="#1E1B4B"
                opacity="0.85"
              />
            </svg>
          </div>

          {showLabels && (
            <div className="Sidebar-brandText">
              <h1>Nanda Kidz</h1>
              <span>Admin Panel</span>
            </div>
          )}

          <button
            className="Sidebar-mobile-close"
            onClick={onMobileClose}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>

        </div>

        {/* =================================================
            CATEGORIZED NAVIGATION
        ================================================= */}

        <nav className="Sidebar-nav">

          {menuCategories.map((catGroup, catIdx) => (

            <div
              key={catIdx}
              className="Sidebar-section"
            >

              {/* Category Title */}

              {showLabels && (
                <div className="Sidebar-categoryTitle">
                  {catGroup.category}
                </div>
              )}

              <ul className="Sidebar-menu">

                {catGroup.items.map((item, index) => {

                  // =================================================
                  // NORMAL LINK
                  // =================================================

                  if (item.type === 'link') {

                    const Icon = item.icon;

                    return (
                      <li
                        key={index}
                        className="SidebarItem"
                      >

                        <NavLink
                          to={item.path}
                          className={({ isActive }) =>
                            `SidebarItem-link ${
                              isActive ? 'active' : ''
                            }`
                          }
                          title={
                            !showLabels
                              ? item.text
                              : ''
                          }
                          onClick={onMobileClose}
                        >

                          <span className="SidebarItem-icon">
                            <Icon size={18} />
                          </span>

                          {showLabels && (
                            <span className="SidebarItem-text">
                              {item.text}
                            </span>
                          )}

                          {showLabels && (
                            <ChevronRight
                              className="SidebarItem-arrow"
                              size={15}
                            />
                          )}

                        </NavLink>

                      </li>
                    );
                  }

                  // =================================================
                  // DROPDOWN MENU
                  // =================================================

                  const Icon = item.icon;

                  const isOpen =
                    !!openDropdowns[item.key];

                  return (
                    <li
                      key={index}
                      className={`SidebarItem SidebarItem-dropdown ${
                        isOpen ? 'is-open' : ''
                      }`}
                    >

                      <button
                        className="SidebarItem-link SidebarItem-toggle"
                        onClick={() =>
                          showLabels &&
                          toggleDropdown(item.key)
                        }
                        title={
                          !showLabels
                            ? item.text
                            : ''
                        }
                      >

                        <span className="SidebarItem-icon">
                          <Icon size={18} />
                        </span>

                        {showLabels && (
                          <span className="SidebarItem-text">
                            {item.text}
                          </span>
                        )}

                        {showLabels && (
                          <ChevronDown
                            className={`SidebarItem-chevron ${
                              isOpen
                                ? 'rotated'
                                : ''
                            }`}
                            size={15}
                          />
                        )}

                      </button>

                      {/* Sub Menu */}

                      {showLabels && isOpen && (
                        <ul className="SidebarItem-submenu">

                          {item.subItems.map(
                            (sub, subIndex) => (

                              <li key={subIndex}>

                                <NavLink
                                  to={sub.path}
                                  className={({ isActive }) =>
                                    `SidebarItem-subLink ${
                                      isActive
                                        ? 'active'
                                        : ''
                                    }`
                                  }
                                  onClick={onMobileClose}
                                >
                                  {sub.text}
                                </NavLink>

                              </li>

                            )
                          )}

                        </ul>
                      )}

                    </li>
                  );
                })}

              </ul>

            </div>

          ))}

        </nav>

        {/* =================================================
            USER CARD
        ================================================= */}

        <div className="Sidebar-userCard">

          <div className="Sidebar-userTop">

            <div className="Sidebar-avatar">
              <Users size={16} />
            </div>

            {showLabels && (
              <div className="Sidebar-userInfo">

                <span className="Sidebar-userName">
                  Admin User
                </span>

                <span className="Sidebar-userRole">
                  Super Admin
                </span>

              </div>
            )}

          </div>

          {showLabels && (
            <div className="Sidebar-userActions">

              <button
                className="Sidebar-userActionBtn"
                aria-label="Support"
              >
                <Phone size={15} />
              </button>

              <button
                className="Sidebar-userActionBtn"
                aria-label="Full screen"
              >
                <Maximize2 size={15} />
              </button>

              <button
                className="Sidebar-userActionBtn Sidebar-userActionBtn-danger"
                aria-label="Log out"
              >
                <Power size={15} />
              </button>

            </div>
          )}

        </div>

      </aside>
    </>
  );
};

export default Sidebar;
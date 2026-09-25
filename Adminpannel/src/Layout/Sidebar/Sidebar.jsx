import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// Import your logo file
import logo from '../../assets/nanda image .png'; 

import {
  Home,
  Users,
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
  ChevronRight,
  ChevronDown,
  Phone,
  Maximize2,
  Power,
  X,
  HelpCircle,
  Send,
  Newspaper,
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
    // ⭐ LATEST NEWS SECTION
    // =====================================================
    {
      category: 'Updates',
      items: [
        {
          type: 'link',
          icon: Newspaper,
          text: 'Latest News',
          path: '/latestnews',
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
              text: 'Admission List',
              path: '/admission-list',
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
        { type: 'link', icon: Wallet, text: 'Fees & Payments', path: '/fees-payments' },
        { type: 'link', icon: Bus, text: 'Transport', path: '/transport' },
       
        { type: 'link', icon: Bus, text: 'Cold Lead', path: '/coldlead' },
        { type: 'link', icon: Library, text: 'Order', path: '/order' },
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
        { type: 'link', icon: Send, text: 'Teacher Post', path: '/teacher-posts' },
        { type: 'link', icon: ImageIcon, text: 'Gallery Management', path: '/gallery-management' },
        { type: 'link', icon: CalendarDays, text: 'Events', path: '/events' },
        { type: 'link', icon: Bell, text: 'Notice Board', path: '/notice-board' },
        { type: 'link', icon: Mail, text: 'Contact Messages', path: '/contact-messages' },
        { type: 'link', icon: Globe, text: 'Website Manage', path: '/website-manage' },
        { type: 'link', icon: FileText, text: 'Testimonials', path: '/testimonials' },
      ],
    },

    // =====================================================
    // ENQUIRIES
    // =====================================================
    {
      category: 'Enquiries',
      items: [
        {
          type: 'link',
          icon: HelpCircle,
          text: 'Floating Enquiries',
          path: '/floating-enquiries',
        },
      ],
    },

    // =====================================================
    // SYSTEM & COMMERCE
    // =====================================================
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
          icon: ImageIcon,
          text: 'Shop Image',
          path: '/shop-images',
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
      {/* =================================================
          MOBILE OVERLAY
      ================================================= */}
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
          <div className="Sidebar-logoMark">
            <img src={logo} alt="Kids School Logo" className="Sidebar-logoImg" />
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
              {showLabels && (
                <div className="Sidebar-categoryTitle">
                  {catGroup.category}
                </div>
              )}

              <ul className="Sidebar-menu">
                {catGroup.items.map((item, index) => {
                  // NORMAL LINK
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
                          title={!showLabels ? item.text : ''}
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

                  // DROPDOWN MENU
                  const Icon = item.icon;
                  const isOpen = !!openDropdowns[item.key];

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
                          showLabels && toggleDropdown(item.key)
                        }
                        title={!showLabels ? item.text : ''}
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
                              isOpen ? 'rotated' : ''
                            }`}
                            size={15}
                          />
                        )}
                      </button>

                      {/* SUB MENU */}
                      {showLabels && isOpen && (
                        <ul className="SidebarItem-submenu">
                          {item.subItems.map((sub, subIndex) => (
                            <li key={subIndex}>
                              <NavLink
                                to={sub.path}
                                className={({ isActive }) =>
                                  `SidebarItem-subLink ${
                                    isActive ? 'active' : ''
                                  }`
                                }
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
                <span className="Sidebar-userName">Admin User</span>
                <span className="Sidebar-userRole">Super Admin</span>
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
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
  Library,
  Image as ImageIcon,
  FileText,
  Bell,
  Mail,
  Globe,
  Store,
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
  // SIDEBAR MENU (REORDERED & CLEANED)
  // =====================================================

  const menuCategories = [
    {
      category: 'Main Menu',
      items: [
        // 1. Dashboard
        {
          type: 'link',
          icon: Home,
          text: 'Dashboard',
          path: '/dashboard',
        },
        // 2. Latest News
        {
          type: 'link',
          icon: Newspaper,
          text: 'Latest News',
          path: '/latestnews',
        },
        // 3. Floating Enquiries
        {
          type: 'link',
          icon: HelpCircle,
          text: 'Floating Enquiries',
          path: '/floating-enquiries',
        },
        // 4. Shop Image
        {
          type: 'link',
          icon: ImageIcon,
          text: 'Shop Image',
          path: '/shop-images',
        },
        // 5. Order
        {
          type: 'link',
          icon: Library,
          text: 'Order',
          path: '/order',
        },
        // 6. Blog Posting
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
        // 7. Users & Staff
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
        // 8. Teacher Post
        {
          type: 'link',
          icon: Send,
          text: 'Teacher Post',
          path: '/teacher-posts',
        },
        // 9. Gallery Management
        {
          type: 'link',
          icon: ImageIcon,
          text: 'Gallery Management',
          path: '/gallery-management',
        },
        // 10. Testimonials
        {
          type: 'link',
          icon: FileText,
          text: 'Testimonials',
          path: '/testimonials',
        },
        // 11. Contact Messages
        {
          type: 'link',
          icon: Mail,
          text: 'Contact Messages',
          path: '/contact-messages',
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
      {/* MOBILE OVERLAY */}
      {isMobileOpen && (
        <div className="Sidebar-overlay" onClick={onMobileClose} />
      )}

      <aside
        className={`Sidebar ${
          isCollapsed ? 'collapsed' : 'expanded'
        } ${isMobileOpen ? 'mobile-open' : ''}`}
      >
        {/* BRAND HEADER */}
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

        {/* NAVIGATION */}
        <nav className="Sidebar-nav">
          {menuCategories.map((catGroup, catIdx) => (
            <div key={catIdx} className="Sidebar-section">
              {showLabels && (
                <div className="Sidebar-categoryTitle">
                  {catGroup.category}
                </div>
              )}

              <ul className="Sidebar-menu">
                {catGroup.items.map((item, index) => {
                  // Normal Link
                  if (item.type === 'link') {
                    const Icon = item.icon;

                    return (
                      <li key={index} className="SidebarItem">
                        <NavLink
                          to={item.path}
                          className={({ isActive }) =>
                            `SidebarItem-link ${isActive ? 'active' : ''}`
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

                  // Dropdown Menu
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

                      {/* Submenu */}
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

        {/* USER CARD */}
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
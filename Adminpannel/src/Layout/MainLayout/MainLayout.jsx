import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

import "./MainLayout.css";

const Breadcrumb = () => {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter(Boolean);

  const formatName = (name) =>
    name
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <nav className="Breadcrumb">
      <ol className="Breadcrumb-list">
        <li className="Breadcrumb-item">
          <Link to="/dashboard" className="Breadcrumb-link">
            <Home size={15} />
          </Link>
        </li>

        {pathnames.map((item, index) => {
          const url = "/" + pathnames.slice(0, index + 1).join("/");
          const last = index === pathnames.length - 1;

          return (
            <React.Fragment key={url}>
              <ChevronRight size={14} className="Breadcrumb-separator" />

              <li className="Breadcrumb-item">
                {last ? (
                  <span className="Breadcrumb-current">
                    {formatName(item)}
                  </span>
                ) : (
                  <Link className="Breadcrumb-link" to={url}>
                    {formatName(item)}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1023) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
        setMobileSidebar(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    if (window.innerWidth <= 1023) {
      setMobileSidebar((prev) => !prev);
    } else {
      setSidebarOpen((prev) => !prev);
    }
  };

  return (
    <div className="MainLayout">
      <Sidebar
        isCollapsed={!sidebarOpen}
        isMobileOpen={mobileSidebar}
        onMobileClose={() => setMobileSidebar(false)}
      />

      <div
        className={`MainContent-wrapper ${
          sidebarOpen ? "expanded" : "collapsed"
        }`}
      >
        <Topbar toggleSidebar={toggleSidebar} />

        <main className="MainContent">
          <Breadcrumb />

          <div className="MainContent-outlet">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
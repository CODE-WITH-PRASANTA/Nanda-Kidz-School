import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import "./MainLayout.css";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebar(!mobileSidebar);
  };

  // If the window is resized back above the mobile breakpoint while the
  // drawer is open (e.g. rotating a tablet, resizing a browser window),
  // close it so it doesn't get stuck open behind the desktop layout.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992 && mobileSidebar) {
        setMobileSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileSidebar]);

  return (
    <div className="MainLayout">
      <Sidebar
        collapsed={collapsed}
        mobileSidebar={mobileSidebar}
        toggleMobileSidebar={toggleMobileSidebar}
      />

      <div
        className={`MainLayout-content ${collapsed ? "collapsed" : ""}`}
      >
        <Topbar
          collapsed={collapsed}
          toggleSidebar={toggleSidebar}
          toggleMobileSidebar={toggleMobileSidebar}
        />

        <div className="MainLayout-page">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
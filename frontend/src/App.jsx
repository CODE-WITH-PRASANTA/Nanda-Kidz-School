import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// Layout Components
import Topbar from "./Components/Topbar/Topbar";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import FloatingIcons from "./Components/FloatingIcons/FloatingIcons";

// Page Components
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Blog from "./Pages/Blog/Blog";
import BlogDetails from "./Pages/BlogDetails/BlogDetails";
import Courses from "./Pages/Courses/Courses";
import ClassDetails from "./Pages/ClassDetails/ClassDetails";
import Shop from "./Pages/Shop/Shop";
import Gallery from "./Pages/Gallery/Gallery";
import Pricing from "./Pages/Pricing/Pricing";
import Price from "./Pages/price/price";
import TimeTable from "./Pages/TimeTable/TimeTable";
import Teacher from "./Pages/Teacher/Teacher";
import TeacherDetails from "./Pages/TeacherDetails/TeacherDetails";
import Faq from "./Pages/Faq/Faq";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Termandconditions from "./Pages/Termandconditions/Termandconditions";
import Privacypolicy from "./Pages/Privacypolicy/Privacypolicy";

import "./App.css";

// Scroll to top on route changes
const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    document
      .querySelectorAll(".app, main, #root")
      .forEach((container) => {
        container.scrollTop = 0;
      });
  }, [pathname, search]);

  return null;
};

// Full-screen route loader
const RouteLoader = () => {
  const { pathname, search } = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 650);

    return () => window.clearTimeout(timer);
  }, [pathname, search]);

  if (!loading) return null;

  return (
    <div
      className="route-loader-overlay"
      role="status"
      aria-label="Loading page"
      aria-live="polite"
    >
      <div className="route-loader-content">
        <div className="route-loader-spinner">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <h2>NANDA KIDZ</h2>
        <p>Preparing your little world...</p>

        <div className="route-loader-progress">
          <span></span>
        </div>
      </div>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />

      <Topbar />
      <Navbar />

      <RouteLoader />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />

        {/* Core Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/classes/details" element={<ClassDetails />} />
        <Route path="/class-details/:id" element={<ClassDetails />} />

        {/* Teachers */}
        <Route path="/teachers" element={<Teacher />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/teachers/details" element={<TeacherDetails />} />
        <Route path="/teacher-details/:id" element={<TeacherDetails />} />

        {/* Blog */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />

        {/* Utility Pages */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/price" element={<Price />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/timetable" element={<TimeTable />} />
        <Route path="/time-table" element={<TimeTable />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Legal Pages */}
        <Route path="/terms-and-conditions" element={<Termandconditions />} />
        <Route path="/termandcondition" element={<Termandconditions />} />
        <Route path="/privacy-policy" element={<Privacypolicy />} />
        <Route path="/privacypolicy" element={<Privacypolicy />} />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Floating Action Buttons */}
      <FloatingIcons />

      <Footer />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
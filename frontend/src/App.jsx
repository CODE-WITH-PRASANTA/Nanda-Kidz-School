import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout Components
import Topbar from "./Components/Topbar/Topbar";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

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
import TimeTable from "./Pages/TimeTable/TimeTable";
import Teacher from "./Pages/Teacher/Teacher";
import TeacherDetails from "./Pages/TeacherDetails/TeacherDetails";
import Faq from "./Pages/Faq/Faq";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Termandconditions from "./Pages/Termandconditions/Termandconditions";
import Privacypolicy from "./Pages/Privacypolicy/Privacypolicy";

const App = () => {
  return (
    <BrowserRouter>
      {/* Global Header Elements */}
      <Topbar />
      <Navbar />

      {/* Application Routes */}
      <Routes>
        {/* Home Routes (Canonical Home at `/`) */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />

        {/* Core Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/classes/details" element={<ClassDetails />} />

        {/* Teachers / Instructors */}
        <Route path="/teachers" element={<Teacher />} />
        <Route path="/teachers/details" element={<TeacherDetails />} />

        {/* Blog & News */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />

        {/* Utility & Features */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/timetable" element={<TimeTable />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* SEO-Optimized Legal Slugs */}
        <Route path="/terms-and-conditions" element={<Termandconditions />} />
        <Route path="/privacy-policy" element={<Privacypolicy />} />

        {/* 404 Fallback for Unmatched Routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Footer Element */}
      <Footer />
    </BrowserRouter>
  );
};

export default App;
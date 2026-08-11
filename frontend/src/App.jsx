import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout Components
import Topbar from "./Components/Topbar/Topbar";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Floating from "./Components/Floating/Floating";

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
import Price from "./Pages/Price/Price"; // Make sure this path exists in your project
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
        {/* Home Routes (Canonical Redirects `/home` -> `/`) */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />

        {/* Core Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/classes/details" element={<ClassDetails />} />
        <Route path="/class-details/:id" element={<ClassDetails />} />

        {/* Teachers / Instructors */}
        <Route path="/teachers" element={<Teacher />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/teachers/details" element={<TeacherDetails />} />
        <Route path="/teacher-details/:id" element={<TeacherDetails />} />

        {/* Blog & News */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />

        {/* Utility & Features */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/price" element={<Price />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/timetable" element={<TimeTable />} />
        <Route path="/time-table" element={<TimeTable />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Legal & Policy Routes */}
        <Route path="/terms-and-conditions" element={<Termandconditions />} />
        <Route path="/termandcondition" element={<Termandconditions />} />
        <Route path="/privacy-policy" element={<Privacypolicy />} />
        <Route path="/privacypolicy" element={<Privacypolicy />} />

        {/* 404 Fallback for Unmatched Routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global Widgets & Footer */}
      <Floating />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Topbar from "./Components/Topbar/Topbar";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
 
import Floating from "./Components/Floating/Floating";

// Pages
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Blog from "./Pages/Blog/Blog";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Price from "./Pages/price/price"; 
import Courses from "./Pages/Courses/Courses";
import Shop from "./Pages/Shop/Shop";
import Faq from "./Pages/Faq/Faq";
import Teacher from "./Pages/Teacher/Teacher";
import TeacherDetails from "./Pages/TeacherDetails/TeacherDetails";
import ClassDetails from "./Pages/ClassDetails/ClassDetails";
import BlogDetails from "./Pages/BlogDetails/BlogDetails";
import Termandconditions from "./Pages/Termandconditions/Termandconditions";
import Privacypolicy from "./Pages/Privacypolicy/Privacypolicy";
import Gallery from "./Pages/Gallery/Gallery";
import Pricing from "./Pages/Pricing/Pricing";
import TimeTable from "./Pages/TimeTable/TimeTable";

const App = () => {
  return (
    <BrowserRouter>
      {/* Common Header Components */}
      <Topbar />
      <Navbar />

      {/* Page Routes */}
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/price" element={<Price />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/time-table" element={<TimeTable />} />

        {/* Teacher Routes */}
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/teacher-details/:id" element={<TeacherDetails />} />

        {/* Dynamic Detail Routes */}
        <Route path="/class-details/:id" element={<ClassDetails />} />
        <Route path="/blog/:id" element={<BlogDetails />} />

        {/* Legal & Policies */}
        <Route path="/termandcondition" element={<Termandconditions />} />
        <Route path="/privacypolicy" element={<Privacypolicy />} />
      </Routes>

      {/* Floating Widget & Footer */}
      <Floating />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
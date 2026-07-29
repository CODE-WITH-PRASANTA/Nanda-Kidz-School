import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Topbar from "./Components/Topbar/Topbar";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

// Pages
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Blog from "./Pages/Blog/Blog";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Price from "./Pages/price/price"; 
import Courses from "./Pages/Courses/Courses";

const App = () => {
  return (
    <BrowserRouter>
      {/* Common Components */}
      <Topbar />
      <Navbar />

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/price" element={<Price />} />
        <Route path="/Courses" element={<Courses/>} />
      </Routes>

      {/* Common Footer */}
      <Footer />
    </BrowserRouter>
  );
};

export default App;
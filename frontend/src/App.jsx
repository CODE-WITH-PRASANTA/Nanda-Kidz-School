import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Topbar from "./Components/Topbar/Topbar";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Floating from "./Components/Floating/Floating"; // Adjust path if inside Pages folder

// Pages
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Blog from "./Pages/Blog/Blog";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Price from "./Pages/price/price"; 
import Courses from "./Pages/Courses/Courses";
import Shop from "./Pages/Shop/Shop";
import ClassDetails from "./Pages/ClassDetails/ClassDetails";
import BlogDetails from "./Pages/BlogDetails/BlogDetails";
import Termandconditions from "./Pages/Termandconditions/Termandconditions";
import Privacypolicy from "./Pages/Privacypolicy/Privacypolicy";

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
        <Route path="/courses" element={<Courses />} />
        <Route path="/shop" element={<Shop />} />
        
        {/* Dynamic Parameter Routes */}
        <Route path="/class-details/:id" element={<ClassDetails />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        
        <Route path="/termandcondition" element={<Termandconditions />} />
        <Route path="/privacypolicy" element={<Privacypolicy />} />

      
      </Routes>
      <Floating />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
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
import Shop from "./Pages/Shop/Shop";
import Faq from "./Pages/Faq/Faq";
import Teacher from "./Pages/Teacher/Teacher";
import TeacherDetails from "./Pages/TeacherDetails/TeacherDetails";

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
        <Route path="/about" element={<About/>} />
        
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/price" element={<Price />} />
        <Route path="/Courses" element={<Courses/>} />
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/faq" element={<Faq />}/>
        <Route path="/teacher" element={<Teacher />}/>
        <Route path="/teacherdetails" element={<TeacherDetails />}/>





      </Routes>

      {/* Common Footer */}
      <Footer />
    </BrowserRouter>
  );
};

export default App;
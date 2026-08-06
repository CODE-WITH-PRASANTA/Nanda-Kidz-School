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

import Gallery from "./Pages/Gallery/Gallery";
import Pricing from "./Pages/Pricing/Pricing";
import TimeTable from "./Pages/TimeTable/TimeTable";

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



        <Route path="/gallery" element={<Gallery/>}/>
        <Route path="/pricing" element={<Pricing/>}/>
        <Route path="/time-table" element={<TimeTable/>}/>  
        


      </Routes>

      {/* Common Footer */}
      <Footer />
    </BrowserRouter>
  );
};

export default App;
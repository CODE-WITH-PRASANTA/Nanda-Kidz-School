import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Topbar from "./Components/Topbar/Topbar";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

// Pages
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
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
      </Routes>

      {/* Common Footer */}
      <Footer />
    </BrowserRouter>
  );
};

export default App;
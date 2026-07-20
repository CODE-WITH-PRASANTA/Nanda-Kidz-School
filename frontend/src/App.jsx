import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import AboutBreadCrumb from './Components/AboutBreadCrumb/AboutBreadCrumb';
import AboutUs from './Components/AboutUs/AboutUs';
import OurFacilities from './Components/OurFacilities/OurFacilities';



// Pages

// Components
import Topbar from './Components/Topbar/Topbar';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';


// Pages
import Home from './Pages/Home/Home';

const App = () => {
  return (
    <BrowserRouter>
     

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AboutBreadCrumb" element={<AboutBreadCrumb/>} />
        <Route path="/AboutUs" element={<AboutUs/>} />
        <Route path="/OurFacilities" element={<OurFacilities/>} />
       
      </Routes>

    <Topbar />
    <Navbar />
     
      <Routes>
        <Route path="/Home" element={<Home />} />
        

      </Routes>
         <Footer />
    </BrowserRouter>
  );
};

export default App;
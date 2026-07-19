import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import AboutBreadCrumb from './Components/AboutBreadCrumb/AboutBreadCrumb';
import AboutUs from './Components/AboutUs/AboutUs';



// Pages


const App = () => {
  return (
    <BrowserRouter>
     

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AboutBreadCrumb" element={<AboutBreadCrumb/>} />
        <Route path="/AboutUs" element={<AboutUs/>} />
       
      </Routes>
    </BrowserRouter>
  );
};

export default App;
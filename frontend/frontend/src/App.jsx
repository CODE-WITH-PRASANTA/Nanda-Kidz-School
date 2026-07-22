import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Components
import Topbar from './Components/Topbar/Topbar';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';


// Pages
import Home from './Pages/Home/Home';

const App = () => {
  return (
    <BrowserRouter>

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
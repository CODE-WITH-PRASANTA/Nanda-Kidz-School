import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./Layout/MainLayout/MainLayout";
import DashBoard from "./Pages/DashBoard/DashBoard";
import Shop from "./Pages/Shop/Shop";
import Addproduct from "./Pages/Addproduct/Addproduct";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* MainLayout can act as your application shell containing the Sidebar and Outlet */}
        <Route path="/" element={<MainLayout />}>
          {/* Default redirect from root to dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          
          {/* Proper Dashboard path */}
          <Route path="dashboard" element={<DashBoard />} />
<Route path="/shop/products"element={<Shop/>}/>
<Route path="/shop/products/add"element={<Addproduct/>}/>
         
        </Route>

        {/* Fallback catch-all route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
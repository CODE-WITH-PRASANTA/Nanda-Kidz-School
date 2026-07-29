import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./Layout/MainLayout/MainLayout";

import BlogPost from "./Pages/BlogPost/BlogPost";
import GalleryManagement from "./Pages/GalleryManagement/GalleryManagement";
import DashBoard from "./Pages/DashBoard/DashBoard"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* MainLayout can act as your application shell containing the Sidebar and Outlet */}
        <Route path="/" element={<MainLayout />}>
          {/* Default redirect from root to dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          
          {/* Proper Dashboard path */}
          <Route path="/dashboard" element={<DashBoard/>}/>
          <Route path="/blog-management/posts" element={<BlogPost/>}/>
         <Route path="/gallery-management" element={<GalleryManagement/>}/>
         
        </Route>

        {/* Fallback catch-all route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
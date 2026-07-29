import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "./Layout/MainLayout/MainLayout";

import DashBoard from "./Pages/DashBoard/DashBoard";
import BlogPost from "./Pages/BlogPost/BlogPost";
import GalleryManagement from "./Pages/GalleryManagement/GalleryManagement";
import Shop from "./Pages/Shop/Shop";
import Addproduct from "./Pages/Addproduct/Addproduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Redirect "/" to dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Dashboard */}
          <Route path="dashboard" element={<DashBoard />} />

          {/* Shop */}
          <Route path="shop/products" element={<Shop />} />
          <Route path="shop/products/add" element={<Addproduct />} />

          {/* Blog */}
          <Route
            path="blog-management/posts"
            element={<BlogPost />}
          />

          {/* Gallery */}
          <Route
            path="gallery-management"
            element={<GalleryManagement />}
          />
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
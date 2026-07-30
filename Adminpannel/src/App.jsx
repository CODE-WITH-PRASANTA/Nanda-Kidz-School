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
import BlogManagement from "./Pages/BlogManagement/BlogManagement";
import BlogPost from "./Pages/BlogPost/BlogPost";
import GalleryManagement from "./Pages/GalleryManagement/GalleryManagement";
import NewProduct from "./Pages/NewProduct/NewProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Redirect to Dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Dashboard */}
          <Route path="dashboard" element={<DashBoard />} />

          {/* Shop */}
          <Route path="shop/products" element={<Shop />} />
          <Route path="shop/products/add" element={<Addproduct />} />

          {/* Blog */}
          <Route path="blog-management" element={<BlogManagement />} />
          <Route
            path="blog-management/posts"
            element={<BlogPost />}
          />

          {/* Gallery */}
          <Route
            path="gallery-management"
            element={<GalleryManagement />}
          />

          {/* New Product */}
          <Route
            path="newproducts"
            element={<NewProduct />}
          />
        </Route>

        {/* 404 Redirect */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
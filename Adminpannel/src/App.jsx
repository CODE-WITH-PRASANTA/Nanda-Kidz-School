import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./Layout/MainLayout/MainLayout";

import DashBoard from "./Pages/DashBoard/DashBoard";
import Shop from "./Pages/Shop/Shop";
import Addproduct from "./Pages/Addproduct/Addproduct";
import NewProduct from "./Pages/NewProduct/NewProduct";
import BlogManagement from "./Pages/BlogManagement/BlogManagement";
import BlogPost from "./Pages/BlogPost/BlogPost";
import GalleryManagement from "./Pages/GalleryManagement/GalleryManagement";
import LoginForm from "./Components/AdminDashboard/Loginform/Loginform";
import ProtectedRoute from "./Components/protectedroute/protectedroute";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return (
      localStorage.getItem("isAuthenticated") === "true" ||
      sessionStorage.getItem("isAuthenticated") === "true"
    );
  });

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Login Route */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            )
          }
        />

        {/* Protected App Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout onLogout={handleLogout} />
            </ProtectedRoute>
          }
        >
          {/* Default Route */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Dashboard */}
          <Route path="dashboard" element={<DashBoard />} />

          {/* Shop */}
          <Route path="shop" element={<Shop />} />
          <Route path="shop/add" element={<Addproduct />} />
          <Route path="newproducts" element={<NewProduct />} />

          {/* Blog */}
          <Route path="blog-management" element={<BlogManagement />} />
          <Route path="blog-management/posts" element={<BlogPost />} />
          <Route path="blog/post" element={<BlogPost />} />
          <Route path="blog/management" element={<BlogManagement />} />

          {/* Gallery */}
          <Route path="gallery-management" element={<GalleryManagement />} />
        </Route>

        {/* 404 Fallback */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
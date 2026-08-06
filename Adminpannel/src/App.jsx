import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./Layout/MainLayout/MainLayout";

import DashBoard from "./Pages/DashBoard/DashBoard";
import Shop from "./Pages/Shop/Shop";
import Addproduct from "./Pages/Addproduct/Addproduct";
import NewProduct from "./Pages/NewProduct/NewProduct";
import BlogManagement from "./Pages/BlogManagement/BlogManagement";
import BlogPost from "./Pages/BlogPost/BlogPost";
import GalleryManagement from "./Pages/GalleryManagement/GalleryManagement";
import Teacherlist from "./Components/Teacherlist/Teacherlist";
import AdmissionForm from "./Components/AdmissionForm/AdmissionForm";
import TeachersAttendance from "./Components/TeachersAttendance/TeachersAttendance";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
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
          <Route
            path="blog-management/posts"
            element={<BlogPost />}
          />
          <Route path="blog/post" element={<BlogPost />} />
          <Route
            path="blog/management"
            element={<BlogManagement />}
          />

          {/* Gallery */}
          <Route
            path="gallery-management"
            element={<GalleryManagement />}
          />
        </Route>
         <Route path="/teacherlist" element={<Teacherlist/>} />
         <Route path="/admissionform" element={<AdmissionForm/>} />
         <Route path="/attendance" element={<TeachersAttendance/>} />

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
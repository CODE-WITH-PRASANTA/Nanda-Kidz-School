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
import ClassesTime from "./Components/ClassesTime/ClassesTime";
import FeeCollections from "./Components/FeeCollections/FeeCollections";
import StudentPage from "./Components/StudentPage/StudentPage";
import Teacherlist from "./Components/Teacherlist/Teacherlist";
import AdmissionForm from "./Components/AdmissionForm/AdmissionForm";
import TeachersAttendance from "./Components/TeachersAttendance/TeachersAttendance";
import SubjectManagement from "./Components/SubjectManagement/SubjectManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Admin Layout with Sidebar */}
        <Route path="/" element={<MainLayout />}>
          {/* Default Route */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Core Modules */}
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="students" element={<StudentPage />} />
          <Route path="admissions" element={<AdmissionForm />} />
          <Route path="teachers" element={<Teacherlist />} />
          <Route path="classes" element={<ClassesTime />} />
          <Route path="teacher-attendance" element={<TeachersAttendance />} />
          <Route path="fees-payments" element={<FeeCollections />} />

          {/* Shop */}
          <Route path="shop" element={<Shop />} />
          <Route path="shop/add" element={<Addproduct />} />
          <Route path="newproducts" element={<NewProduct />} />

          {/* Blog */}
          <Route path="blog/post" element={<BlogPost />} />
          <Route path="blog/management" element={<BlogManagement />} />
          <Route path="blog-management" element={<BlogManagement />} />
          <Route path="blog-management/posts" element={<BlogPost />} />
          <Route path="/subjects" element={<SubjectManagement/>} />

          {/* Gallery */}
          <Route path="gallery-management" element={<GalleryManagement />} />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
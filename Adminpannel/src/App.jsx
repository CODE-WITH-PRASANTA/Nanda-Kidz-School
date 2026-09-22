import React, { useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "./Layout/MainLayout/MainLayout";

// =====================================================
// PAGES
// =====================================================

import DashBoard from "./Pages/DashBoard/DashBoard";

import Shop from "./Pages/Shop/Shop";
import Addproduct from "./Pages/Addproduct/Addproduct";
import NewProduct from "./Pages/NewProduct/NewProduct";

import BlogManagement from "./Pages/BlogManagement/BlogManagement";
import BlogPost from "./Pages/BlogPost/BlogPost";

import GalleryManagement from "./Pages/GalleryManagement/GalleryManagement";

import ColdLead from "./Pages/ColdLead/ColdLead";
import Order from "./Pages/Order/Order";

import TeacherPost from "./Pages/TeacherPost/TeacherPost";
import Floatingleads from "./Pages/Floatingleads/Floatingleads";

// =====================================================
// AUTH
// =====================================================

import LoginForm from "./Components/Loginform/Loginform";
import ProtectedRoute from "./Components/protectedroute/protectedroute";

// =====================================================
// COMPONENTS
// =====================================================

import FeeCollections from "./Components/FeeCollections/FeeCollections";
import StudentPage from "./Components/StudentPage/StudentPage";
import Teacherlist from "./Components/Teacherlist/Teacherlist";
import AdmissionForm from "./Components/AdmissionForm/AdmissionForm";
import TeachersAttendance from "./Components/TeachersAttendance/TeachersAttendance";
import ParentsInquiry from "./Components/ParentsInquiry/ParentsInquiry";
import SubjectManagement from "./Components/SubjectManagement/SubjectManagement";
import Schedule from "./Components/Schedule/Schedule";
import Classandsection from "./Components/Classandsection/Classandsection";

// ⭐ Testimonials
import Testimonials from "./Components/Testimonials/Testimonials";
import AdmissionList from "./Components/AdmissionList/AdmissionList";
import ContactMessages from "./Components/ContactMessages/ContactMessages";

function App() {
  // =====================================================
  // AUTHENTICATION STATE
  // =====================================================

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return (
      localStorage.getItem("isAuthenticated") === "true" ||
      sessionStorage.getItem("isAuthenticated") === "true"
    );
  });

  // =====================================================
  // LOGIN SUCCESS
  // =====================================================

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("isAuthenticated");

    setIsAuthenticated(false);
  };

  // =====================================================
  // APP ROUTES
  // =====================================================

  return (
    <BrowserRouter>
      <Routes>

        {/* =================================================
            PUBLIC LOGIN ROUTE
        ================================================= */}

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

        {/* =================================================
            PROTECTED APP ROUTES
        ================================================= */}

        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MainLayout onLogout={handleLogout} />
            </ProtectedRoute>
          }
        >

          {/* =================================================
              DEFAULT ROUTE
          ================================================= */}

          <Route
            index
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

          {/* =================================================
              DASHBOARD
          ================================================= */}

          <Route
            path="dashboard"
            element={<DashBoard />}
          />

          {/* =================================================
              STUDENTS
          ================================================= */}

          <Route
            path="students"
            element={<StudentPage />}
          />

          {/* =================================================
              ADMISSIONS
          ================================================= */}

          <Route
            path="admissions"
            element={<AdmissionForm />}
          />

          {/* =================================================
              TEACHERS
          ================================================= */}

          <Route
            path="teachers"
            element={<Teacherlist />}
          />

          <Route
            path="teacher-attendance"
            element={<TeachersAttendance />}
          />

          <Route
            path="teacher-posts"
            element={<TeacherPost />}
          />

          {/* =================================================
              FEES
          ================================================= */}

          <Route
            path="fees-payments"
            element={<FeeCollections />}
          />

          {/* =================================================
              PARENTS
          ================================================= */}

          <Route
            path="parents"
            element={<ParentsInquiry />}
          />

          {/* =================================================
              CLASS & SCHEDULE
          ================================================= */}

          <Route
            path="class-schedules"
            element={<Schedule />}
          />

          <Route
            path="classes"
            element={<Classandsection />}
          />

          {/* =================================================
              SUBJECTS
          ================================================= */}

          <Route
            path="subjects"
            element={<SubjectManagement />}
          />

          {/* =================================================
              SHOP
          ================================================= */}

          <Route
            path="shop"
            element={<Shop />}
          />

          <Route
            path="shop/add"
            element={<Addproduct />}
          />

          <Route
            path="newproducts"
            element={<NewProduct />}
          />

          {/* =================================================
              BLOG
          ================================================= */}

          <Route
            path="blog-management"
            element={<BlogManagement />}
          />

          <Route
            path="blog-management/posts"
            element={<BlogPost />}
          />

          <Route
            path="blog/post"
            element={<BlogPost />}
          />

          <Route
            path="blog/post/:id"
            element={<BlogPost />}
          />

          <Route
            path="blog/management"
            element={<BlogManagement />}
          />

          {/* =================================================
              GALLERY
          ================================================= */}

          <Route
            path="gallery-management"
            element={<GalleryManagement />}
          />

          {/* =================================================
              FLOATING ENQUIRIES
          ================================================= */}

          <Route
            path="floating-enquiries"
            element={<Floatingleads />}
          />

          {/* =================================================
              TESTIMONIALS
          ================================================= */}

          <Route
            path="testimonials"
            element={<Testimonials />}
          />

          {/* =================================================
              COLD LEAD
          ================================================= */}

          <Route
            path="coldlead"
            element={<ColdLead />}
          />
          <Route
            path="admission-list"
            element={<AdmissionList/>}
          />
          <Route
            path="contact-messages"
            element={<ContactMessages/>}
          />

          {/* =================================================
              ORDER
          ================================================= */}

          <Route
            path="order"
            element={<Order />}
          />

        </Route>

        {/* =================================================
            404 FALLBACK
        ================================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to={
                isAuthenticated
                  ? "/dashboard"
                  : "/login"
              }
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
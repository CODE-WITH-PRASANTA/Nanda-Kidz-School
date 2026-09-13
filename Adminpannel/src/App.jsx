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

// =====================================================
// AUTH
// =====================================================

import LoginForm from "./Components/AdminDashboard/Loginform/Loginform";
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
<<<<<<< HEAD
import TeacherPost from "./Pages/TeacherPost/TeacherPost";
import ColdLead from "./Pages/ColdLead/ColdLead";
import Order from "./Pages/Order/Order";
import Floatingleads from "./Pages/Floatingleads/Floatingleads";
=======

// ⭐ Testimonials
import Testimonials from "./Components/Testimonials/Testimonials";
>>>>>>> b9039e9 (pull)

function App() {

  // =====================================================
  // AUTHENTICATION STATE
  // =====================================================

  const [isAuthenticated, setIsAuthenticated] =
    useState(() => {

      return (
        localStorage.getItem(
          "isAuthenticated"
        ) === "true" ||

        sessionStorage.getItem(
          "isAuthenticated"
        ) === "true"
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

    localStorage.removeItem(
      "isAuthenticated"
    );

    sessionStorage.removeItem(
      "isAuthenticated"
    );

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

              <Navigate
                to="/dashboard"
                replace
              />

            ) : (

              <LoginForm
                onLoginSuccess={
                  handleLoginSuccess
                }
              />

            )

          }
        />

        {/* =================================================
            PROTECTED APP ROUTES
        ================================================= */}

        <Route
          path="/"
          element={

            <ProtectedRoute
              isAuthenticated={
                isAuthenticated
              }
            >

              <MainLayout
                onLogout={
                  handleLogout
                }
              />

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

<<<<<<< HEAD
          {/* Blog */}
          <Route path="blog-management" element={<BlogManagement />} />
          <Route path="blog-management/posts" element={<BlogPost />} />
          <Route path="/subjects" element={<SubjectManagement/>} />
       <Route path="blog/post" element={<BlogPost />} />
<Route path="blog/post/:id" element={<BlogPost />} />
<Route path="blog/management" element={<BlogManagement />} />
          <Route path="/floating-enquiries" element={<Floatingleads/>}/>

          {/* Gallery */}
          <Route path="gallery-management" element={<GalleryManagement />} />
          <Route path="/teacher-posts"element={<TeacherPost/>}/>
=======
          {/* =================================================
              CORE MODULES
          ================================================= */}

          <Route
            path="dashboard"
            element={<DashBoard />}
          />

          <Route
            path="students"
            element={<StudentPage />}
          />

          <Route
            path="admissions"
            element={<AdmissionForm />}
          />

          <Route
            path="teachers"
            element={<Teacherlist />}
          />

          <Route
            path="teacher-attendance"
            element={<TeachersAttendance />}
          />

          <Route
            path="fees-payments"
            element={<FeeCollections />}
          />

          <Route
            path="parents"
            element={<ParentsInquiry />}
          />

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
            path="blog/management"
            element={<BlogManagement />}
          />

          {/* =================================================
              ⭐ TESTIMONIALS
              
              Sidebar:
              /testimonials

              Component:
              Testimonials.jsx
          ================================================= */}

          <Route
            path="testimonials"
            element={<Testimonials />}
          />

          {/* =================================================
              GALLERY
          ================================================= */}

          <Route
            path="gallery-management"
            element={<GalleryManagement />}
          />

          {/* =================================================
              COLD LEAD
          ================================================= */}

          <Route
            path="coldlead"
            element={<ColdLead />}
          />

          {/* =================================================
              ORDER
          ================================================= */}

          <Route
            path="order"
            element={<Order />}
          />
>>>>>>> b9039e9 (pull)

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
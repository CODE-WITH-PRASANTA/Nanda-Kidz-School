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

// Import other placeholder or actual pages as needed for your sidebar links:
// import Students from "./Pages/Students/Students";
// import Admissions from "./Pages/Admissions/Admissions";
// import Teachers from "./Pages/Teachers/Teachers";
// import Classes from "./Pages/Classes/Classes";
// ... import other pages to match your sidebar paths

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
          <Route path="/blog-management/posts" element={<BlogPost/>}/>
         

          {/* Other Sidebar paths mapped correctly */}
          {/* <Route path="students" element={<Students />} /> */}
          {/* <Route path="admissions" element={<Admissions />} /> */}
          {/* <Route path="teachers" element={<Teachers />} /> */}
          {/* <Route path="classes" element={<Classes />} /> */}
          {/* <Route path="attendance" element={<Attendance />} /> */}
          {/* <Route path="fees-payments" element={<FeesPayments />} /> */}
          {/* <Route path="examinations" element={<Examinations />} /> */}
          {/* <Route path="events" element={<Events />} /> */}
          {/* <Route path="homework" element={<Homework />} /> */}
          {/* <Route path="library" element={<Library />} /> */}
          {/* <Route path="transport" element={<Transport />} /> */}
          {/* <Route path="gallery-management" element={<GalleryManagement />} /> */}
          {/* <Route path="blog-management/posts" element={<BlogPost />} /> */}
          {/* <Route path="blog-management" element={<BlogManagement />} /> */}
          {/* <Route path="notice-board" element={<NoticeBoard />} /> */}
          {/* <Route path="contact-messages" element={<ContactMessages />} /> */}
          {/* <Route path="website-manage" element={<WebsiteManage />} /> */}
          {/* <Route path="settings" element={<Settings />} /> */}
          {/* <Route path="reports" element={<Reports />} /> */}
        </Route>

        {/* Fallback catch-all route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
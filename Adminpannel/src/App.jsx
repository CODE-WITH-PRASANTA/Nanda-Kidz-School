import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "./Layout/MainLayout/MainLayout";

import DashBoard from "./Pages/DashBoard/DashBoard";
<<<<<<< HEAD
import Shop from "./Pages/Shop/Shop";
import Addproduct from "./Pages/Addproduct/Addproduct";

import BlogPost from "./Pages/BlogPost/BlogPost";

=======
import BlogManagement from "./Pages/BlogManagement/BlogManagement";
import BlogPost from "./Pages/BlogPost/BlogPost";
import GalleryManagement from "./Pages/GalleryManagement/GalleryManagement";
import Shop from "./Pages/Shop/Shop";
import Addproduct from "./Pages/Addproduct/Addproduct";
import NewProduct from "./Pages/NewProduct/NewProduct";
>>>>>>> 32c8164636c8004c90574f0845c6ab2aa68518ce

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
<<<<<<< HEAD
          {/* Default redirect from root to dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          
          {/* Proper Dashboard path */}
          <Route path="dashboard" element={<DashBoard />} />
<Route path="/shop/products"element={<Shop/>}/>
<Route path="/shop/products/add"element={<Addproduct/>}/>
         
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
=======

          {/* Redirect "/" to dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* Dashboard */}
          <Route path="dashboard" element={<DashBoard />} />

          {/* Shop */}
          <Route path="shop/products" element={<Shop />} />
          <Route path="shop/products/add" element={<Addproduct />} />

          {/* Blog */}
          <Route
            path="blog-management"
            element={<BlogManagement />}
          />
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

>>>>>>> 32c8164636c8004c90574f0845c6ab2aa68518ce
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
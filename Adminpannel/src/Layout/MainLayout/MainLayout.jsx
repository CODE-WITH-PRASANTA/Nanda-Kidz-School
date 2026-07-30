import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

import "./MainLayout.css";


const MainLayout = () => {

  const [collapsed,setCollapsed] = useState(false);

  const [mobileSidebar,setMobileSidebar] = useState(false);



  const toggleSidebar = () => {
    setCollapsed(prev => !prev);
  };



  const toggleMobileSidebar = () => {
    setMobileSidebar(prev => !prev);
  };



  useEffect(()=>{

    const resizeHandler = ()=>{

      if(window.innerWidth > 992){

        setMobileSidebar(false);

      }

    };


    window.addEventListener(
      "resize",
      resizeHandler
    );


    return()=>{

      window.removeEventListener(
        "resize",
        resizeHandler
      );

    };


  },[]);





  return (

    <div className="MainLayout">


      <Sidebar

        collapsed={collapsed}

        mobileSidebar={mobileSidebar}

        toggleMobileSidebar={toggleMobileSidebar}

      />




      <div

        className={
          `MainLayout-content 
          ${collapsed ? "collapsed":""}`
        }

      >


        <Topbar

          toggleSidebar={toggleSidebar}

          toggleMobileSidebar={toggleMobileSidebar}

        />



        <main className="MainLayout-page">

          <Outlet />

        </main>



      </div>



    </div>

  );
};



export default MainLayout;
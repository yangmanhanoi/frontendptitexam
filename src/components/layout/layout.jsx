import React, { useState } from "react";
import Navbar from "./navbar/navbar";
import Sidebar from "./sidebar/sidebar";
import { Outlet } from "react-router-dom";

import "./layout.css";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleIsSidebarOpen = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="layout">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className="main-section">
        <Navbar onIsSidebarOpenChange={handleIsSidebarOpen} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

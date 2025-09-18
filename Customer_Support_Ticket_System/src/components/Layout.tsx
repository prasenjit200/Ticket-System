// src/components/Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar/SideBar";
import Header from "./Header/Header";

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar always visible */}
      <SideBar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header always visible */}
        <Header />

        {/* Outlet for nested routes */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

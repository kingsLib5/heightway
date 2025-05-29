import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Admin-components/AdminSideBar";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Fixed on desktop */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-grow lg:ml-64 p-4 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
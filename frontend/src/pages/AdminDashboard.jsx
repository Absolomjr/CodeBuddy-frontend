import React from "react";
import DashboardContent from "../components/DashboardContent";
import Sidebar from "../components/sidebar";

const AdminDashboard = () => {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 bg-gray-100 p-6 overflow-auto">
          <DashboardContent />
        </div>
      </div>
    );
  };
  

export default AdminDashboard;



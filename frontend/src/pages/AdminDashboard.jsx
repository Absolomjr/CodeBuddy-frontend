// src/pages/AdminDashboard.jsx
import React from "react";
import DashboardContent from "../components/DashboardContent";
import Sidebar from "../components/sidebar";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 w-full p-6">
        <DashboardContent />
      </main>
    </div>
  );
};

export default AdminDashboard;



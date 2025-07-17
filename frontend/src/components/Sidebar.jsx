import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-blue-800 text-white fixed top-0 left-0 shadow-lg">
      <div className="text-2xl font-bold p-6 border-b border-blue-700">Admin</div>
      <nav className="flex flex-col p-4 space-y-4">
        <NavLink to="/admin-dashboard" className="hover:bg-blue-700 p-3 rounded">Dashboard</NavLink>
        <NavLink to="/mentees" className="hover:bg-blue-700 p-3 rounded">Mentees</NavLink>
        <NavLink to="/mentors" className="hover:bg-blue-700 p-3 rounded">Mentors</NavLink>
        <NavLink to="/reports" className="hover:bg-blue-700 p-3 rounded">Reports</NavLink>
        <NavLink to="/settings" className="hover:bg-blue-700 p-3 rounded">Settings</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;

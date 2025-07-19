import React from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Reusable sidebar link
const SidebarLink = ({ to, icon, label, activePath }) => {
  const isActive = activePath === to;
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
        isActive ? "bg-blue-700 font-semibold" : "hover:bg-blue-800"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="h-screen w-64 bg-[#1E2A78] text-white flex flex-col p-4 shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-center">Administrator</h2>

      <nav className="flex flex-col gap-3">
        <SidebarLink
          to="/admin-dashboard"
          icon={<FaTachometerAlt />}
          label="Dashboard"
          activePath={location.pathname}
        />
        <SidebarLink
          to="/view-users"
          icon={<FaUsers />}
          label="Mentees"
          activePath={location.pathname}
        />
        <SidebarLink
          to="/add-mentor"
          icon={<FaUserPlus />}
          label="Mentors"
          activePath={location.pathname}
        />

        <SidebarLink
          to="/reports"
          icon={<FaUserPlus />}
          label="Reports"
          activePath={location.pathname}
        />

        <SidebarLink
          to="/settings"
          icon ={<FaUserPlus />} 
          label= "Reports"
          activePath={location.pathname}
        />
        
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 p-2 rounded-lg bg-red-600 hover:bg-red-700 transition-all"
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;

// import React from "react";
// import { NavLink } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="h-screen w-64 bg-blue-800 text-white fixed top-0 left-0 shadow-lg">
//       <div className="text-2xl font-bold p-6 border-b border-blue-700">Admin</div>
//       <nav className="flex flex-col p-4 space-y-4">
//         <NavLink to="/admin-dashboard" className="hover:bg-blue-700 p-3 rounded">Dashboard</NavLink>
//         <NavLink to="/mentees" className="hover:bg-blue-700 p-3 rounded">Mentees</NavLink>
//         <NavLink to="/mentors" className="hover:bg-blue-700 p-3 rounded">Mentors</NavLink>
//         <NavLink to="/reports" className="hover:bg-blue-700 p-3 rounded">Reports</NavLink>
//         <NavLink to="/settings" className="hover:bg-blue-700 p-3 rounded">Settings</NavLink>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

import React from "react";
import { FaTachometerAlt, FaUsers, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="h-screen w-64 bg-blue-900 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-8 text-center">Administrator</h2>

      <nav className="flex flex-col gap-4">
        <Link to="/admin-dashboard" className="flex items-center gap-3 hover:bg-blue-700 p-2 rounded">
          <FaTachometerAlt /> <span>Dashboard</span>
        </Link>
        <button className="flex items-center gap-3 hover:bg-blue-700 p-2 rounded">
          <FaUsers /> <span>View Users</span>
        </button>
        <button className="flex items-center gap-3 hover:bg-blue-700 p-2 rounded">
          <FaUserPlus /> <span>Add Mentee</span>
        </button>
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 hover:bg-red-700 p-2 rounded"
        >
          <FaSignOutAlt /> <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;

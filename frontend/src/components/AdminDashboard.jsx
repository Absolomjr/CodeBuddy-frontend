import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useUser } from "../context/UserContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [mentees, setMentees] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [error, setError] = useState("");
  const [report, setReport] = useState({});

  useEffect(() => {
    if (!user || user.role !== "Admin") {
      navigate("/login");
    } else {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const [menteesRes, mentorsRes, reportRes] = await Promise.all([
        api.get("/admin/mentees"),
        api.get("/admin/mentors"),
        api.get("/admin/report")
      ]);
      setMentees(menteesRes.data);
      setMentors(mentorsRes.data);
      setReport(reportRes.data);
    } catch (err) {
      setError("Failed to load admin data");
    }
  };

  const handleDelete = async (id, role) => {
    try {
      await api.delete(`/admin/${role.toLowerCase()}/${id}`);
      fetchData();
    } catch {
      alert("Deletion failed");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Reports Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Total Mentees</h2>
          <p className="text-2xl font-bold">{report.totalMentees || 0}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Total Mentors</h2>
          <p className="text-2xl font-bold">{report.totalMentors || 0}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Active Sessions</h2>
          <p className="text-2xl font-bold">{report.activeSessions || 0}</p>
        </div>
      </div>

      {/* Mentees Management */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Mentees</h2>
        <div className="bg-white shadow rounded-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Email</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Degree</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mentees.map((mentee) => (
                <tr key={mentee.id}>
                  <td className="px-4 py-2">{mentee.name}</td>
                  <td className="px-4 py-2">{mentee.email}</td>
                  <td className="px-4 py-2">{mentee.degree}</td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => handleDelete(mentee.id, "mentee")}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mentors Management */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Mentors</h2>
        <div className="bg-white shadow rounded-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Email</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Specialty</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mentors.map((mentor) => (
                <tr key={mentor.id}>
                  <td className="px-4 py-2">{mentor.name}</td>
                  <td className="px-4 py-2">{mentor.email}</td>
                  <td className="px-4 py-2">{mentor.specialty}</td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => handleDelete(mentor.id, "mentor")}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

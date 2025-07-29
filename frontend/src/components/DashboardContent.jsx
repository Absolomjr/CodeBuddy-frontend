import React, { useEffect, useState } from "react";
import { FaUserGraduate, FaChalkboardTeacher, FaHandshake, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../api";

const DashboardContent = () => {
  const [report, setReport] = useState({ totalMentors: 0, totalMentees: 0, activeSessions: 0 });
  const [requests, setRequests] = useState([]);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminReport();
    fetchMentorshipRequests();
  }, []);

  const fetchAdminReport = async () => {
    try {
      const res = await api.get("/admin/report"); // Updated to /report
      setReport(res.data);
      setApiError(null);
    } catch (error) {
      setApiError("Failed to fetch report. Please try again.");
    }
  };

  const fetchMentorshipRequests = async () => {
    try {
      const res = await api.get("/admin/mentorship-requests-report"); // Updated to /mentorship-requests-report
      setRequests(res.data.slice(0, 5)); // Show only the latest 5 requests
      setApiError(null);
    } catch (error) {
      setApiError("Failed to fetch mentorship requests. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Error Message */}
      {apiError && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          {apiError}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-sm transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaChalkboardTeacher className="text-blue-600 text-3xl" />
              <h2 className="text-xl font-semibold text-gray-800">Mentors</h2>
            </div>
            <span className="text-2xl font-bold text-blue-600">{report.totalMentors}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">Total Mentors</p>
          <button
            onClick={() => navigate("/admin-dashboard/add-mentor")}
            className="mt-4 flex items-center gap-2 text-blue-500 px-4 py-2 rounded-lgtransition-all duration-200"
          >
         Manage Mentors
          </button>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaUserGraduate className="text-green-600 text-3xl" />
              <h2 className="text-xl font-semibold text-gray-800">Mentees</h2>
            </div>
            <span className="text-2xl font-bold text-green-600">{report.totalMentees}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">Total Mentees</p>
          <button
            onClick={() => navigate("/admin-dashboard/mentees")}
            className="mt-4 flex items-center gap-2 text-green-400 px-4 py-2 rounded-lg transition-all duration-200"
          >
            Manage Mentees
          </button>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaHandshake className="text-purple-600 text-3xl" />
              <h2 className="text-xl font-semibold text-gray-800">Active Sessions</h2>
            </div>
            <span className="text-2xl font-bold text-purple-600">{report.activeSessions}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">Ongoing Mentorships</p>
          <button
            onClick={() => navigate("/admin-dashboard/reports")}
            className="mt-4 flex items-center gap-2 text-purple-500 transition-all duration-200"
          >
            View Reports
          </button>
        </div>
      </div>

      {/* Mentorship Requests Summary */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Recent Mentorship Requests</h2>
          <button
            onClick={() => navigate("/admin-dashboard/reports")}
            className="text-blue-500 hover:text-blue-600 text-sm font-semibold"
          >
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Request ID</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Mentee</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Mentor</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">
                    No recent requests found
                  </td>
                </tr>
              ) : (
                requests.map((request) => (
                  <tr
                    key={request.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="py-3 px-4 text-sm text-gray-700">{request.id}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{request.mentee_name || "N/A"}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{request.mentor_name || "N/A"}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{request.status}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {new Date(request.created_at).toLocaleDateString() || "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
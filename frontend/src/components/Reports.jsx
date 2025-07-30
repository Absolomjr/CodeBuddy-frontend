import React, { useEffect, useState } from "react";
import { FaDownload, FaFilter, FaSearch } from "react-icons/fa";
import api from "../api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; 


const Reports = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    fetchMentorshipRequests();
  }, []);

  useEffect(() => {
    // Filter requests based on search query and filter
    let filtered = requests;
    if (filter !== "all") {
      filtered = requests.filter((request) =>
        filter === "mentor" ? request.mentor_name : request.mentee_name
      );
    }
    if (searchQuery) {
      filtered = filtered.filter(
        (request) =>
          request.mentee_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          request.mentor_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          request.status?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredRequests(filtered);
  }, [searchQuery, filter, requests]);

  const fetchMentorshipRequests = async () => {
    try {
      const res = await api.get("/admin/mentorship-requests-report");
      console.log("Fetched requests:", res.data);
      setRequests(res.data);
      setFilteredRequests(res.data);
      setApiError(null);
    } catch (error) {
      console.error("Fetch requests error:", error);
      setApiError(`Failed to fetch mentorship requests: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });
  
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(60, 60, 180);
    doc.text("Mentorship Requests Report", 40, 40);
  
    const tableData = filteredRequests.map((request) => [
      request.id.toString(),
      request.mentee_name || "N/A",
      request.mentor_name || "N/A",
      request.status,
      new Date(request.created_at).toLocaleDateString(),
    ]);
  
    // ✅ Instead of doc.autoTable({...})
    autoTable(doc, {
      head: [["Request ID", "Mentee", "Mentor", "Status", "Date"]],
      body: tableData,
      startY: 60,
      theme: "striped",
      headStyles: {
        fillColor: [59, 130, 246],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [249, 250, 251],
      },
      margin: { top: 60, left: 40, right: 40 },
      styles: {
        font: "helvetica",
        fontSize: 10,
        textColor: [55, 65, 81],
        lineColor: [209, 213, 219],
        lineWidth: 0.5,
      },
    });
  
    doc.save("mentorship_requests.pdf");
  };
  

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Reports & Analytics</h1>

      {/* Error Message */}
      {apiError && (
        <div className="flex items-center gap-2 p-4 mb-6 text-red-700 bg-red-100 rounded-lg">
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

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <label className="mr-2 text-gray-600">Filter:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
            >
              <option value="all">All</option>
              <option value="mentor">Mentor Requests</option>
              <option value="mentee">Mentee Requests</option>
            </select>
          </div>
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search requests by mentee, mentor, or status..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
            <FaSearch className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
          </div>
        </div>
        <button
          onClick={handleExportPDF}
          className="flex items-center px-4 py-2 text-white transition-all duration-200 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
        >
          <FaDownload className="mr-2" /> Export to PDF
        </button>
      </div>

      <div className="p-6 bg-white shadow-lg rounded-2xl">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Mentorship Requests</h2>
        <div className="overflow-x-auto">
          <table id="mentorship-requests-table" className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Request ID</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Mentee</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Mentor</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 ? (
                <tr key="no-requests">
                  <td colSpan="5" className="py-4 text-center text-gray-500">
                    {searchQuery ? "No requests match your search" : "No requests found"}
                  </td>
                </tr>
              ) : (
                filteredRequests.map((request) => (
                  <tr
                    key={request.id}
                    className="transition-colors duration-200 border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-sm text-gray-700">{request.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{request.mentee_name || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{request.mentor_name || "N/A"}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{request.status}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">
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

export default Reports;
import React, { useEffect, useState } from "react";
import { Search, Download, Calendar } from "lucide-react";
import api from "../api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Reports = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    fetchMentorshipRequests();
  }, []);

  useEffect(() => {
    let filtered = requests;
    const now = new Date();
    const todayStart = new Date(now.setHours(0, 0, 0, 0));
    const todayEnd = new Date(now.setHours(23, 59, 59, 999));

    if (dateFilter === "today") {
      filtered = filtered.filter((request) => {
        const createdAt = new Date(request.created_at);
        return createdAt >= todayStart && createdAt <= todayEnd;
      });
    } else if (dateFilter === "last7") {
      const last7Days = new Date();
      last7Days.setDate(last7Days.getDate() - 7);
      filtered = filtered.filter((request) => new Date(request.created_at) >= last7Days);
    } else if (dateFilter === "last30") {
      const last30Days = new Date();
      last30Days.setDate(last30Days.getDate() - 30);
      filtered = filtered.filter((request) => new Date(request.created_at) >= last30Days);
    } else if (dateFilter === "custom" && customStartDate && customEndDate) {
      const start = new Date(customStartDate);
      const end = new Date(customEndDate);
      end.setHours(23, 59, 59, 999);
      filtered = filtered.filter((request) => {
        const createdAt = new Date(request.created_at);
        return createdAt >= start && createdAt <= end;
      });
    }

    if (filter !== "all") {
      filtered = filtered.filter((request) =>
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
  }, [searchQuery, filter, dateFilter, customStartDate, customEndDate, requests]);

  const fetchMentorshipRequests = async () => {
    try {
      const res = await api.get("/admin/mentorship-requests-report");
      setRequests(res.data);
      setFilteredRequests(res.data);
      setApiError(null);
    } catch (error) {
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

      {/* Filters + Controls */}
      <div className="flex flex-col items-center mb-6 gap-y-4 md:flex-row md:flex-wrap md:items-end md:justify-between">
        {/* Left Filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          {/* Role Filter */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600">Filter</label>
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

          {/* Date Range */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600">Date Range</label>
            <div className="relative">
              <select
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value);
                  if (e.target.value !== "custom") {
                    setCustomStartDate("");
                    setCustomEndDate("");
                  }
                }}
                className="py-3 pl-10 pr-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="last7">Last 7 Days</option>
                <option value="last30">Last 30 Days</option>
                <option value="custom">Custom Range</option>
              </select>
              <Calendar className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={20} />
            </div>
          </div>

          {/* Custom Dates */}
          {dateFilter === "custom" && (
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
                max={customEndDate || new Date().toISOString().split("T")[0]}
              />
              <span className="text-gray-600">to</span>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
                min={customStartDate}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>
          )}
        </div>

        {/* Right Controls */}
        <div className="flex flex-col items-stretch w-full gap-4 sm:flex-row sm:items-center md:w-auto">
          <div className="relative w-full sm:max-w-sm">
            <input
              type="text"
              placeholder="Search by mentee, mentor, or status..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
            <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" size={20} />
          </div>

          <button
            onClick={handleExportPDF}
            className="flex items-center justify-center px-4 py-3 text-white transition-all duration-200 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 whitespace-nowrap"
          >
            <Download className="mr-2" size={18} />
            Export PDF
          </button>
        </div>
      </div>

      {/* Table */}
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
                    {searchQuery || dateFilter !== "all"
                      ? "No requests match your filters"
                      : "No requests found"}
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

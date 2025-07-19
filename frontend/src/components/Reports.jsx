import React, { useEffect, useState } from "react";
import { FaDownload, FaFilter } from "react-icons/fa";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";

const Reports = () => {
  const [reportData, setReportData] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    // Simulate data fetch
    setReportData([
      { type: "mentor", count: 12 },
      { type: "mentee", count: 30 },
      { type: "activeSessions", count: 45 },
    ]);
  }, []);

  const barData = {
    labels: reportData.map((item) => item.type),
    datasets: [
      {
        label: "User Statistics",
        data: reportData.map((item) => item.count),
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b"],
      },
    ],
  };

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(reportData)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "report.json";
    link.click();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-900">Reports & Analytics</h1>

      <div className="flex items-center justify-between mb-4">
        <div>
          <label className="mr-2">Filter:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border p-2 rounded">
            <option value="all">All</option>
            <option value="mentor">Mentors</option>
            <option value="mentee">Mentees</option>
          </select>
        </div>
        <button onClick={handleDownload} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          <FaDownload className="mr-2" /> Export Report
        </button>
      </div>

      <div className="bg-white shadow p-4 rounded-lg">
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default Reports;

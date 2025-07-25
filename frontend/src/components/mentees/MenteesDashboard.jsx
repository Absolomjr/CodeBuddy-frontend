import React, { useState } from "react";
import MenteeStatsCard from "./MenteeStatsCard";
import MenteeSearchFilter from "./MenteeSearchFilter";
import MenteeTable from "./MenteeTable";
import AddMenteeModal from "./AddMenteeModal";
import { FaPlus } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable"; // For table support
import { useEffect, } from "react";
import axiosInstance from "../../utils/axiosInstance";


// const MenteesDashboard = () => {
//   const [mentees, setMentees] = useState([
//     { id: 1, name: "Absolom Jr", email: "absolom@gmail.com", year: "2025", status: "Active" },
//     { id: 2, name: "Isaac Nabasa", email: "isaac@gmail.com", year: "2024", status: "Pending" },
//   ]);

const MenteesDashboard = () => {
  const [mentees, setMentees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMentees = async () => {
    try {
      const response = await axiosInstance.get("/admin/mentees");
      setMentees(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching mentees:", error);
    }
  };


  useEffect(() => {
    fetchMentees();
  }, []);


  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", year: "", degree: "" });
  const [showConfirm, setShowConfirm] = useState(false);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddMentee = (e) => {
    e.preventDefault();
    const newMentee = {
      id: mentees.length + 1,
      name: form.name,
      email: form.email,
      year: form.year,
      degree: form.degree,
      status: "Pending", // default status
    };
    setMentees([...mentees, newMentee]);
    setShowAddModal(false);
    setForm({ name: "", email: "", password: "", year: "", degree: "" });
  };

  const handleStatusUpdate = (id, newStatus) => {
    const updated = mentees.map((m) => (m.id === id ? { ...m, status: newStatus } : m));
    setMentees(updated);
  };
  //handleGenerateReport logic
  const handleGenerateReport = () => {
    const doc = new jsPDF();

    doc.text("Mentee Report", 14, 15);
    doc.autoTable({
      head: [["ID", "Name", "Email", "Year", "Degree", "Status"]],
      body: mentees.map((mentee) => [
        mentee.id,
        mentee.name,
        mentee.email,
        mentee.year,
        mentee.degree || "N/A",
        mentee.status,
      ]),
    });

    doc.save("mentee-report.pdf");
  };

  const MenteeStatsCard = ({ mentees }) => {
    const total = mentees.length;
    const active = mentees.filter((m) => m.status === "Active").length;
    const unassigned = mentees.filter((m) => !m.mentor).length; // adjust based on your schema

    return (
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Total Mentees</p>
          <p className="text-xl font-bold">{total}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Active Mentees</p>
          <p className="text-xl font-bold">{active}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <p className="text-sm text-gray-500">Unassigned Mentees</p>
          <p className="text-xl font-bold">{unassigned}</p>
        </div>
      </div>
    );
  };




  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Manage Mentees</h2>

      <MenteeStatsCard mentees={mentees} />
      <MenteeSearchFilter />

      <div className="flex justify-between items-center mb-2">
        {/* Add Mentee */}
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <FaPlus /> Add Mentee
        </button>

        {/* Generate Report */}
        <button
          onClick={() => setShowConfirm(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Generate Mentee Report
        </button>
      </div>

      {showConfirm && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 w-[90%] max-w-md p-6">
          <h3 className="text-lg font-semibold mb-3">Confirm Report Generation</h3>
          <p className="mb-4 text-gray-700">Are you sure you want to generate the mentee report?</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => {
                handleGenerateReport();
                setShowConfirm(false);
              }}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Yes, Generate
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}




      {/* Mentee Table */}
      <MenteeTable mentees={mentees} updateStatus={handleStatusUpdate} />

      {/* Modal */}
      <AddMenteeModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        form={form}
        onChange={handleFormChange}
        onSubmit={handleAddMentee}
      />
    </div>
  );
};

export default MenteesDashboard;

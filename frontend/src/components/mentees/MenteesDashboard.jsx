import React, { useState } from "react";
import MenteeStatsCard from "./MenteeStatsCard";
import MenteeSearchFilter from "./MenteeSearchFilter";
import MenteeTable from "./MenteeTable";
import AddMenteeModal from "./AddMenteeModal";
import { FaPlus } from "react-icons/fa";

const MenteesDashboard = () => {
  const [mentees, setMentees] = useState([
    { id: 1, name: "Absolom Jr", email: "absolom@gmail.com", year: "2025", status: "Active" },
    { id: 2, name: "Isaac Nabasa", email: "isaac@gmail.com", year: "2024", status: "Pending" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", year: "", degree: "" });

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

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Manage Mentees</h2>

      <MenteeStatsCard />
      <MenteeSearchFilter />

      {/* Add Mentee Button */}
      <div className="flex justify-startc mb-2">
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <FaPlus /> Add Mentee
        </button>
      </div>

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

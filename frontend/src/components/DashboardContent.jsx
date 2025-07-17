// src/components/DashboardContent.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserGraduate, FaChalkboardTeacher, FaPlus } from "react-icons/fa";
import ConfirmationModal from "./ConfirmationModal";

const DashboardContent = () => {
  const [mentors, setMentors] = useState([]);
  const [mentees, setMentees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "", course: "", degree: "" });
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    fetchMentors();
    fetchMentees();
  }, []);

  const fetchMentors = async () => {
    const res = await axios.get("/api/mentors");
    setMentors(res.data);
  };

  const fetchMentees = async () => {
    const res = await axios.get("/api/mentees");
    setMentees(res.data);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openAddModal = (type) => {
    setForm({ name: "", email: "", password: "", course: "", degree: "" });
    setModalType(type);
    setSelectedUserId(null);
    setShowModal(true);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === "add-mentor") {
        await axios.post("/api/mentors", form);
        fetchMentors();
      } else if (modalType === "add-mentee") {
        await axios.post("/api/mentees", form);
        fetchMentees();
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const confirmDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await axios.delete(`/api/users/${confirmDeleteId}`);
      fetchMentors();
      fetchMentees();
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-100 rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-blue-800">
            <FaChalkboardTeacher /> Mentors
          </h2>
          <p className="text-sm text-gray-600 mt-1">Total: {mentors.length}</p>
          <button onClick={() => openAddModal("add-mentor")} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            <FaPlus className="inline mr-1" /> Add Mentor
          </button>
        </div>

        <div className="bg-green-100 rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-green-800">
            <FaUserGraduate /> Mentees
          </h2>
          <p className="text-sm text-gray-600 mt-1">Total: {mentees.length}</p>
          <button onClick={() => openAddModal("add-mentee")} className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            <FaPlus className="inline mr-1" /> Add Mentee
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-3 right-4 text-gray-400 text-2xl hover:text-gray-600">
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">
              {modalType.includes("add") ? "Add" : "Edit"} {modalType.includes("mentee") ? "Mentee" : "Mentor"}
            </h2>
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <input className="w-full px-4 py-3 border rounded-lg" type="text" name="name" placeholder="Name" value={form.name} onChange={handleFormChange} required />
              <input className="w-full px-4 py-3 border rounded-lg" type="email" name="email" placeholder="Email" value={form.email} onChange={handleFormChange} required />
              {modalType.includes("add") && (
                <input className="w-full px-4 py-3 border rounded-lg" type="password" name="password" placeholder="Password" value={form.password} onChange={handleFormChange} required />
              )}
              {modalType === "add-mentee" ? (
                <select className="w-full px-4 py-3 border rounded-lg" name="degree" value={form.degree} onChange={handleFormChange} required>
                  <option value="">Select Degree</option>
                  <option value="BSCS">BSCS</option>
                  <option value="BSIT">BSIT</option>
                  <option value="BSDS">BSDS</option>
                </select>
              ) : (
                <input className="w-full px-4 py-3 border rounded-lg" type="text" name="course" placeholder="Course" value={form.course} onChange={handleFormChange} required />
              )}
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                {modalType.includes("add") ? "Add" : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmDeleteId && (
        <ConfirmationModal
          onCancel={() => setConfirmDeleteId(null)}
          onConfirm={handleDeleteConfirmed}
        />
      )}
    </div>
  );
};

export default DashboardContent;

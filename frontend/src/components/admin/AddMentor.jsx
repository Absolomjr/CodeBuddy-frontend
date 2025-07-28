import React, { useEffect, useState } from "react";
import { FaUserPlus, FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import ConfirmationModal from "../ConfirmationModal";
import api from "../../api";

const AddMentor = () => {
  const [mentors, setMentors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [form, setForm] = useState({ name: "", email: "", password: "", specialty: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [selectedMentorId, setSelectedMentorId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const res = await api.get("/mentors");
      setMentors(res.data);
      setApiError(null);
    } catch (error) {
      setApiError("Failed to fetch mentors. Please try again.");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format";
    if (modalType === "add" && !form.password) newErrors.password = "Password is required";
    if (!form.specialty.trim()) newErrors.specialty = "Specialty is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const openAddModal = () => {
    setForm({ name: "", email: "", password: "", specialty: "" });
    setModalType("add");
    setSelectedMentorId(null);
    setShowModal(true);
    setErrors({});
    setApiError(null);
  };

  const openEditModal = (mentor) => {
    setForm({ name: mentor.name, email: mentor.email, password: "", specialty: mentor.specialty });
    setModalType("edit");
    setSelectedMentorId(mentor.id);
    setShowModal(true);
    setErrors({});
    setApiError(null);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      if (modalType === "add") {
        await api.post("/mentors", form);
      } else if (modalType === "edit") {
        await api.put(`/mentors/${selectedMentorId}`, {
          name: form.name,
          email: form.email,
          specialty: form.specialty,
        });
      }
      fetchMentors();
      setShowModal(false);
    } catch (error) {
      setApiError(`Failed to ${modalType === "add" ? "add" : "update"} mentor. Please try again.`);
    }
  };

  const confirmDelete = (id) => {
    setConfirmDeleteId(id);
  };

  const handleDeleteConfirmed = async () => {
    try {
      await api.delete(`/users/${confirmDeleteId}/Mentor`);
      fetchMentors();
      setApiError(null);
    } catch (error) {
      setApiError("Failed to delete mentor. Please try again.");
    } finally {
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Mentors</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
        >
          <FaPlus /> Add Mentor
        </button>
      </div>

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

      {/* Mentors Table */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Mentor List</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Name</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Email</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Specialty</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mentors.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    No mentors found
                  </td>
                </tr>
              ) : (
                mentors.map((mentor) => (
                  <tr
                    key={mentor.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="py-3 px-4 text-sm text-gray-700">{mentor.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{mentor.email}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{mentor.specialty}</td>
                    <td className="py-3 px-4 flex gap-2">
                      <button
                        onClick={() => openEditModal(mentor)}
                        className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => confirmDelete(mentor.id)}
                        className="text-red-500 hover:text-red-600 transition-colors duration-200"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl transition-colors duration-200"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {modalType === "add" ? "Add Mentor" : "Edit Mentor"}
            </h2>
            <form onSubmit={handleModalSubmit} className="space-y-5">
              <div>
                <input
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <input
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleFormChange}
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              {modalType === "add" && (
                <div>
                  <input
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200 ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    }`}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleFormChange}
                    required
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
              )}
              <div>
                <input
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-200 ${
                    errors.specialty ? "border-red-500" : "border-gray-300"
                  }`}
                  type="text"
                  name="specialty"
                  placeholder="Specialty"
                  value={form.specialty}
                  onChange={handleFormChange}
                  required
                />
                {errors.specialty && <p className="text-red-500 text-sm mt-1">{errors.specialty}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
              >
                {modalType === "add" ? "Add Mentor" : "Save Changes"}
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

export default AddMentor;
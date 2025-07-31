import React, { useState, useEffect } from "react";
import MenteeStatsCard from "./MenteeStatsCard";
import MenteeSearchFilter from "./MenteeSearchFilter";
import MenteeTable from "./MenteeTable";
import AddMenteeModal from "./AddMenteeModal";
import { FaPlus } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";


const MenteesDashboard = () => {
  const [mentees, setMentees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const filteredMentees = mentees.filter(
    (mentee) =>
      mentee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentee.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    year: "",
    degree: "",
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingMenteeId, setLoadingMenteeId] = useState(null);

  // ✅ Fetch mentees from backend
  const fetchMentees = async () => {
    try {
      const response = await axiosInstance.get("/admin/mentees");
      setMentees(response.data);
    } catch (error) {
      console.error("Error fetching mentees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentees();
  }, []);

  // ✅ Handle input change
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Add a new mentee
  const handleAddMentee = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post("/admin/mentee", form);
      toast.success("Mentee added successfully!");
      fetchMentees(); // Refresh list
      setShowAddModal(false);
      setForm({ name: "", email: "", password: "", year: "", degree: "" });
    } catch (error) {
      console.error("Error adding mentee:", error);
      toast.error("Failed to add mentee.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Edit mentee
  const handleEditMentee = async (id, updatedData) => {
    try {
      setLoadingMenteeId(id);
      const response = await axiosInstance.put(`/admin/mentee/${id}`, updatedData);
      const updated = response.data;
      setMentees((prev) =>
        prev.map((mentee) => (mentee.id === id ? updated : mentee))
      );
      toast.success("Mentee updated successfully!");
    } catch (error) {
      toast.error("Failed to update mentee.");
    } finally {
      setLoadingMenteeId(null);
    }
  };



  // ✅ Delete mentee
  const handleDeleteMentee = async (id) => {
    try {
      setLoadingMenteeId(id);
      await axiosInstance.delete(`/admin/Mentee/${id}`);
      setMentees((prev) => prev.filter((mentee) => mentee.id !== id));
      toast.success("Mentee deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete mentee.");
    } finally {
      setLoadingMenteeId(null);
    }
  };


  // ✅ Generate PDF Report
  const handleGenerateReport = () => {
    const doc = new jsPDF();
    doc.text("Mentee Report", 14, 15);
    doc.autoTable({
      head: [["Name", "Email", "Year", "Degree"]],
      body: mentees.map((m) => [
        m.name,
        m.email,
        m.year || "N/A",
        m.degree || "N/A",
      ]),
    });
    doc.save("mentee-report.pdf");
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Manage Mentees</h2>

      <MenteeStatsCard mentees={mentees} />
      <MenteeSearchFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />


      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <FaPlus /> Add Mentee
        </button>
        <button
          onClick={() => setShowConfirm(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Generate Mentee Report
        </button>
      </div>

      {/* Confirm Report Modal */}
      {showConfirm && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-lg z-50 w-[90%] max-w-md p-6">
          <h3 className="text-lg font-semibold mb-3">Confirm Report Generation</h3>
          <p className="mb-4 text-gray-700">
            Are you sure you want to generate the mentee report?
          </p>
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
      <MenteeTable
        mentees={filteredMentees}
        onEdit={handleEditMentee}
        onDelete={handleDeleteMentee}
        loadingMenteeId={loadingMenteeId}
      />

      {/* Add Mentee Modal */}
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
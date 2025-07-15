import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useUser } from "../context/UserContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"

const initialForm = {
  name: "",
  email: "",
  password: "",
  degree: "",
  role: "Mentee",
  course: "",
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [mentees, setMentees] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [error, setError] = useState("");
  const [report, setReport] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // 'add-mentee', 'add-mentor', 'edit-mentee', 'edit-mentor'
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [searchMentee, setSearchMentee] = useState("");
  const [searchMentor, setSearchMentor] = useState("");
  const [showRequestsReport, setShowRequestsReport] = useState(false);
  const [requestsReport, setRequestsReport] = useState([]);
  const [loadingReport, setLoadingReport] = useState(false);
  const [reportError, setReportError] = useState("");

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
        api.get("/admin/report"),
      ]);
      setMentees(menteesRes.data);
      setMentors(mentorsRes.data);
      setReport(reportRes.data);
    } catch (err) {
      setError("Failed to load admin data");
    }
  };

  // Remove useEffect dependency on searchMentee/searchMentor
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  // Filtering mentees and mentors in frontend
  const filteredMentees = mentees.filter(
    (mentee) =>
      mentee.name.toLowerCase().includes(searchMentee.toLowerCase()) ||
      mentee.email.toLowerCase().includes(searchMentee.toLowerCase()) ||
      (mentee.degree &&
        mentee.degree.toLowerCase().includes(searchMentee.toLowerCase()))
  );
  const filteredMentors = mentors.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(searchMentor.toLowerCase()) ||
      mentor.email.toLowerCase().includes(searchMentor.toLowerCase()) ||
      (mentor.course &&
        mentor.course.toLowerCase().includes(searchMentor.toLowerCase()))
  );

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

  const openAddModal = (role) => {
    setForm({ ...initialForm, role });
    setModalType(role === "Mentee" ? "add-mentee" : "add-mentor");
    setEditId(null);
    setShowModal(true);
  };

  const openEditModal = (user, role) => {
    setForm({
      name: user.name,
      email: user.email,
      password: "",
      degree: user.degree || "",
      role,
      
      course: user.course || "",
    });
    setModalType(role === "Mentee" ? "edit-mentee" : "edit-mentor");
    setEditId(user.id);
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === "add-mentee") {
        await api.post("/admin/mentee", form);
      } else if (modalType === "add-mentor") {
        await api.post("/admin/mentor", form);
      } else if (modalType === "edit-mentee") {
        await api.put(`/admin/mentee/${editId}`, form);
      } else if (modalType === "edit-mentor") {
        await api.put(`/admin/mentor/${editId}`, form);
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      alert("Operation failed");
    }
  };

  const handleGenerateReport = async () => {
    setLoadingReport(true);
    setReportError("");
    try {
      const res = await api.get("/admin/mentorship-requests-report");
      const data = res.data;
  
      //  The generation of PDFS
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Mentorship Requests Report", 14, 20);
      doc.setFontSize(12);
      doc.setTextColor(100);
  
      autoTable(doc, {
        startY: 30,
        head: [["Request ID", "Mentee ID", "Mentor ID", "Description", "Status", "Created At"]],
        body: data.map((req) => [
          req.request_id,
          req.mentee_id,
          req.mentor_id,
          req.description,
          req.status,
          new Date(req.created_at).toLocaleString(),
        ]),
        styles: { fontSize: 10 },
      });
  
      doc.save("mentorship-requests-report.pdf");
  
      // Optionally show data in table below 
      setRequestsReport(data);
      setShowRequestsReport(true);
    } catch (err) {
      setReportError("Failed to load mentorship requests report");
    } finally {
      setLoadingReport(false);
    }
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
          <h2 className="text-lg font-semibold mb-2">Pending</h2>
          <p className="text-2xl font-bold">{report.Pending|| 0}</p>
        </div>
      </div>
      {/* Mentorship Requests Report Section */}
      <div className="mb-8">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-2"
          onClick={handleGenerateReport}
          disabled={loadingReport}
        >
          {loadingReport
            ? "Generating Report..."
            : "Generate Mentorship Requests Report"}
        </button>
        {reportError && <div className="text-red-500 mb-2">{reportError}</div>}
        {showRequestsReport && requestsReport.length > 0 && (
          <div className="bg-white shadow rounded-md overflow-x-auto mt-2">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                    Request ID
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                    Mentee ID
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                    Mentor ID
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                    Description
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                    Status
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {requestsReport.map((req) => (
                  <tr key={req.request_id}>
                    <td className="px-4 py-2">{req.request_id}</td>
                    <td className="px-4 py-2">{req.mentee_id}</td>
                    <td className="px-4 py-2">{req.mentor_id}</td>
                    <td className="px-4 py-2">{req.description}</td>
                    <td className="px-4 py-2">{req.status}</td>
                    <td className="px-4 py-2">
                      {new Date(req.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Mentees Management */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-gray-800">Mentees</h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => openAddModal("Mentee")}
          >
            Add Mentee
          </button>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="text"
            placeholder="Search mentees..."
            className="border px-3 py-1 rounded w-64"
            value={searchMentee}
            onChange={(e) => setSearchMentee(e.target.value)}
          />
        </div>
        <div className="bg-white shadow rounded-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                  Degree
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMentees.map((mentee) => (
                <tr key={mentee.id}>
                  <td className="px-4 py-2">{mentee.name}</td>
                  <td className="px-4 py-2">{mentee.email}</td>
                  <td className="px-4 py-2">{mentee.degree}</td>
                  <td className="px-4 py-2 text-right flex gap-2 justify-end">
                    <button
                      onClick={() => openEditModal(mentee, "Mentee")}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
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
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-gray-800">Mentors</h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => openAddModal("Mentor")}
          >
            Add Mentor
          </button>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="text"
            placeholder="Search mentors..."
            className="border px-3 py-1 rounded w-64"
            value={searchMentor}
            onChange={(e) => setSearchMentor(e.target.value)}
          />
        </div>
        <div className="bg-white shadow rounded-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                  Course
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMentors.map((mentor) => (
                <tr key={mentor.id}>
                  <td className="px-4 py-2">{mentor.name}</td>
                  <td className="px-4 py-2">{mentor.email}</td>
                  <td className="px-4 py-2">{mentor.course}</td>
                  <td className="px-4 py-2 text-right flex gap-2 justify-end">
                    <button
                      onClick={() => openEditModal(mentor, "Mentor")}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
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

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-blue-100 bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-blue-50 rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-blue-700">
              {modalType.includes("add") ? "Add" : "Edit"}{" "}
              {modalType.includes("mentee") ? "Mentee" : "Mentor"}
            </h2>
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div>
                <label
                  className="block text-gray-700 font-medium mb-1"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 font-medium mb-1"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleFormChange}
                  required
                />
              </div>
              {modalType.includes("add") && (
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-1"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="password"
                    id="password"
                    name="password"
                    value={form.password}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              )}
              {modalType.includes("mentee") ? (
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-1"
                    htmlFor="degree"
                  >
                    Degree
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    id="degree"
                    name="degree"
                    value={form.degree}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="" disabled>
                      Select degree
                    </option>
                    <option value="BSCS">BSCS</option>
                    <option value="BSIT">BSIT</option>
                    <option value="BSDS">BSDS</option>
                  </select>
                </div>
              ) : modalType === "add-mentor" ? (
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-1"
                    htmlFor="course"
                  >
                    Course
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                    id="course"
                    name="course"
                    value={form.course}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              ) : (
                <div>
                  <label
                    className="block text-gray-700 font-medium mb-1"
                    htmlFor="course"
                  >
                    Course
                  </label>
                  <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                    id="course"
                    name="course"
                    value={form.course}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              )}
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200"
              >
                {modalType.includes("add") ? "Add" : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MenteeDashboard from "./components/MenteeDashboard";
import MentorDashboard from "./components/MentorDashboard";
import { UserProvider } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardContent from "./components/DashboardContent";
import MenteesDashboard from "./components/mentees/MenteesDashboard";
import Reports from "./components/Reports";
import AddMentor from "./components/admin/AddMentor";
import Settings from "./components/admin/Settings";
import "./App.css";

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen">
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/mentee-dashboard"
              element={
                <ProtectedRoute role="Mentee">
                  <MenteeDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mentor-dashboard"
              element={
                <ProtectedRoute role="Mentor">
                  <MentorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute role="Admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<DashboardContent />} />
              <Route path="mentees" element={<MenteesDashboard />} />
              <Route path="add-mentor" element={<AddMentor />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;

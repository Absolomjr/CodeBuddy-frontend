import React from "react";
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
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AddMentor from "./components/admin/AddMentor";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* Protected Mentee Routes */}
          <Route
            path="/mentee-dashboard"
            element={
              <ProtectedRoute role="Mentee">
                <MenteeDashboard />
              </ProtectedRoute>
            }
          />
          {/* Protected Mentor Routes */}
          <Route
            path="/mentor-dashboard"
            element={
              <ProtectedRoute role="Mentor">
                <MentorDashboard />
              </ProtectedRoute>
            }
            
          />
          {/* Protected Admin Routes */}
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
            {/* <Route path="settings" element={<Settings />} /> */}
          </Route>
          {/* Default route redirects to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



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
          <Route path="/mentee-dashboard" 
          element= {
            <ProtectedRoute role ="Mentee">
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
          <Route path="/admin-dashboard"
          element ={
            <ProtectedRoute role="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
          />

          
          {/* Protected Mentees Dashboard for Admin */}
          <Route path="/mentees"
          element={ 
          <ProtectedRoute role="Admin">
            <MenteesDashboard />
          </ProtectedRoute>
          }
          />

          

      
          {/* {/* Default route redirects to login or can be customized */}
          <Route path="/" element={<Navigate to="/login" replace />} /> 

          
        </Routes>
        <ToastContainer position="top-right" autoclose={3000} />
      </Router>
    </UserProvider>
  );
}

export default App;